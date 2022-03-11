import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { firestore, postToJSON } from "../../lib/firebase";
import { QuestionForm } from "../../components/Question/QuestionForm";
import { useEffect, useState } from "react";

export default function Questions({ questions = [] }) {
  const [posts, setPosts] = useState(questions);
  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, "questions"), (snap) => {
      const data = [];

      snap.forEach((doc) => {
        data.push(postToJSON(doc));
      });
      setPosts(data);
    });
    return unsub;
  }, []);

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
      questions,
    },
    revalidate: 10, // In seconds
  };
}
