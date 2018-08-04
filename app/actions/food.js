import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';

export const FETCH_FOODS = 'FETCH_FOODS';
export const FETCH_ALL_FOODS = 'FETCH_ALL_FOODS';
export const FETCH_FOOD = 'FETCH_FOOD';
export const CREATE_FOOD = 'CREATE_FOOD';

export function fetchFoods(args) {
  console.log(args);
  return dispatch => axios.get(`http://localhost:3000/artikels/${args}`)
    .then(data => dispatch({ type: FETCH_FOODS, data }));
}

export function createFood(token, name, description, time) {
  return dispatch => RNFetchBlob.fetch('POST', 'http://localhost:3000/artikels', {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  }, [
    { name: 'name', data: name },
    { name: 'description', data: description },
    { name: 'time', data: time },
  ])
    .then(res => {
      console.log(JSON.parse(res.data), 'respone dari create');
      const IsData = JSON.parse(res.data);
      dispatch({ type: CREATE_FOOD, IsData });
    }
    ).catch(err => console.log(err.response, this.state.token));
}
