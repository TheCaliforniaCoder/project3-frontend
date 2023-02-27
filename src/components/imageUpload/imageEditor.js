import React, { Component } from "react";
import app from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUrl: "",
      imageFile: null,
      imageName: null
    };
  }

  handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    this.setState({
      image: selectedImage,
    });
  };

  handleImageUpload = () => {
    const { image } = this.state;
    const storage = getStorage(app);
    const imageRef = ref(storage, `images/${image.name}`);
    const imageName = image.name;
    
    uploadBytes(imageRef, image)
      .then(() => {
        this.setState({ imageName: imageName });
        return getDownloadURL(imageRef);
      })
      .then((url) => {
        this.setState({ imageUrl: url });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <input type="file" onChange={this.handleImageChange} />
        <button onClick={this.handleImageUpload}>Upload</button>
        {imageUrl && <img src={imageUrl} alt="preview" />}
      </div>
    );
  }
}

export default ImageUploader;




