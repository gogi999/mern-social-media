import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from '../actions/actionTypes'

const initialState = {
  authData: null,
  loading: false,
  error: false,
  updateLoading: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case AUTH_SUCCESS:
      localStorage.setItem(
        'profile',
        JSON.stringify({
          ...action?.data,
        }),
      )

      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
      }

    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case LOGOUT:
      localStorage.clear()
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      }

    case UPDATE_START:
      return {
        ...state,
        updateLoading: true,
        error: false,
      }

    case UPDATE_SUCCESS:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      }

    case UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        error: true,
      }

    case FOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      }

    case UNFOLLOW_USER:
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data,
              ),
            ],
          },
        },
      }

    default:
      return state
  }
}

export default authReducer
