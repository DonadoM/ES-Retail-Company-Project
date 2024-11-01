import request from 'supertest';
import express, { Express } from 'express';
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from '../controllers/customerController';
import Customer from '../models/customerModel';

jest.mock('../models/customerModel');

const app: Express = express();
app.use(express.json());

// Define routes for testing the controller functions
app.get('/customers', getCustomers);
app.post('/customers', createCustomer);
app.delete('/customers/:id', deleteCustomer);
app.put('/customers/:id', updateCustomer);

describe('Customer Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /customers', () => {
    it('should return a list of customers', async () => {
      const mockCustomers = [
        { name: 'John Doe', email: 'john@example.com', address: '123 Main St', phone: '1234567890' },
        { name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', phone: '0987654321' },
      ];

      (Customer.find as jest.Mock).mockResolvedValue(mockCustomers);

      const response = await request(app).get('/customers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomers);
    });

    it('should handle errors with status 500', async () => {
      (Customer.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/customers');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('POST /customers', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        address: '789 Maple St',
        phone: '5555555555',
      };

      (Customer.prototype.save as jest.Mock).mockResolvedValue(newCustomer);

      const response = await request(app).post('/customers').send(newCustomer);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newCustomer);
    });

    it('should handle validation errors with status 400', async () => {
      (Customer.prototype.save as jest.Mock).mockRejectedValue(new Error('Validation error'));

      const response = await request(app).post('/customers').send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation error');
    });
  });

  describe('DELETE /customers/:id', () => {
    it('should delete a customer and return a success message', async () => {
      const mockId = '12345';
      (Customer.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const response = await request(app).delete(`/customers/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Customer deleted');
    });

    it('should handle errors in deletion with status 400', async () => {
      const mockId = '12345';
      (Customer.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Deletion error'));

      const response = await request(app).delete(`/customers/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Deletion error');
    });
  });

  describe('PUT /customers/:id', () => {
    it('should update a customer and return a success message', async () => {
      const mockId = '12345';
      const updatedCustomer = {
        name: 'Updated Name',
        email: 'updated@example.com',
        address: 'Updated Address',
        phone: '1111111111',
      };

      (Customer.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCustomer);

      const response = await request(app).put(`/customers/${mockId}`).send(updatedCustomer);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Customer updated');
    });

    it('should handle errors in update with status 400', async () => {
      const mockId = '12345';
      (Customer.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Update error'));

      const response = await request(app).put(`/customers/${mockId}`).send({
        name: 'Test Name',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Update error');
    });
  });
});
