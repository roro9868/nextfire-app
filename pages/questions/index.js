import { collection, getDocs } from "firebase/firestore";

import { firestore, postToJSON } from "../../lib/firebase";
import { QuestionForm } from "../../components/Question/QuestionForm";

export default function Questions({ posts }) {
  return (
    <div>
      <QuestionForm />

      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export async function getStaticProps() {
  const questions = (
    await getDocs(collection(firestore, "questions"))
  ).docs.map(postToJSON);
  return {
    props: {
      posts: questions,
    },
    revalidate: 10, // In seconds
  };
}
