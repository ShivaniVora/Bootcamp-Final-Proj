import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  console.log("component level");
  const { id } = router.query;
  console.log(id);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    fetch("/api/posts/" + id)
      .then((res) => res.json())
      .then((data) => setPostData(data[0]))
      .catch((err) => setPostData({error: err}));
  }, [id]);

  if (!postData["_id"]) {
    return <div>No Post was Found with This ID</div>;
  }
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
      <p>Additional Data</p>
      <p>{postData.date}</p>
    </div>
  );
};

export default Post;