import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './PostShare.css'
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from '@iconscout/react-unicons'
import { uploadImage, uploadPost } from '../../actions/uplaodAction'

const PostShare = () => {
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const descRef = useRef()
  const loading = useSelector((state) => state.authReducer.uploading)
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage(img)
    }
  }

  const resetShare = () => {
    setImage(null)
    descRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    }

    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      newPost.image = filename
      try {
        dispatch(uploadImage(data))
      } catch (err) {
        console.log(err)
      }
    }

    dispatch(uploadPost(newPost))
    resetShare()
  }

  return (
    <div className="postShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt="profile-img"
      />
      <div>
        <input
          ref={descRef}
          required
          type="text"
          placeholder="What's happening?"
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--schedule)' }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="btn ps-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Share'}
          </button>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
