import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import PostCreator from "../components/postCreator";

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

      <PostCreator />
      
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
