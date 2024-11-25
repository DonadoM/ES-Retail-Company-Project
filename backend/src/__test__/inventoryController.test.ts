import { Request, Response } from 'express';
import * as inventoryController from '../controllers/inventoryController';
import InventoryItem from '../models/inventoryModel';

jest.mock('../models/inventoryModel');

describe('Inventory Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnThis();
    mockResponse = {
      json: responseJson,
      status: responseStatus,
    };
  });

  describe('getInventoryItems', () => {
    it('should get all inventory items', async () => {
      const mockItems = [{ id: '1', productName: 'Product 1' }, { id: '2', productName: 'Product 2' }];
      (InventoryItem.find as jest.Mock).mockResolvedValue(mockItems);

      await inventoryController.getInventoryItems(mockRequest as Request, mockResponse as Response);

      expect(InventoryItem.find).toHaveBeenCalled();
      expect(responseJson).toHaveBeenCalledWith(mockItems);
    });

    it('should handle errors and return 500 status', async () => {
      const errorMessage = 'Database error';
      (InventoryItem.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await inventoryController.getInventoryItems(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('createInventoryItem', () => {
    it('should create a new inventory item', async () => {
      const mockItemData = {
        productName: 'New Product',
        sku: 'SKU001',
        quantity: 100,
        price: 9.99,
      };
      mockRequest.body = mockItemData;
      const mockCreatedItem = { ...mockItemData, id: '1' };
      (InventoryItem.prototype.save as jest.Mock).mockResolvedValue(mockCreatedItem);

      await inventoryController.createInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(InventoryItem.prototype.save).toHaveBeenCalled();
      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith(mockCreatedItem);
    });

    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Validation error';
      mockRequest.body = { productName: 'Invalid Product' };
      (InventoryItem.prototype.save as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await inventoryController.createInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateInventoryItem', () => {
    it('should update an existing inventory item', async () => {
      const mockItemData = {
        productName: 'Updated Product',
        sku: 'SKU002',
        quantity: 200,
        price: 19.99,
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = mockItemData;
      const mockUpdatedItem = { ...mockItemData, id: '1' };
      (InventoryItem.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedItem);

      await inventoryController.updateInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(InventoryItem.findByIdAndUpdate).toHaveBeenCalledWith('1', mockItemData, { new: true });
      expect(responseJson).toHaveBeenCalledWith(mockUpdatedItem);
    });

    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Update error';
      mockRequest.params = { id: '1' };
      mockRequest.body = { productName: 'Invalid Update' };
      (InventoryItem.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await inventoryController.updateInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteInventoryItem', () => {
    it('should delete an existing inventory item', async () => {
      mockRequest.params = { id: '1' };
      (InventoryItem.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      await inventoryController.deleteInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(InventoryItem.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(responseJson).toHaveBeenCalledWith({ message: 'Inventory item deleted' });
    });

    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Delete error';
      mockRequest.params = { id: '1' };
      (InventoryItem.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await inventoryController.deleteInventoryItem(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});

