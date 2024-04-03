import { Router } from 'express';
import { listUsers, registerUser } from './controllers/usuarios-controller.js';
const router = Router();

router.get('/registrar', registerUser);
router.get('/listar', listUsers);

export default router;