# Napster: Social Media App

## Description

This is my first project building a full-stack application using the MERN stack as part of the SEI GeneralAssembly Course. As a team of four, the objective was to develop a web application utilizing ReactJS and MongoDB. We chose to create a social media app named Napster!

## Deployment Link:
* [View Napster Here](https://stellar-pavlova-831e00.netlify.app/login)

## Timeframe & Team

We were given a week to complete this group project. 

## Technologies Used

  * **Code Editor:** VSCode
  * **Programming Languages:** HTML, CSS, JavaScript, JSX
  * **JS-Libaries:** React, Axios
  * **Server:** Express
  * **Database:** MongoDB
  * **Version Control:** Git & Git Hub Source Control
  * **Design:** Figma

## Brief

A tick denotes that the requirement has been delivered in this project release:

### Goals
- &#x2611; Build a full stack web application. Must be your own work.
- &#x2611; Use Express with React to build your application

### Technical Requirements
- &#x2611; As a User, I should be able to interact with at least 2 models
- &#x2611; As a User, I should be able to use authentication
- &#x2611; As a User, I should have full CRUD on at least one of your models
- &#x2611; As a User, I should be able to Add/Delete on any remaining models

### Optional Extras:
- Build a UML Use-case diagram
- Use JSDoc to document your project
- Use a 3rd party API
- Make application responsive
- High quality, professional design
- Redux
- Automated Tests Using Jest or other Testing Frameworks
- Allow users to upload files

## Planning

During the one-week development cycle, our team prioritized the essential features of the application. Initially, we reached a mutual agreement to engage in a shared effort for 50% of the project while equitably dividing the responsibilities among our four-member team, thereby granting us the autonomy to work independently on the remaining tasks. However, due to this being our first experience creating a full-stack application utilizing the MERN stack, our team collaborated extensively throughout the development process. Additionally, we designed the application's wireframes and employed Trello to manage and monitor our progress.

## Wireframe

https://www.figma.com/file/0r22Y1xfk9pNu5cdQCQxiu/Social-media-app?node-id=0-1

## Build Process

Within this segment, I guide you through the construction procedure, emphasizing excerpts from the codebase:

  * Together, we developed the fundamental features of the database and established the framework for the essential React components.
  * We established the Express server and MongoDB Schemas, incorporating database references to link posts with users. Additionally, we generated seed files for the database and incorporated a CORS policy.
  
  ```javascript
  const postSchema = new mongoose.Schema({
  img: String,
  content: { type: String , required: true},
  likes: { type: Number, default: 0 },
  createdBy: {type: String , required: true},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commment'
  }],
}, {
  timestamps: true
})

  ```
  
 * I undertook the responsibility of implementing the functionality that enables users to search for, add, or remove friends.
  
  ```javascript
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

  ```
  
  * Added Full CRUD:

   ```javascript
   router.post('/api/posts/create/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      Post.create({ content: req.body.content, createdBy:req.body.createdBy })
        .then((newPost) => {
          user.posts.push(newPost._id);
          return user.save();
        })
        .then(() => {
          res.status(201).json({ message: 'Post created successfully' });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});
   ```
 * Functional components were generated utilizing the useState and useEffect hooks, thereby enabling automatic page updates and re-renders.
 * Implemented CSS styling on the page utilizing classes.

    ```javascript
    .checkbox {
      position: absolute;
      top:0;
      left: -42px; 
      height: 20px;
      width: 20px;
      transition: 0.1s
    }

    .checkbox:hover {
      transform: scale(1.1);
    }

    .checkbox:active {
      transform: scale(1.05);
    }
    ```
    
 * With the aim of delivering a highly personalized user experience, we developed the functionality to enable users to update and edit their profile and posts.
 * Integrated conditional rendering, allowing certain components to exhibit additional functionality depending on the page. For instance, on the profile page, a user is unable to like their own post, whereas on the feed, they cannot edit posts of others.

## Challenges

* Since we were a team of four, progress was often contingent on the completion of specific sections. Ensuring efficient communication of blockers took some time, as well as comprehending how the various code segments were interconnected.

## Wins

* Through practical application, I acquired proficiency in using git to collaborate on group projects.
* I also learned a lot from my teammates.

## Key Learnings/Takeaways

* I gained a deeper understanding of git in a group setting. 
* Having previously created a React app, I gained substantial knowledge regarding conditional rendering, the functioning of state, and the proper method for passing props.

## Bugs 

* As of now, the search bar doesn’t clear once a user has added or removed a friend. We’re working on changing this soon.

## Future Improvements

* After a user searches for and adds friends, the search bar should disappear. 
* We should show the user that specifically liked the user’s post, and limit it to 1 like per post per user.
