import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './FollowersCard.css'
import User from '../User/User'
import { getAllUsers } from '../../api/userRequests'

const FollowersCard = () => {
  const [persons, setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers()
      setPersons(data)
      console.log(data)
    }

    fetchPersons()
  }, [])
  return (
    <div className="followersCard">
      <h3>People you may know: </h3>
      {persons.map(
        (person, id) =>
          person._id !== user._id && <User person={person} key={id} />,
      )}
    </div>
  )
}

export default FollowersCard
