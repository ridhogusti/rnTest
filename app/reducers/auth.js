import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, UPDATE_USER } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.datauser,
      };    

    case UPDATE_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.IsData,
      };    
    default:
      return state;
  }
};
