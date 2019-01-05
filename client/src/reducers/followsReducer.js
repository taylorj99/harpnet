import {
  FOLLOWS_LOADING,
  SET_FOLLOWS,
  CLEAR_FOLLOWS
} from "../actions/constants";

const initialState = {
  following: [],
  followers: [],
  loading: true,
  reduxLoaded: false,
  profile: {}
};

export const followsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case FOLLOWS_LOADING:
      return {
        ...state,
        loading: true,
        reduxLoaded: true
      };

    case CLEAR_FOLLOWS:
      return {
        ...state,
        following: [],
        followers: [],
        loading: false
      };

    case SET_FOLLOWS:
      return {
        ...state,
        following: action.payload.following,
        followers: action.payload.followers,
        loading: false
      };
  }
};