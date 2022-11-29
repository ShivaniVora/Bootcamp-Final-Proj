import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';

export default function Home() {

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    console.log('api called');
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.makePostUI}>
        <p>Create a Post</p>
        <div>
          <button className={styles.addButton}>{"+"}</button>
        </div>
        <div>
          <div className={styles.textField}>
            <label>Title: </label>
            <input></input>
          </div>
          <div className={styles.textField}>
            <label>Image URL: </label>
            <input></input>
          </div>
          <div className={styles.textField}>
            <label>Content: </label>
            <textarea>Type post content here...</textarea>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <h1>Posts</h1>
        {
            allPosts.map((post)=> (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
        ))}
      </div>
      
      
    </div>
  )
}
