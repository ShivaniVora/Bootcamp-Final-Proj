import styles from "../styles/Home.module.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

function PostEditor(props) { 

  const { postId, postTitle, postImage, postBody, setEdit } = props;

  const [prompt, setPrompt] = useState('');
  const [npTitle, setNPTitle] = useState(postTitle);
  const [npBody, setNPBody] = useState(postBody);
  const [npImage, setNPImage] = useState(postImage);

  const router = useRouter();

  const updatePost = event => {

    event.preventDefault(); // prevent page refresh

    if (npTitle === '' || npBody === '') {
      setPrompt('Both the body and title must have text!');
    } else {

      let params = { query: { _id: postId },
          update: { title:npTitle, body:npBody, image:npImage }};

      fetch("/api/posts/update", {
        method: "POST",
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then(() => setEdit(0));

      setNPTitle('');
      setNPBody('');
      setNPImage('');
      setPrompt('');
    }
  };

  return (
    <div className={styles.makePostUI}>
      <form onSubmit={updatePost}>

        <h1>Edit Post</h1>
        <div style={{ display: 'flex', flexDirection : 'column', alignContent: 'centers' }}>
          <div className={styles.textField}>
            <label>Title: </label>
            <textarea
              id="title"
              type="text"
              onChange={event => setNPTitle(event.target.value)}
              value={npTitle}
            >{npTitle}</textarea>
          </div>

          <div className={styles.textField}>
            <label>Image URL: </label>
            <textarea
              id="image-url"
              type="text"
              value={npImage}
              onChange={event => setNPImage(event.target.value)}
            >{npImage}</textarea>
          </div>

          <div className={styles.textField}>
            <label>Content: </label>
            <textarea
              id="body"
              type="text"
              value={npBody}
              onChange={event => setNPBody(event.target.value)}
              >{npBody}</textarea>
          </div>
          <button className={styles.addButton} type="submit">{"Post Content with Edits"}</button>
          <button onClick={() => setEdit(0)}>Cancel</button>
        </div>
        <h3>{prompt}</h3>

      </form>
    </div>
  );
}

export default PostEditor;