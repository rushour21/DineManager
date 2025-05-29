import express from 'express';
import { getTables, saveTables, deleteTable, getdashcontent, getOrderline} from '../controllers/admin.js';
const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', saveTables);
router.delete('/tables/:id', deleteTable);
router.get('/dashboard', getdashcontent);
router.get('/orderline', getOrderline);

export default router;
