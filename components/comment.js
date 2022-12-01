import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Comment = (props) => {
  const body = props.body;
  const date = props.date;
  console.log(body);
  return(
    <div className = {styles.row}>
            <p>{body} {date}</p>

        </div>

    )
}

export default Comment;