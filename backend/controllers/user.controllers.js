import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

export const getUser = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findById(id)

    if (user) {
      const { password, ...otherDetails } = user._doc

      res.status(200).json(otherDetails)
    } else {
      res.status(404).json('User not found!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currentUserAdminStatus, password } = req.body

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(password, salt)
      }

      const user = await User.findByIdAndUpdate(id, req.body, { new: true })

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('Access Denied! You can only update your own profile')
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id
  const { currentUserId, currentUserAdminStatus } = req.body

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await User.findByIdAndDelete(id)

      res.status(200).json({ message: 'User deleted successfully!' })
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('Access Denied! You can only delete your own profile')
  }
}

export const followUser = async (req, res) => {
  const id = req.params.id

  const { currentUserId } = req.body

  if (currentUserId === id) {
    res.status(403).json({ message: 'Action forbidden!' })
  } else {
    try {
      const followUser = await User.findById(id)
      const followingUser = await User.findById(currentUserId)

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } })
        await followingUser.updateOne({ $push: { following: id } })

        res.status(200).json({ message: 'User followed!' })
      } else {
        res.status(403).json({ message: 'User is already followed by you!' })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export const unFollowUser = async (req, res) => {
  const id = req.params.id

  const { currentUserId } = req.body

  if (currentUserId === id) {
    res.status(403).json({ message: 'Action forbidden!' })
  } else {
    try {
      const followUser = await User.findById(id)
      const followingUser = await User.findById(currentUserId)

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } })
        await followingUser.updateOne({ $pull: { following: id } })

        res.status(200).json({ message: 'User unfollowed!' })
      } else {
        res.status(403).json({ message: 'User is not followed by you!' })
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
