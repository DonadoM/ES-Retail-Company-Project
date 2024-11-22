import express from 'express';
import {
  getSupplyChainItems,
  getSupplyChainItemById,
  createSupplyChainItem,
  updateSupplyChainItem,
  deleteSupplyChainItem
} from '../controllers/supplyChainController';

const router = express.Router();

router.route('/')
  .get(getSupplyChainItems)
  .post(createSupplyChainItem);

router.route('/:id')
  .get(getSupplyChainItemById)
  .put(updateSupplyChainItem)
  .delete(deleteSupplyChainItem);

export default router;

