import React from 'react'
import Login from './components/users/loginRegister';
import Profile from './components/profile/Profile';
import Post from './components/posts/Post'
import Feed from './components/Feed/Feed'
import { getUserbyID } from "./components/users/api";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Search from './components/Search'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    // Retrieve token from local storage
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return tokenString || '';
    };
    this.state = {
      token: getToken(),
      currentUser: {
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        location: '',
        friends: [],
        posts: [''],
        img: '',
        timestamps: ''
      }
    };
  }
  componentDidMount() {
      const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (storedCurrentUser) {
        this.updateCurrentUserFromDatabase(storedCurrentUser.id)
      }
  }
  // Removes token from local storage and sets URL to /login
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.setState({
      token: '',
      currentUser: {
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        location: '',
        friends: [],
        posts: [''],
        img: '',
        timestamps: '',
      }
    }, () => {
      window.history.pushState({}, 'Login', '/login');
    });
  }
  updateCurrentUserFromDatabase = (userId) => {
    getUserbyID(userId)
    .then((response) => {
      this.setState({
        currentUser : {
          id: userId,
          firstName: response.data.users.firstName,
          lastName: response.data.users.lastName,
          userName: response.data.users.userName,
          password: response.data.users.password,
          email: response.data.users.email,
          location: response.data.users.location,
          friends: response.data.users.friends,
          posts: response.data.users.posts,
          img: response.data.users.img,
          timestamps: response.data.users.timestamps,
        }
      })
    })
    .catch((error) => {
      console.error("Error updating User:", error);
    });
  }
  // method to take all users returned from the database from the getAllUsers api and add them to the users state
  setUsers = (users) => {
    this.setState({
      users: users,
    })
  }
  setCurrentUser = (currentUser) => {
    this.setState({ currentUser }, () => {
      localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser));
    })
  }
  // Saves token to local storage
  saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    this.setState({
      token: userToken
    });
  };
  render() {
    const { token } = this.state;
    // Checks if a token exists if not the login page is loaded
    if (!token) {
      return <Login setToken={this.saveToken}
      setCurrentUser={this.setCurrentUser}/>;
    } else {
    return(
      <Router>
        <>
          <h1>Naptser Social app</h1>
          {/* Nav bar links to each React Route */}
          <nav>
            <Link to = "/feed">Feed</Link>
            <Link to = "/profile">Profile</Link>
            <Link to = "/search">Search</Link>
            {/* Logout button */}
            <button onClick={this.logout}>Logout</button>
          </nav>
          {/* Creating the React Paths to different pages */}
          <Route path="/search" render={() => <Search currentUser={this.state.currentUser}
                                                      updateCurrentUserFromDatabase={this.updateCurrentUserFromDatabase} />} />
          <Route path = "/feed" component={() => <Feed/>}/>
          <Route path = "/profile" component={() => <Profile currentUser={this.state.currentUser}
                                                             updateCurrentUserFromDatabase={this.updateCurrentUserFromDatabase}/>}/>
        </>
      </Router>
    )
    }
  }
}

import { getSearchedUsers } from './users/api'
import { addFriends } from './users/api'
import { removeFriends } from './users/api';
import React from 'react';
import Results from './Results'
class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults:[],
            friendId: '',
            friendsList: this.props.currentUser.friends,
            currentUserId: this.props.currentUser.id
          }
    }
   // takes input and matches it to api users
   // backend is where we filter input to match db
    handleSearchChange = (e) => {
        const textValue = e.target.value
        console.log(textValue)
        getSearchedUsers(textValue)
        .then((response) => {
        console.log(response)
        this.setState({
            searchResults: response.data.users
        })
        })
        .catch((error) => {
            console.error(error);
        });
        this.setState({
            searchValue: textValue
        })
  }
   addToFriends = (friendId) => {
        this.setState({
         friendId: friendId
        })
  };

  addToFriendsList = () => {
    const userId = this.state.currentUserId
    console.log('user Id', userId)
    const friendsId = {
        friendId: this.state.friendId
    }
    console.log('friends Id', friendsId)
    console.log(this.props.currentUser, 'current user')
    addFriends(this.state.currentUserId, friendsId)
    .then((res) => {
        console.log(res)
        this.props.updateCurrentUserFromDatabase(userId)
    })
  }

  removeFromFriendsList = () => {
    const userId = this.state.currentUserId
    console.log('user Id', userId)
    const friendsId = {
        friendId: this.state.friendId
    }
    console.log('friends Id', friendsId)
    console.log(this.props.currentUser, 'current user')
    removeFriends(this.state.currentUserId, friendsId)
    .then((res) => {
        console.log(res)
        this.props.updateCurrentUserFromDatabase(userId)
    })
  }
/*   componentDidUpdate (prevProps, prevState) {
    console.log(this.state.friendId)
    console.log(this.props.currentUser.id)
    if (prevState.friendId !== this.state.friendId) {
        addFriends(this.props.currentUser.id, this.state.friendId)
    }
  } */
render() {
        return (
            <div>
                <label>Search for friends</label>
                <input type = 'search'
                        placeholder = "Search for friends"
                        value = {this.state.searchValue}
                        onChange = {this.handleSearchChange}
                         />
                <Results searchResults={this.state.searchResults}
                         addToFriends={this.addToFriends}
                         addToFriendsList={this.addToFriendsList}
                         removeFromFriendsList={this.removeFromFriendsList}
                         friendsList={this.state.friendsList}
                         currentUserId={this.state.currentUserId}
                         friendId={this.state.friendId}/>
            </div>
        )
        }
    }
    export default Search;

    import React, { Component } from 'react';
    class Results extends Component{
        constructor(props) {
            super(props);
            this.state = {
                friendId: '',
                searchResults: []
            }
        }

        componentDidUpdate(prevProps) {
        if (prevProps.searchResults !== this.props.searchResults) {
          // searchResults has changed, update the component's state
          this.setState({ searchResults: this.props.searchResults });
        }
      }

       handleFriendId = (friendId) => {
        this.props.addToFriends(friendId)
        // this.updateFriendId(friendId)
        console.log('handle friend id', friendId)
        const { friendsList, addToFriendsList, removeFromFriendsList } = this.props;
        if (friendsList.includes(friendId)) {
          // friendId is already in the friendsList, so remove it
          removeFromFriendsList(friendId);
        } else {
          // friendId is not in the friendsList, so add it
          addToFriendsList(friendId);
        }
      };

      updateFriendId = (friend) => {
        this.props.addToFriends(friend)
      }
      
        render () {
             /* map searchedResults*/
         const usersArray = this.props.searchResults.map((item, index) => {
            const isFriend = this.props.friendsList.includes(item._id)
            return  <div key={index}>
                        <h3>First name: {item.firstName}</h3>
                        <h3>Last name: {item.lastName}</h3>
                        <h3>Username: {item.userName}</h3>
                    <div>
                    {isFriend ? (
      <button onClick={() => {
        /* this.props.addToFriends(item._id); */
        this.handleFriendId(item._id);
      }}>Remove friend</button>
    ) : (
      <button onClick={() => {
        // this.props.addToFriends(item._id);
        this.handleFriendId(item._id);
      }}>Add friend</button>
    )}
                </div>
                     </div>
        })
            return (
               <div>
                {usersArray}
               </div>
            )
        }
    }
    export default Results;