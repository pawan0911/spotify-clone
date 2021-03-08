import axios from 'axios';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_PLAYLISTS = 'SET_PLAYLISTS';
export const SET_TRACK_LIST = 'SET_TRACK_LIST';
export const SET_TRACK = 'SET_TRACK';

export function setToken(token) {
 return {
  type: SET_TOKEN,
  payload: token,
 };
}

export function setPlaylists(playlists) {
 return {
  type: SET_PLAYLISTS,
  payload: playlists,
 };
}

export function setTrackList(trackList) {
 return {
  type: SET_TRACK_LIST,
  payload: trackList,
 };
}

export function setTrack(track) {
 return {
  type: SET_TRACK,
  payload: track,
 };
}

export const getPlayLists = () => {
 return (dispatch, getState) => {
  const token = getState().token;
  return axios({
   url: `https://api.spotify.com/v1/browse/new-releases?country=IN&offset=0&limit=50`,
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
   method: 'get',
   responseType: 'json',
  })
   .then((response) => {
    dispatch(setPlaylists(response.data.albums.items));
    dispatch(setTrackList({}));
    dispatch(setTrack({}));
   })
   .catch((err) => {
    if (err.response.status === 401) {
     dispatch(setToken(''));
    }
   });
 };
};

export const getTrackLists = (id) => {
 return (dispatch, getState) => {
  const token = getState().token;
  return axios({
   url: `https://api.spotify.com/v1/albums/${id}`,
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
   method: 'get',
   responseType: 'json',
  })
   .then((response) => {
    dispatch(setPlaylists([]));
    dispatch(setTrack({}));
    dispatch(setTrackList(response.data));
   })
   .catch((err) => {});
 };
};

export const getTrack = (id) => {
 return (dispatch, getState) => {
  const token = getState().token;
  return axios({
   url: `https://api.spotify.com/v1/tracks/${id}`,
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
   },
   method: 'get',
   responseType: 'json',
  })
   .then((response) => {
    dispatch(setPlaylists([]));
    dispatch(setTrackList({}));
    dispatch(setTrack(response.data));
   })
   .catch((err) => {});
 };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
 state = { token: '', playlists: [], trackList: {}, track: {} },
 action
) => {
 switch (action.type) {
  case SET_TOKEN:
   return {
    ...state,
    token: action.payload,
   };
  case SET_PLAYLISTS:
   return {
    ...state,
    playlists: action.payload,
   };
  case SET_TRACK_LIST:
   return {
    ...state,
    trackList: action.payload,
   };
  case SET_TRACK:
   return {
    ...state,
    track: action.payload,
   };
  default:
   return state;
 }
};
