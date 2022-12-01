import styles from "../styles/Home.module.css";
import PostCreator from "../components/postCreator";
import Link from "next/link";
import { useState, useEffect } from 'react';

const pageLimit = 10;

export default function Home(props) {

  const [postCount, setCount] = useState(0);
  const [startFeed, setStartFeed] = useState(0);
  const [feed, setFeed] = useState([]);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/count")
      .then((res) => res.json())
      .then((data) => setCount(data));

    let params = { skip:startFeed, limit:pageLimit }
    fetch("/api/posts/feed", {
      method: "POST",
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => setFeed(data));
  },[startFeed])

  return (
    <div className={styles.row}>
      <div className= {styles.postCreate}>
          <PostCreator />
      </div>
      <div className={styles.main}>
        <h1>SnapCat!</h1>
        {
          feed.map((post)=> (
          <div className = {styles.allPosts}>
              <Link href={"/posts/" + post["_id"]}>
              <div key={post["_id"]}>
                
                  <h3>{post.title}</h3>
              
                <p>{post.body}</p>
                <div className={styles.dateComment}>
                <p>{post.comments.length} Comments </p>
                <p>{post.date} </p>
                </div>
              </div>
              </Link>
            </div>
        ))}
        <div className={styles.row}>
          <button className = {styles.delete} onClick={() => {
            if (startFeed - pageLimit < 0) {
              setPrompt("There are no more recent posts.");
            } else {
              setPrompt("");
              setStartFeed(startFeed - pageLimit);
            }
          }}>{"<"}</button>
          <button className = {styles.delete} onClick={() => {
            if (startFeed + pageLimit < postCount) {
              setPrompt("");
              setStartFeed(startFeed + pageLimit);
            } else {
              setPrompt("There are no earlier posts.");
            }
          }}>{">"}</button>
        </div>
        <div>{prompt}</div>
        <div><h3>Explore more Posts!</h3></div>
        </div>
      
    </div>
  )
}