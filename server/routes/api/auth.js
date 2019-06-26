import express from 'express';
import trim from '@middlewares/trim';
import UserController from '@controllers/users';


const authRouter = express.Router();

authRouter.post('/login', trim, UserController.login);

export default authRouter;
