import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

const Post = (props) => {
  const { posts } = props;
  const postData = posts[0];
  const router = useRouter();

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
      <button onClick={() => deletePost(postData["_id"], router)}>Delete</button>
      <button onClick={() => {
        let params = { query: { _id: postData["_id"] },
          update: { title:'Another Title', body:'Body has been changed again' }};
        updatePost(params, router);
      }}>Edit Post</button>
    </div>
  );
};

function deletePost(id, router) {
  const params = { _id: id};

  fetch("/api/posts/delete", {
    method: "DELETE",
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      router.push('/');
  });
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