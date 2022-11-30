import React from "react";
import CommentCreator from "./commentCreator";
import PostCreator from "./postCreator";
import styles from "../styles/Home.module.css";

const PostPage = (props) => {
    const title = props.title;
    const body = props.body;
    const date = props.date;
    console.log(props);

    
    return(<div className = {styles.row}>
    <div className= {styles.postCreate}>
          <PostCreator />
      </div>
      <div className = "post">
      <h1>{title}</h1>
      <p>{body}</p>
      <p>Additional Data</p>
      <p>{date}</p>
      <CommentCreator/>
      </div>
    </div>)
}

export default PostPage;