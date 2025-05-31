import express, { Router } from 'express';
import { getTables, saveTables, deleteTable, getdashcontent, getOrderline, updateStatus} from '../controllers/admin.js';
const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', saveTables);
router.delete('/tables/:id', deleteTable);
router.get('/dashboard', getdashcontent);
router.get('/orderline', getOrderline);
router.put('/orderline/pickup/:id', updateStatus);

export default router;
