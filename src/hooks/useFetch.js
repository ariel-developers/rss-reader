import { useEffect, useState } from "react";

async function doFetch(url, options) {
  const result = await fetch(url, options);
  const json = await result.json();

  if (json.status === "ok") {
    return json;
  } else {
    throw new Error(json.message);
  }
}

export function useFetch(url) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let didCancel = false;
    (async () => {
      setResponse(null);
      try {
        const result = await doFetch(url, { signal: controller.signal });
        if (didCancel) return;
        setResponse(result);
      } catch (e) {
        setResponse({ error: e.message });
      }
    })();

    return () => {
      controller.abort();
      didCancel = true;
    };
  }, [url]);

  return response;
}
