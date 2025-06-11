import { useEffect, useState } from "react";
import axios from "axios";
import SyntaxHighlighter from "react-syntax-highlighter";

const tempCode = `{
  "name": "vercel-monorepo",
  "version": "0.0.0",
  "private": true,
  "license": "Apache-2.0",
  "packageManager": "pnpm@8.3.1",
  "dependencies": {
    "lerna": "5.6.2"
  },
  "devDependencies": {}
}`;

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
        const response = await axios.get(rawUrl);
        const data = response.data as string;
        console.log(filename);
        console.log('data for file ', filename, ' ', typeof(data));
        if(!filename.includes('.geojson')) {
          setCode(data);
        } else {
          setCode(tempCode)
        }
      } catch (error) {
        console.error("Error fetching code for:", filename, error);
        setError("Failed to load code.");
      } finally {
        setLoading(false);
      }
    };

    fetchGists();
  }, []);

  if (loading) return <p style={{ height: height || "auto", width: "100%",}}>Loading gist...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <SyntaxHighlighter
        language={language || "text"}
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
        {code || tempCode}
      </SyntaxHighlighter>
    </>
  );
}
