import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    fetch("/api/posts/" + id)
      .then((res) => res.json())
      .then((data) => setPostData(data[0]))
      .catch((err) => setPostData({error: err}));
  }, [id]);

  if (!postData["_id"]) {
    return (
      <div>
        <Link href='/'><h3>Return Home</h3></Link>
        <p>No post was found with this id.</p>
      </div>
    );
  }
  return (
    <div>
      <Link href='/'><h3>Return Home</h3></Link>
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
      <p>Additional Data</p>
      <p>{postData.date}</p>
    </div>
  );
};

export default Post;