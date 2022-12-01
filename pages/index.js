import styles from "../styles/Home.module.css";
import PostCreator from "../components/postCreator";
import Link from "next/link";
import { useState, useEffect } from 'react';

const pageLimit = 10;

export default function Home(props) {

  const [startFeed, setStartFeed] = useState(0);
  const [feed, setFeed] = useState([]);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    console.log(startFeed);
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
        <h1>Feed</h1>
        {
          feed.map((post)=> (
            <div key={post["_id"]}>
              <Link href={"/posts/" + post["_id"]}>
                <h3>{post.title}</h3>
              </Link>
              <p>{post.body}</p>
            </div>
        ))}
        <div className={styles.row}>
          <button onClick={() => {
            if (startFeed - pageLimit < 0) {
              setPrompt("There are no earlier posts.");
            } else {
              setPrompt("");
              setStartFeed(startFeed - pageLimit);
            }
          }}>{"<"}</button>
          <button onClick={() => {
            setPrompt("");
            setStartFeed(startFeed + pageLimit);
          }}>{">"}</button>
        </div>
        <div>{prompt}</div>
        <div><h3>Explore more Posts!</h3></div>
        <div><h3>{startFeed}</h3></div>
        </div>
      
    </div>
  )
}

export async function getServerSideProps() {
  let params = { skip:0, limit:pageLimit }
  let res = await fetch("http://localhost:3000/api/posts/feed", {
      method: "POST",
      body: JSON.stringify(params),
  });
  // const res = await fetch("http://localhost:3000/api/posts/feed");
  const data = await res.json();
  return {
    props: {
      allPosts: data,
    },
  };
}