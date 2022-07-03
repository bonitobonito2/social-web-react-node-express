import React from "react";
import classes from "./post.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PostList from "./postList";
function Post() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mhm = queryParams.get("show");
  return (
    <center>
      <div className={classes.post}>
        {mhm !== "mine" && (
          <button className={classes.button}>
            <Link to="/posts?show=mine">my posts</Link>
          </button>
        )}
        {mhm === "mine" && (
          <button className={classes.button}>
            <Link to="/posts">all posts</Link>
          </button>
        )}

        <PostList />
      </div>
    </center>
  );
}

export default Post;
