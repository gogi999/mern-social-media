import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UilPen } from '@iconscout/react-unicons'
import './InfoCard.css'
import ProfileModal from '../ProfileModal/ProfileModal'
import * as userAPI from '../../api/userRequests'
import { logout } from '../../actions/authAction'

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const [profileUser, setProfileUser] = useState({})

  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id
  const { user } = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await userAPI.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="info">
        <span>
          <b>Status: </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard
