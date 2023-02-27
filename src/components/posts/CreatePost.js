import { useState } from 'react';
import { addPost } from "../users/api";

// Define the CreatePost component
const CreatePost = (props) => {
  // Define the postContent state with the useState hook, and initialize it to an empty string
  const [postContent, setPostContent] = useState('');
  // Define the showForm state with the useState hook, and initialize it to false
  const [showForm, setShowForm] = useState(false);

  // Define the handlePostSubmit function to handle the form submission
  const handlePostSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Call the addPost function from the API module, passing in the postContent state
    addPost(props.currentUser, postContent)
      .then((response) => {
        console.log('Post created successfully:', response.data);        
        setShowForm(false); // Hide the form after the post is created        
        setPostContent(''); // Reset postContent state to an empty string
        props.updateCurrentUserFromDatabase(props.currentUser.id)
      })
      .catch((error) => {
        console.error('Failed to create post:', error);
      });
  };

  // Render the component UI
  return (
    <div>
      <button onClick={() => setShowForm(true)}>Create Post</button>
      {showForm && ( // Show the form only if showForm state is true
        <form onSubmit={handlePostSubmit}>
          <label>
            Post Content:
            <input type="text" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;