export const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://d6105g6t-4000.inc1.devtunnels.ms";

export async function streamAI(fullUrl, setDetails, setIsLoading) {
  setDetails("");
  setIsLoading(true);

  let reader;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });

    if (!res.body) {
      throw new Error("No response body (SSE not supported)");
    }

    reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE messages are separated by \n\n
      const parts = buffer.split("\n\n");
      buffer = parts.pop();

      for (const part of parts) {
        // Ignore heartbeat
        if (part.startsWith(":")) continue;

        if (part.startsWith("data:")) {
          const text = part.replace("data:", "").trim();

          if (text === "END") {
            setIsLoading(false);
            reader.cancel();
            return;
          }

          setDetails((prev) => prev + text);
        }
      }
    }
  } catch (err) {
    console.error("❌ streamAI error:", err);
  } finally {
    setIsLoading(false);
    if (reader) reader.cancel();
  }
}
