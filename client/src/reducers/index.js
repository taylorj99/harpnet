import { combineReducers } from 'redux'
import { errorReducer } from './errorReducer'
import { authReducer } from './authReducer'
import { profileReducer } from './profileReducer'
import { followsReducer } from './followsReducer'
import { postReducer } from './postReducer'
import { searchReducer } from './searchReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  follows: followsReducer,
  post: postReducer,
  search: searchReducer
})
