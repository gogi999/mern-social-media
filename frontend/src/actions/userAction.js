import * as userAPI from '../api/userRequests'
import {
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from './actionTypes'

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({
    type: UPDATE_START,
  })

  try {
    const { data } = await userAPI.updateUser(id, formData)
    dispatch({
      type: UPDATE_SUCCESS,
      data: data,
    })
  } catch (err) {
    dispatch({
      type: UPDATE_FAIL,
    })
  }
}

export const followUser = (id, data) => async (dispatch) => {
  dispatch({
    type: FOLLOW_USER,
    data: id,
  })

  userAPI.followUser(id, data)
}

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({
    type: UNFOLLOW_USER,
    data: id,
  })

  userAPI.unfollowUser(id, data)
}
