import {
  FETCH_FOODS,
  CREATE_FOOD,
} from '../actions/food';

const initialState = {
  data: [],
  error: null,
  isFetched: false,
  jumlahDelete: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODS:
      return { 
        ...state,
        data: action.data.data,
      };
    case CREATE_FOOD:
      console.log(action.IsData, 'di reducer');
      console.log(...state.data, 'di reducer 2');
      return {
        ...state,
        data: [action.IsData, ...state.data],
        jumlahDelete: state.jumlahDelete - 1,
      };
    default:
      return state;
  }
};
