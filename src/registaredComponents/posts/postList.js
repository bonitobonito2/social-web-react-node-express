import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./postItem";
import { useSelector } from "react-redux";
function PostList() {
  const myInformation = useSelector((state) => state.person);
  const [data, setData] = useState([]);
  useEffect(() => {
    const takePosts = async () => {
      const res = await axios.post("http://localhost:5000/getPost", {
        email: myInformation.email,
      });
      const result = await res.data;
      console.log(result);
      setData(result);
    };
    takePosts();
  }, []);

  console.log(data);
  if (data === "no posts, create one?") {
    return (
      <div>
        no posts, <button>create one?</button>
      </div>
    );
  }
  return (
    <div>
      {data.map((post) => (
        <PostItem 
         name={post.name}
         lastname={post.lastname}
         key = {post.id}
         id = {post.id}
         email = {post.email}
         description = {post.description}
         potourl = {post.postUrl} />
      ))}
    </div>
  );
}

export default PostList;
