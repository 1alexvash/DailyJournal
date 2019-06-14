import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, addPost, removePost } from "../../actions/posts";

const Posts = ({ auth, posts, getPosts, addPost, removePost }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleSubmit = e => {
    e.preventDefault();
    const post = e.target.text.value;
    if (post !== "") {
      addPost(post);
      e.target.text.value = "";
    }
  };

  if (!auth.user) {
    return "Please sign in to see posts";
  }

  return (
    <div>
      {auth.user ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" />
          <input type="submit" value="Add a post" />
        </form>
      ) : null}

      <hr />
      {posts.posts.map(post => {
        return (
          <div key={post._id}>
            <b>{post.authorEmail}</b> - {post.text}
            {auth.user.email === post.authorEmail ? (
              <button onClick={() => removePost(post._id)}>remove post</button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, addPost, removePost }
)(Posts);
