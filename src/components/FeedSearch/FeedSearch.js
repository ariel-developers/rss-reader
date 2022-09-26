import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getHistory, addHistoryItem } from "../../utils/feedHistory";
import SearchInput from "../SearchInput/SearchInput";
import "./FeedSearch.scss";

function FeedSearch({ setResponse }) {
  const [url, setUrl] = useState(() => getHistory()[0].url);
  const response = useFetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);

  useEffect(() => {
    setResponse(response);
    if (response && "feed" in response) {
      addHistoryItem(response.feed);
    }
  }, [response, setResponse]);

  return (
    <form
      name="feed search form"
      className="feed-search"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const input = form[0];
        setUrl(input.value);
      }}
    >
      <SearchInput onSubmit={setUrl} />
      {response === null ? (
        <span
          className="spinner"
          role="progressbar"
          aria-valuetext="loading"
          aria-busy="true"
          aria-live="assertive"
        />
      ) : (
        <button className="feed-search__button">{"\u276F"}</button>
      )}
    </form>
  );
}

export default FeedSearch;
