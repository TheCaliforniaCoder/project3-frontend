import apiUrl from "./apiConfig";
import axios from "axios";

// api to send login details and return a key and user details
export const loginUser = (credentials) => {
    return axios.post(`${apiUrl}/login`, credentials)};

// api to get all users
export const getAllUsers = () => {
    return axios.get(`${apiUrl}/users`)}  

// api to get a specfic user by ID
export const getUserbyID = (userId) => {
  return axios.get(`${apiUrl}/users/${userId}`)}  

// api to create a user
export const createNewUser = (newUser) => {
    return axios.post(`${apiUrl}/register`, newUser)} 

// api to create seed users
export const registerAllUsers = (userDetails) => {
    return axios.post(`${apiUrl}/registerUsers`, userDetails)} 
    
// api to check username
export const compareUsername = (userDetails) => {
    return axios.post(`${apiUrl}/users`, userDetails)} 
    
// api to find all posts
export const findPosts = () => {
    return axios.get(`${apiUrl}/posts`)}

// api to add a post
export const addPost = (user, content) => { 
    return axios.post(`${apiUrl}/posts/create/${user.id}`, { content: content, createdBy: user.userName })}

// api to find a specific post by ID
export const findPost = (postId) => {
  return axios.get(`${apiUrl}/posts/${postId}`)}

// api to find this users posts
export const findMyPosts = (userId) => {
  return axios.get(`${apiUrl}/users/posts/${userId}`)}

//   delete posts 
export const deleteMyPosts = (postID) => {
    return axios.delete(`${apiUrl}/users/posts/${postID}`)}

// api to edit post
export const editPost = (postId, updatedContent) => {
    return axios.patch(`${apiUrl}/posts/edit/${postId}`, { content: updatedContent})}

export const editUserDetails = (userId, updatedUserDetails) => {
  return axios.patch(`${apiUrl}/users/${userId}`, { user: updatedUserDetails})}

// api to get all searched users
export const getSearchedUsers = (name) => {
    return axios.get(`${apiUrl}/search/${name}`)
}

// api call to update current users friends
export const addFriends = (id, user) => {
    console.log('api call', id, user)
    return axios.post(`${apiUrl}/users/${id}/friends`, user)
}

// api call to remove current users friends
export const removeFriends = (id, user) => {
    return axios.delete(`${apiUrl}/users/${id}/friends`, user)
}


export const addLike = (postId) => {
  return axios.patch(`${apiUrl}/posts/addLike/${postId}`)}

// // Placeholder API for retrieving friends
// export const getUserFriends = (user) => {
//   return axios.get((`${apiUrl}/users:id`, name)}
