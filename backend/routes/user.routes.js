import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
} from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)
router.put('/:id/follow', authMiddleware, followUser)
router.put('/:id/unfollow', authMiddleware, unFollowUser)

export default router
