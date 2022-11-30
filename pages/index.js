import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
import PostCreator from "../components/postCreator";
import Link from "next/link";

export default function Home() {

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts/feed")
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
            <div key={post["_id"]}>
              <Link href={"/posts/" + post["_id"]}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.body}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
