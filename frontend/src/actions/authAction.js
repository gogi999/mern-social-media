import * as authAPI from '../api/authRequests'
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './actionTypes'

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_START,
  })
  try {
    const { data } = await authAPI.logIn(formData)
    dispatch({
      type: AUTH_SUCCESS,
      data: data,
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_FAIL,
    })
  }
}

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({
    type: AUTH_START,
  })

  try {
    const { data } = await authAPI.signUp(formData)
    dispatch({
      type: AUTH_SUCCESS,
      data: data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    })
    console.log(err)
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}
