import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import SyncStorage from 'sync-storage';
import setAuthorizationToken from '../setAuthorizationToken';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function setCurrentUser(user, datauser) {
  return {
    type: SET_CURRENT_USER,
    user,
    datauser,
  };
}

export function getStorage() {
  return dispatch => AsyncStorage.getItem('jwtToken').then(val => {
    console.log(val, 'dari actions');
    dispatch(setCurrentUser(jwtDecode(val), val));
  });
}

export function login(data) {
  if (Platform.OS === 'ios') {
    return dispatch => axios.post('http://localhost:3000/users/login', data).then(res => {
      const token = res.data.token;
      console.log(token, 'ini di actions auth');
      SyncStorage.set('jwtToken', token);
      SyncStorage.set('dataUser', res.data);

      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token), res.data));
    });
  } 
    
  return dispatch => axios.post('http://localhost:3000/users/login', data).then(res => {
    const token = res.data.token;
    console.log(token, 'ini di actions auth');
    SyncStorage.set('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token), res.data));
  });
}

export function updateUser(id, token, email, name, gender, phone) {
  console.log('masuk bro', token);
  const data = {
    email,
    name,
    gender,
    phone,
  };
  const header = `Authorization: ${token}`;
  console.log(header, 'header');
  return dispatch => axios.put(`http://localhost:3000/users/${id}`, data, { headers: { Authorization: token } }).then(res => {
    SyncStorage.set('jwtToken', token);
    SyncStorage.set('dataUser', res.data);
    dispatch({ type: UPDATE_USER, IsData });
  });
}
