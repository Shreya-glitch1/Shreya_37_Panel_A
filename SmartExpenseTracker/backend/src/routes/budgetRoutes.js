import express from 'express';
import {
  setBudget,
  getBudgets,
  getBudgetAnalysis,
  deleteBudget
} from '../controllers/budgetController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', setBudget);
router.get('/', getBudgets);
router.get('/analysis/:month/:year', getBudgetAnalysis);
router.delete('/:id', deleteBudget);

export default router;