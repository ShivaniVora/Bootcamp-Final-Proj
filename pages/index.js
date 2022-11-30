import styles from "../styles/Home.module.css";
import PostCreator from "../components/postCreator";
import Link from "next/link";
import CommentCreator from "../components/commentCreator";

export default function Home(props) {

  const { allPosts } = props;

  return (
    <div className={styles.row}>
      <div className= {styles.postCreate}>
          <PostCreator />
      </div>
      <div className={styles.main}>
        <h1>Feed</h1>
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

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts/feed");
  const data = await res.json();
  return {
    props: {
      allPosts: data,
    },
  };
}