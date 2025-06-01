import express from 'express';
import { getTables, saveTables, deleteTable, getdashcontent, getOrderline, updateStatus, getRevenue,getOrderSummary} from '../controllers/admin.js';
const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', saveTables);
router.delete('/tables/:id', deleteTable);
router.get('/dashboard', getdashcontent);
router.get('/orderline', getOrderline);
router.put('/orderline/pickup/:id', updateStatus);
router.get('/revenue/:timeframe', getRevenue);
router.get('/summary/:timeframe', getOrderSummary);



export default router;
