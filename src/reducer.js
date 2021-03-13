import axios from 'axios';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';

export function setToken(token) {
 return {
  type: SET_TOKEN,
  payload: token,
 };
}

export function setUsers(users) {
 return {
  type: SET_USERS,
  payload: users,
 };
}

export function setUser(user = {}) {
 return {
  type: SET_USER,
  payload: user,
 };
}

export const getUsers = () => {
 return (dispatch) => {
  return axios({
   url: `https://jsonplaceholder.typicode.com/users`,
   headers: {
    'Content-Type': 'application/json',
   },
   method: 'get',
   responseType: 'json',
  })
   .then((response) => {
    dispatch(setUsers(response.data));
   })
   .catch((err) => {});
 };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { token: '', users: [], user: {} }, action) => {
 switch (action.type) {
  case SET_TOKEN:
   return {
    ...state,
    token: action.payload,
   };
  case SET_USERS:
   return {
    ...state,
    users: action.payload,
   };
  case SET_USER:
   return {
    ...state,
    user: action.payload,
   };
  default:
   return state;
 }
};
