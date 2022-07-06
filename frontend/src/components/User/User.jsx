import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/userAction'

const User = ({ person }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const [following, setFollowing] = useState(
    person.followers.includes(user._id),
  )
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const handleFollow = () => {
    if (following) {
      dispatch(unfollowUser(person._id, user))
    } else {
      dispatch(followUser(person._id, user))
    }

    setFollowing((prev) => !prev)
  }

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + 'defaultProfile.png'
          }
          alt="follower-img"
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstName}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={following ? 'btn fc-btn unfollow-btn' : 'btn fc-btn'}
        onClick={handleFollow}
      >
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )
}

export default User
