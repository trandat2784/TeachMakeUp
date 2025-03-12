import express from 'express';
import authUser from '../middleware/auth.js';
import { createComment, listComment, replyComment,deleteComment } from '../controllers/commentController.js';
import adminAuth from '../middleware/adminAuth.js';

const commentRouter = express.Router();
commentRouter.post("/list", listComment);
commentRouter.post("/create",createComment)
commentRouter.post("/reply", replyComment);
commentRouter.post("/delete",adminAuth, deleteComment);

export default commentRouter;