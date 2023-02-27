import React, { useState, useEffect } from "react";
import { findMyPosts, findPosts } from "../users/api";
import Post from "../posts/Post";
import CreatePost from "../posts/CreatePost"

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (props.currentUser.id) {
      props.profilePage ? findMyPosts(props.currentUser.id)
        .then((response) => {
          setPosts(response.data.posts);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        })     
      
      : findPosts()
        .then((response) => {
          setPosts(response.data.posts.map((post) => post._id));
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
      }}, [props.currentUser] )
  
  return (
    <div className="posts-wrapper">
      <h1>My Blog Posts</h1>
      {props.profilePage && <CreatePost currentUser={props.currentUser}
                                        updateCurrentUserFromDatabase={props.updateCurrentUserFromDatabase}/>}      

      {posts.length !== 0 && posts.map((postId) => (
        <Post key={postId} 
              postId={postId}
              currentUser={props.currentUser} 
              profilePage={props.profilePage}/>                
      ))}
      {props.profilePage && <CreatePost currentUser={props.currentUser}
                                        updateCurrentUserFromDatabase={props.updateCurrentUserFromDatabase}/>}      

    </div>
  );
};

export default Feed;