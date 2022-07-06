import * as postAPI from '../api/postRequests'
import {
  RETREIVING_START,
  RETREIVING_SUCCESS,
  RETREIVING_FAIL,
} from './actionTypes'

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({
    type: RETREIVING_START,
  })

  try {
    const data = await postAPI.getTimelinePosts(id)
    dispatch({
      type: RETREIVING_SUCCESS,
      data: data,
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: RETREIVING_FAIL,
    })
  }
}
