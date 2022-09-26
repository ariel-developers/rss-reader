import React, { useMemo } from "react";
import "./ListItem.scss";

function ListItem({ item, onItemClick }) {
  const { title, pubDate, description, thumbnail } = item;

  const firstParagraph = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = description;
    if (!div.firstElementChild) {
      return description;
    }
    return div.innerText.substring(0, 120);
  }, [description]);

  function onKeyPress(e) {
    if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onItemClick();
    }
  }

  return (
    <li
    className="feed__item"
    tabIndex={0}
    role="button"
    onClick={onItemClick}
    onKeyPress={onKeyPress}
    >
      <div className="container">
        <div className="img"> <img src={thumbnail} alt="list" className="feed__item-image"/></div>
        <div className="content"><div className="feed__item-title">{title}</div>
      <span className="feed__item-date">{pubDate}</span>
      <p className="feed__item-description">{firstParagraph}</p></div>
      </div>
    </li>
  );
}

export default ListItem;
