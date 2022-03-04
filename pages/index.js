import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Admin.module.css'
import Link from 'next/link'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import PostFeed from '../components/PostFeed';
import { firestore, postToJSON } from '../lib/firebase';
import { startAfter, Timestamp, collectionGroup, where, query as firestoreQuery, limit, orderBy, getDocs} from "firebase/firestore";
import { useState } from 'react';


// Max post to query per page
const LIMIT = 4;

export async function getServerSideProps(context) {

  const postsQuery =  firestoreQuery(
    collectionGroup(firestore, 'posts'), 
    where('published', '==', true), 
    orderBy('createdAt', 'desc'),
    limit(LIMIT));

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

    // const query = firestore
    //   .collectionGroup('posts')
    //   .where('published', '==', true)
    //   .orderBy('createdAt', 'desc')
    //   .startAfter(cursor)
    //   .limit(LIMIT);
    const query =  firestoreQuery(
      collectionGroup(firestore, 'posts'), 
      where('published', '==', true), 
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT));
      
    const newPosts = (await getDocs(query)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
      <main>
        <PostFeed posts={posts} />

        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'You have reached the end!'}
      </main>  
  );
}
