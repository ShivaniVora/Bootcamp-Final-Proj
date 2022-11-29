import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';

function PostCreator(props) {

  const [npTitle, setNPTitle] = useState('');
  const [npBody, setNPBody] = useState('');
  const [npImage, setNPImage] = useState('');

  const createPost = event => {
    console.log('createPost');
    event.preventDefault(); // 👈️ prevent page refresh

    if (npTitle === '' || npBody === '') {
      console.log('both the body and title must have inputs');
    } else {
      console.log("Title: " + npTitle);
      console.log("Body: " + npBody);

      if (npImage !== "") {
        console.log("theres an image too")
      }

      setNPTitle('');
      setNPBody('');
      setNPImage('');
    }
  };

  return (
    <div className={styles.makePostUI}>
      <form onSubmit={createPost}>

        <h1>Create Post</h1>
        <div>
          <button className={styles.addButton} type="submit">{"+"}</button>
        </div>

        <div>
          <div className={styles.textField} id='image'>
            <label>Title: </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={event => setNPTitle(event.target.value)}
              value={npTitle}
            />
          </div>

          <div className={styles.textField}>
            <label>Image URL: </label>
            <input
              id="body"
              name="body"
              type="text"
              value={npImage}
              onChange={event => setNPImage(event.target.value)}
            />
          </div>

          <div className={styles.textField}>
            <label>Content: </label>
            <input
              id="body"
              name="body"
              type="text"
              value={npBody}
              onChange={event => setNPBody(event.target.value)}
            />
          </div>
        </div>

      </form>
    </div>
  );
}




  
export default PostCreator;