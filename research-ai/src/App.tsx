import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

 const handleResearch = async (): Promise<void> => {
  if (!question.trim()) return;

  setLoading(true);
  setAnswer("");

  try {
    const response = await fetch(
      "https://shanusmani.app.n8n.cloud/webhook/research",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    console.log("n8n response:", data);

    setAnswer(data.output);
  } catch (error) {
    console.error("Research failed:", error);
    setAnswer("Something went wrong while researching.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app">
      <header className="header">
        <h1>ResearchAI</h1>
        <p>Ask a question and let AI research it for you.</p>
      </header>

      <main className="container">
        <section className="search-section">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What would you like to research?"
            rows={5}
          />

          <button
            onClick={handleResearch}
            disabled={loading || !question.trim()}
          >
            {loading ? "Researching..." : "Research"}
          </button>
        </section>

        {answer && (
          <section className="answer-section">
            <h2>Answer</h2>
            <p>{answer}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;