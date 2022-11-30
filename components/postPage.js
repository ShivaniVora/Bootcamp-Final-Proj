import React from "react";
import CommentCreator from "./commentCreator";
import PostCreator from "./postCreator";
import styles from "../styles/Home.module.css";

const PostPage = (props) => {
    const title = props.title;
    const body = props.body;
    const date = props.date;
    const image = props.image;
    const comments = props.comments;
    console.log(props);

    
    return(<div className = {styles.row}>
    <div className= {styles.postCreate}>
          <PostCreator />
      </div>
      <div className = {styles.post}>
      <h1>{title}</h1>
      <p>{body}</p>
      <img 
      src={image}
      alt="new"
      />
      <p>Date: {date} </p>
      <div className="Comments">
      <h1> comments </h1>
      {comments.map(txt => <p>{txt}</p>)}
      </div>
      
      <CommentCreator/>
      </div>
    </div>)
}

export default PostPage;