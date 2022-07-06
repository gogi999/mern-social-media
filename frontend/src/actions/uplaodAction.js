import * as uploadAPI from '../api/uploadRequests'
import { UPLOAD_SUCCESS, UPLOAD_START, UPLOAD_FAIL } from './actionTypes'

export const uploadImage = (data) => async (dispatch) => {
  try {
    await uploadAPI.uploadImage(data)
  } catch (err) {
    console.log(err)
  }
}

export const uploadPost = (data) => async (dispatch) => {
  dispatch({
    type: UPLOAD_START,
  })

  try {
    const newPost = await uploadAPI.uploadPost(data)
    dispatch({
      type: UPLOAD_SUCCESS,
      data: newPost.data,
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: UPLOAD_FAIL,
    })
  }
}
