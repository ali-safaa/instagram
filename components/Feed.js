import React, { useEffect, useState } from 'react';
import StoryFeed from '../components/StoryFeed';
import PostFeed from '../components/PostFeed';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <StoryFeed />
      {posts.map((post) => (
        <PostFeed key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
