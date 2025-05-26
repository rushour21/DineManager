import express from 'express';
import { getTables, saveTables, deleteTable} from '../controllers/admin.js';
const router = express.Router();

router.get('/tables', getTables);
router.post('/tables', saveTables);
router.delete('/tables/:id', deleteTable);

export default router;
