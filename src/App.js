import { Component } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import { setToken, getPlayLists, getTrackLists, getTrack } from './reducer';
import { getTokenFromResponse } from './env';
import './App.css';

class App extends Component {
 async componentWillMount() {
  const { setToken, getPlayLists } = this.props;
  const { access_token } = getTokenFromResponse();
  await setToken(access_token);
  await getPlayLists();
 }

 async onClickAlbum(playlist) {
  const { getTrackLists } = this.props;
  await getTrackLists(playlist.id);
 }

 async onClickTrack(track) {
  const { getTrack } = this.props;
  await getTrack(track.id);
 }

 millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
 }

 render() {
  const { token, playlists, trackList, track } = this.props;
  return (
   <div className="App m-2 p-2">
    <img
     src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350-300x127.jpg"
     alt="spotify Logo here"
     className="m-2 p-2"
    />
    {!token && <Login />}
    {playlists &&
     playlists.length > 0 &&
     playlists.map((playlist, i) => {
      return (
       <>
        <div
         className="container p-1 m-1 clickAbleDiv"
         onClick={() => this.onClickAlbum(playlist)}
        >
         <div className="row">
          <span className=".col- pr-1 mr-2">{i + 1}</span>
          <img
           src={playlist.images[1].url}
           alt={`album ${i}`}
           style={{ width: '40px' }}
           className=".col-"
          />
          <span className="col-sm">{playlist.name}</span>
          <span className="col-sm">{playlist.total_tracks}</span>
         </div>
        </div>
       </>
      );
     })}
    {Object.keys(trackList).length > 0 && (
     <div className="container p-1 m-1">
      <div className="row">
       <img
        src={trackList.images[1].url}
        alt={`trackList`}
        style={{ width: '40px' }}
        className=".col-"
       />
       <span className="col-sm">{trackList.name}</span>
       <span className="col-sm">{trackList.artists[0].name}</span>
       <span className="col-sm">{trackList.popularity}</span>
       {trackList.tracks.items.length > 0 &&
        trackList.tracks.items.map((track, i) => {
         return (
          <>
           <div
            className="container p-1 m-1 clickAbleDiv"
            onClick={() => this.onClickTrack(track)}
           >
            <div className="row">
             <span className=".col- pr-1 mr-2">{i + 1}</span>
             <span className="col-sm">{track.name}</span>
             <span className="col-sm">{track.track_number}</span>
            </div>
           </div>
          </>
         );
        })}
      </div>
     </div>
    )}
    {Object.keys(track).length > 0 && (
     <>
      <div className="container p-1 m-1">
       <div className="row">
        <img
         src={track.album.images[1].url}
         alt={`album`}
         style={{ width: '40px' }}
         className=".col-"
        />
        <span className="col-sm">{track.name}</span>
        <span className="col-sm">{track.album.artists[0].name}</span>
        <span className="col-sm">{track.album.name}</span>
        <span className="col-sm">
         {this.millisToMinutesAndSeconds(track.duration_ms)}
        </span>
       </div>
      </div>
     </>
    )}
   </div>
  );
 }
}

const mapStateToProps = (state) => ({
 ...state,
});

const mapDispatchToProps = (dispatch) => {
 return {
  setToken: (token) => dispatch(setToken(token)),
  getPlayLists: () => dispatch(getPlayLists()),
  getTrackLists: (id) => dispatch(getTrackLists(id)),
  getTrack: (id) => dispatch(getTrack(id)),
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
