import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h3: ({ node, ...props }) => (
          <h3 style={{ margin: "20px 0 12px" }} {...props} />
        ),
        li: ({ node, ...props }) => (
          <li style={{ marginBottom: "6px", lineHeight: "1.5" }} {...props} />
        ),
        p: ({ node, ...props }) => (
          <p style={{ marginBottom: "8px" }} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
