import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import PostPage from "../../components/postPage";
import { useState } from "react";
import PostEditor from "../../components/postEditor";

const Post = (props) => {
  const { posts } = props;
  const postData = posts[0];
  const router = useRouter();
  const [clicks, addClick] = useState(0);
  const [edit, setEdit] = useState(0);

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

      {edit == 0 &&
      <div>
        <PostPage 
          title ={postData.title}
          body ={postData.body}
          date ={postData.date}
          image = {postData.image}
          comments = {postData.comments}
        />
      </div>} 

      {edit == 1 &&
      <div>
        <PostEditor
          postId={postData._id}
          postTitle={postData.title}
          postImage={postData.image}
          postBody={postData.body}
          setEdit={setEdit}
         />
      </div>} 

      <Link href='/'><h3>Return Home</h3></Link>
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
      
      <button onClick={() => {setEdit(1);}}>Edit Post</button>
    </div>
  );
};

function deletePost(id, router) {
  const params = { _id: id };

  fetch("/api/posts/delete", {
    method: "DELETE",
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      router.push("/");
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