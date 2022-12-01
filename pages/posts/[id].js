import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";

const Post = (props) => {
  const { posts } = props;
  const postData = posts[0];
  const router = useRouter();
  const [clicks, addClick] = useState(0);

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
      <PostPage 
        title ={postData.title}
        body ={postData.body}
        date ={postData.date}
        image = {postData.image}
        comments = {postData.comments}
      />
      <Link href='/'><h3>Return Home</h3></Link>
      <h1>{postData.title}</h1>
      <p>{postData.body}</p>
      <p>Additional Data</p>
      <p>{postData.date}</p>
      <button onClick={() => {
        if(clicks == 2) {
          addClick(0);
          deletePost(postData["_id"], router)
        }
        if(clicks < 1)
          {addClick(clicks + 1)}
        console.log(clicks)}}
      >Delete</button>
      
      {clicks == 1 &&
        <div>
       <button onClick={() => {
          addClick(0),
          deletePost(postData["_id"], router)
        }} >Press to Confirm Delete</button>
       <button onClick={() => {
          addClick(0) }}
       >Cancel</button>
        </div>} 
      
      <button onClick={() => {
        let params = { query: { _id: postData["_id"] },
          update: { title:'Another Title', body:'Body has been changed again' }};
        updatePost(params, router);
      }}>Edit Post</button>
    </div>
  );
};

function deletePost(id, cids, router) {
  const params = { _id: id};
  
  const cparams = { _id: { $in: cids } };
  console.log(cparams);
  fetch("/api/comments/deleteall", {
    method: "DELETE",
    body: JSON.stringify(cparams),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
  });

  fetch("/api/posts/delete", {
    method: "DELETE",
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then(() => router.push('/'));
}


function updatePost(params, router) {
  fetch("/api/posts/update", {
    method: "POST",
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => router.push('/posts/' + data["_id"]));
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/posts/feed");
  const data = await res.json();
  return {
    paths: data.map((post) => ({ params: { id: post["_id"] } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const data = await res.json();
  return {
    props: {
      posts: data,
    },
  };
}

export default Post;