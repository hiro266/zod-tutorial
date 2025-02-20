import "../App.css";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FormSchema, FormData } from "../schema";
import { createFileRoute } from "@tanstack/react-router";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Zod によるバリデーションを実施
      const result = FormData.parse(formData);
      console.debug(result);
      toast.success("送信しました。");
    } catch (error) {
      // エラー処理（例：ユーザーへのフィードバック）
      console.error("Validation Error:", error);
      toast.error("入力内容に誤りがあります。");
      throw new Error();
    }
  };

  return (
    <div className="App">
      <h2>お問い合わせフォーム</h2>
      <Toaster />

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
