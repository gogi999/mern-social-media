import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  req.body.password = hashedPassword
  const newUser = new User(req.body)
  const { username } = req.body

  try {
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      res.status(400).json({ message: 'Username is already registered!' })
    }

    const user = await newUser.save()

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username: username })

    if (user) {
      const validity = await bcrypt.compare(password, user.password)

      if (!validity) {
        res.status(400).json('Wrong password!')
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
        )

        res.status(200).json({ user, token })
      }
    } else {
      res.status(404).json('User does not exist!')
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}
