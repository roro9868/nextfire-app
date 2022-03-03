import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import { collection, where, query as firestoreQuery, limit, orderBy, getDocs} from "firebase/firestore";

export async function getServerSideProps({ query }) {
  const { username } = query;
  console.log('outputing username: ' + username)
  const userDoc = await getUserWithUsername(username);

  // console.log(username);
  // If no user, short circuit to 404 page
  if (!userDoc) {
    console.log('no user found');
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = firestoreQuery(collection(userDoc.ref, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'),limit(5));
    // console.log('postsQuery ' + (await getDocs(postsQuery)).docs);
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}