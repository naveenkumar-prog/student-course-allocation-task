import { useState } from "react";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

import { useAI } from "../hooks/useAI";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AI() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const aiMutation = useAI();

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const answer = await aiMutation.mutateAsync(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);

      setQuestion("");
    } catch (error: any) {
  let message = "AI service is temporarily unavailable.";

  if (error.response?.status === 429) {
    message =
      "Daily Gemini free quota exceeded. Please try again later.";
  } else if (error.response?.status === 500) {
    message =
      "Server error while contacting AI.";
  }

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text: message,
    },
  ]);
}
  };

  return (
    <div className="space-y-8">

      <PageHeader
        title="AI Assistant"
        subtitle="Ask questions about students, courses and allocations"
      />

      <Card>

        <div className="space-y-6">

          <div
            className="border rounded-xl h-[450px] overflow-y-auto p-5 bg-gray-50"
          >

            {messages.length === 0 && (

              <div className="text-center text-gray-500 mt-20">

                <h2 className="text-xl font-semibold">
                  AI Admission Assistant
                </h2>

                <p className="mt-2">
                  Ask anything about students, courses,
                  reservations or allocations.
                </p>

              </div>

            )}

            {messages.map((message, index) => (

              <div
                key={index}
                className={`mb-5 flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[70%] px-4 py-3 rounded-xl shadow ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >

                  <p>{message.text}</p>

                </div>

              </div>

            ))}

          </div>

          <div className="flex gap-3">

            <input
              type="text"
              value={question}
              placeholder="Ask a question..."
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              onClick={handleSend}
              disabled={aiMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition disabled:bg-gray-400"
            >
              {aiMutation.isPending
                ? "Thinking..."
                : "Send"}
            </button>

          </div>

        </div>

      </Card>

    </div>
  );
}