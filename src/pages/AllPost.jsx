import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      setCurrentUser(user);
    });

    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) =>
            currentUser?.$id == post.userId ? (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
