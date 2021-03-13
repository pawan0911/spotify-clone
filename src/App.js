import { Component } from 'react';
import { connect } from 'react-redux';

import { setToken, getUsers, setUser } from './reducer';
import './App.css';

class App extends Component {
 async componentWillMount() {
  const { getUsers } = this.props;
  await getUsers();
 }

 onClickUser(user) {
  const { setUser } = this.props;
  setUser(user);
 }

 render() {
  const { users, user, setUser } = this.props;
  return (
   <div className="App m-2 p-2">
    {Object.keys(user).length > 0 && (
     <button className="container p-1 m-1" onClick={() => setUser()}>
      Back
     </button>
    )}
    {Object.keys(user).length <= 0 &&
     users &&
     users.length > 0 &&
     users.map((user, i) => {
      return (
       <>
        <div className="container p-1 m-1" key={user.id}>
         <div className="row">
          <span className=".col- pr-1 mr-2">{i + 1}</span>
          <span
           className="col-sm clickAbleDiv"
           onClick={() => this.onClickUser(user)}
          >
           {user.name}
          </span>
         </div>
        </div>
       </>
      );
     })}

    {Object.keys(user).length > 0 && (
     <>
      <div className="container p-1 m-1">
       <div className="row">
        <span className="col-sm">{user.id}</span>
        <span className="col-sm">{user.name}</span>
        <span className="col-sm">{user.email}</span>
        <span className="col-sm">{user.phone}</span>
        <span className="col-sm">{user.username}</span>
        <span className="col-sm">{user.website}</span>
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
  getUsers: () => dispatch(getUsers()),
  setUser: (user) => dispatch(setUser(user)),
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
