import styles from "../styles/Home.module.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

function PostCreator(props) { 

  const [prompt, setPrompt] = useState('');
  const [npTitle, setNPTitle] = useState('');
  const [npBody, setNPBody] = useState('');
  const [npImage, setNPImage] = useState('');
  const router = useRouter();
  const [npid, setNPid] = useState(0);

  const createPost = event => {
    event.preventDefault(); // prevent page refresh

    if (npTitle === '' || npBody === '') {
      setPrompt('Both the body and title must have text!');
    } else {
      let params = { title:npTitle, body:npBody };
      let id = 0;
      if (npImage !== "") {
        params = { title:npTitle, body:npBody, image:npImage };
      }

      fetch("/api/posts/create", {
        method: "POST",
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push('/posts/' + data["_id"]);
      });

      setNPTitle('');
      setNPBody('');
      setNPImage('');
      setPrompt('');

      
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
        <h3>{prompt}</h3>

      </form>
    </div>
  );
}




  
export default PostCreator;