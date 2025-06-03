import { useEffect, useState } from "react";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeViewer({
  rawUrl,
  language,
  filename,
  height
}: {
  rawUrl: string;
  language: string;
  filename: string;
  height?: string
}) {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        //read the file from the rawUrl
				//use direct axios
        console.log(filename);
        const response = await axios.get(rawUrl);
        const data = response.data as string;
        console.log(data);
        setCode(data);
      } catch (error) {
        console.error("Error fetching code:", error);
        setError("Failed to load code.");
      } finally {
        setLoading(false);
      }
    };

    fetchGists();
  }, []);

  if (loading) return <p>Loading gist...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <SyntaxHighlighter
        language={language || "text"}
        style={atomOneLight}
        showInlineLineNumbers={true}
        showLineNumbers={true}
        customStyle={{
          borderRadius: 6,
          padding: 16,
          fontSize: 14,
          margin: 0,
          height: height || "auto",
          overflow: "auto",
          width: "100%",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
}
