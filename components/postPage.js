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
  //const comments = props.comments;
  const postid = props.postid;

  const [comments, setComments] = useState(props.comments);
  const [visuals, setVisuals] = useState([]);
  const [commentList, setCommentList] = useState(props.comments);

  useEffect(() => {
    const params = { _id: { $in: comments}}
    fetch("/api/comments/find", {
      method: "POST",
      body: JSON.stringify(params),
      })
      .then((res) => res.json())
      .then((data) => setVisuals(data));
  }, [comments]);

  return(
    <div className = {styles.row}>

      <div className= {styles.postCreate}>
        <PostCreator />
        <CommentCreator postid={postid} setComments = {setComments} comments = {comments} />
      </div>
      
      <div className = {styles.post}>
        <div>
        <h1>{title}</h1>
        <p>{body}</p>
        {image !== undefined && <img src={image} alt="No Image"/>}
        <p>Date: {date} </p>
        </div>
        <div className="Comments">
          <h2 style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}> Comments </h2>
          {
            visuals.map((comment) =>
            <div key={comment["_id"]}>
                <Comment 
                body = {comment.body}
                date = {comment.date}
                />
            </div>
          )}
        </div>
        </div>

    </div>)
}

export default PostPage;