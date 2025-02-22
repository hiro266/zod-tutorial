import "../App.css";
import React from "react";
import { createFileRoute } from "@tanstack/react-router";

const App: React.FC = () => {
  return (
    <button
      onClick={() => {
        location.href = "/contact-form";
      }}
    >
      お問い合わせフォーム
    </button>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
