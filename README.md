# Project-2-api-React-App
---

Developer: Tom Fairclough <br>
Technologies: HTML/CSS/JavaScript/React/Axios

## Description
- - -

This is my first project building a full-stack apllication useing the MERN stack as part of the SEI GeneralAssembly Course. The task was to create a web application using ReactJS & MongoDB that met the requirements of a provided specification as a team of four.

## Deployment Link
- - - 

## Technologies
- - -
This project utilised the following:
- **Code Editor:** VSCode
- **Programming Languages:** HTML, CSS, JavaScript, JSX
- **JS-Libaries:** React, Axios
- **Server:** Express
- **Database:** MongoDB
- **Version Control:** Git & Git Hub Source Control
- **Design:** Figma
- **Image Editors:** GNU Image Manipulation Programme

## Brief
- - - 

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
- - -

Our application is a social media platform that allows a User to log into their account. Create posts, add friends, and see a global feed of posts. We produced a wireframe and used Trello to plan the backlog of activities required to deliver the project. With one week for development, I focused on delivering the profile page of the apllication as well as owning the git repo; reviewing pull requests and code.

### Wireframe

https://www.figma.com/file/0r22Y1xfk9pNu5cdQCQxiu/Social-media-app?node-id=0%3A1&t=Cax19TxXrQVgV4EJ-0

##  Build Process

- - -
In this section I step through the build process, highlighting extracts from the code base:

- As a team we built the core database functionaility and planned out the structture of the core React components so that we could begin to work independently.

- Set up both the Express server and the MongoDB Schemas. This included  database references to relate posts to users. We built seed files for the database and added a CORS Policy

    ```JavaScript
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

- Added full CRUD

    ```JavaScript
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

- Created functional components using useState and useEffect to allow the page to automatically update and re-render.

- Added CSS styling to the page using classes.

    ```CSS
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

- Built in functionaility to allow a User to update and edit both their profile and posts.

- Built in conditional rendering so that certaiin components had additional functionaility depending on the page. For exmaple, on the profile page a User cannot like their own post, but on the feed a User cannot edit others posts. 


## Challenges
- - -

-  <br>


- <br>


##  Future Improvments
- - -

- The feed only shows friends posts