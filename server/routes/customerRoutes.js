import express from 'express';
import {getmenu, savemenu, getOrders, saveOrder} from '../controllers/customer.js';

const router = express.Router();

// Menu routes
router.get('/menu', getmenu);
router.post('/menu', savemenu);

// Orders routes
router.get('/orders', getOrders);
router.post('/orders', saveOrder);

export default router;
