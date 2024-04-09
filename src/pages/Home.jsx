import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      setCurrentUser(userData);
    });
    appwriteService
      .getPosts([])
      .then((post) => {
        if (post) {
          setPosts(post.documents);
        }
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (!loading) {
    if (posts.length === 0 || !currentUser) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) =>
              post.status == "active" || post.status == null ? (
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
}

export default Home;
