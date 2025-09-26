import { Router } from 'express';
import { listHandler, getHandler, createHandler } from './apartment.controller';

const router = Router();

router.get('/', listHandler);
router.get('/:id', getHandler);
router.post('/', createHandler);

export default router;
