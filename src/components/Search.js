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
            friendsList: [],
            currentUserId: this.props.currentUser.id
          }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser.friends !== prevProps.currentUser.friends) {
          this.setState({
            friendsList: this.props.currentUser.friends
          });
        }
      }

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

  addToFriendsList = (friendId) => {
    const userId = this.state.currentUserId
    console.log('user Id', userId)
    console.log('friends Id', friendId)
    console.log(this.props.currentUser, 'current user')
    addFriends(this.props.currentUser.id, {friendId: friendId})
    .then((res) => {
        console.log(res)
        this.props.updateCurrentUserFromDatabase(userId)
    })
  }

  removeFromFriendsList = (friendId) => {
    const userId = this.state.currentUserId
    console.log('user Id', userId)
    console.log('friends Id', friendId)
    console.log(this.props.currentUser, 'current user')
    removeFriends(this.props.currentUser.id, {friendId: friendId})
    .then((res) => {
        console.log(res)
        this.props.updateCurrentUserFromDatabase(userId)
    })
  }

  updateFriendsList = () => {
    this.setState({ friendsList: this.state.friendsList });
    this.props.updateCurrentUserFromDatabase(this.state.currentUserId)
  };
  

render() {
        return (
            <div>
                <input className='friend-search' type = 'search'
                        placeholder = "Search for friends..."
                        value = {this.state.searchValue}
                        onChange = {this.handleSearchChange}
                         />
                <div className='results-wrapper'>
                <Results searchResults={this.state.searchResults}
                         addToFriends={this.addToFriends}
                         addToFriendsList={this.addToFriendsList}
                         removeFromFriendsList={this.removeFromFriendsList}
                         friendsList={this.state.friendsList}
                         currentUserId={this.state.currentUserId}
                         updateFriendsList={this.updateFriendsList}
                        updateFriendId={this.state.friendId}/>
                        </div>
            </div>
        )
        }
    }
    
    export default Search;

