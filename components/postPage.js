import React, { useEffect, useState } from "react";
import CommentCreator from "./commentCreator";
import PostCreator from "./postCreator";
import styles from "../styles/Home.module.css";
import Comment from "./comment";

const PostPage = (props) => {
  const title = props.title;
  const body = props.body;
  const date = props.date;
  const image = props.image;
  const comments = props.comments;
  const postid = props.postid;
  console.log(image);

  const [visuals, setVisuals] = useState([]);

  useEffect(() => {
    const params = { _id: { $in: comments}}
    fetch("/api/comments/find", {
      method: "POST",
      body: JSON.stringify(params),
      })
      .then((res) => res.json())
      .then((data) => setVisuals(data));
  }, []);

  return(
    <div className = {styles.row}>

      <div className= {styles.postCreate}>
        <PostCreator />
        <CommentCreator postid={postid} />
      </div>
      
      <div className={styles.alignPost}>
      <div className = {styles.post}>
        <h1>{title}</h1>
        <p>{body}</p>
        {image !== undefined && <img src={image} alt="No Image"/>}
        <p>Date: {date} </p>
        <div className="Comments">
          <h2> comments </h2>
          {
            visuals.map((comment) =>
            <div key={comment["_id"]}>
              <div>
                <Comment 
                body = {comment.body}
                date = {comment.date}
                />
                {/* <p>{comment.body}</p> */}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

    </div>)
}

export default PostPage;