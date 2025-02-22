import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormSchema, FormData } from "../schema";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export const Route = createFileRoute("/contact-form")({
  component: RouteComponent,
});

function RouteComponent() {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // フォーム送信時に本来ブラウザが行う再読み込みをキャンセルする
    event.preventDefault();

    try {
      // Zod によるバリデーションを実施
      const requestParams = FormData.parse(formData);
      console.debug(requestParams);

      // API にリクエストを送信
      await axios
        .post<FormSchema>("http://localhost:8000/contact-form", requestParams)
        .then(function (response) {
          toast.success(
            `${response.data.name} さん、お問い合わせありがとうございます。`
          );
          console.debug("response", response);
        })
        .catch(function (error) {
          toast.error("お問い合わせに失敗しました");
          console.debug(error);
        });
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
      <button
        onClick={() => {
          location.href = "/";
        }}
      >
        ホームに戻る
      </button>
    </div>
  );
}
