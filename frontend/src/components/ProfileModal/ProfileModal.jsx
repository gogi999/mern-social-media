import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, useMantineTheme } from '@mantine/core'
import './ProfileModal.css'
import { uploadImage } from '../../actions/uplaodAction'
import { updateUser } from '../../actions/userAction'

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme()
  const { password, ...other } = data
  const [formData, setFormData] = useState(other)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.authReducer.authData)
  const param = useParams()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      if (e.target.name === 'profileImage') {
        setProfileImage(img)
      } else {
        setCoverImage(img)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let userData = formData

    if (profileImage) {
      const data = new FormData()
      const filename = Date.now() + profileImage.name
      data.append('name', filename)
      data.append('file', profileImage)
      userData.profilePicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (err) {
        console.log(err)
      }
    }

    if (coverImage) {
      const data = new FormData()
      const filename = Date.now() + coverImage.name
      data.append('name', filename)
      data.append('file', coverImage)
      userData.coverPicture = filename

      try {
        dispatch(uploadImage(data))
      } catch (err) {
        console.log(err)
      }
    }

    dispatch(updateUser(param.id, userData))
    setModalOpened(false)
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type="text"
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesIn}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Relationship Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="btn infoBtn" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  )
}

export default ProfileModal
