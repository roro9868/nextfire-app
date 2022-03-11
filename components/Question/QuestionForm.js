import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

export const QuestionForm = () => {
  const [question, setQuestion] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = encodeURI(require("slugify")(question.title));
    const data = {
      title: question.title,
      slug,
      content: question.content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(firestore, "questions", slug), data);

    setQuestion({ title: "", content: "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((q) => ({ ...q, [name]: value }));
  };
  return (
    <form
      onChange={handleChange}
      onSubmit={handleSubmit}
      style={{ maxWidth: 400 }}
    >
      <input
        type="text"
        placeholder="question titile"
        name="title"
        value={question.title}
      />
      <textarea
        style={{ width: "100%", padding: 16, marginTop: 8 }}
        placeholder="question content"
        name="content"
        value={question.content}
      />
      <button type="submit">submit</button>
    </form>
  );
};
