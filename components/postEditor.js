import styles from "../styles/Home.module.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

function PostEditor(props) { 

  const { postId, postTitle, postImage, postBody, setEdit, setPostData, postData } = props;

  const [prompt, setPrompt] = useState('');
  const [npTitle, setNPTitle] = useState(postData.title);
  const [npBody, setNPBody] = useState(postData.body);
  const [npImage, setNPImage] = useState(postData.image);

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
      setPostData({_id: postId, title: npTitle, image: npImage, body: npBody, comments: postData.comments});
    }
  };

  return (
    <div className={styles.makePostUI}>
      <form onSubmit={updatePost}>
        <h1 style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>Edit Post</h1>
        <div style={{ display: 'flex', flexDirection : 'column', justifyContent: 'center' }}>
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
          <div className = {styles.buttons}>
          <button className={styles.delete} type="submit">{"Post Content with Edits"}</button>
          <button className = {styles.delete} onClick={() => setEdit(0)}>Cancel</button>
          </div>
        </div>
        <h3>{prompt}</h3>

      </form>
    </div>
  );
}

export default PostEditor;