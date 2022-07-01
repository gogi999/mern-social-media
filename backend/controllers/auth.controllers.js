import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

export const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.status(201).json(newUser)
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

      if (validity) {
        res.status(200).json(user)
      } else {
        res.status(400).json('Wrong password!')
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
