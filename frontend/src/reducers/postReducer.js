import {
  UPLOAD_SUCCESS,
  UPLOAD_START,
  UPLOAD_FAIL,
} from '../actions/actionTypes'

const initialState = {
  posts: [],
  error: false,
  uploading: false,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_START:
      return {
        ...state,
        uploading: true,
        error: false,
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.data],
        uploading: false,
        error: false,
      }
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        error: true,
      }
    default:
      return state
  }
}

export default postReducer
