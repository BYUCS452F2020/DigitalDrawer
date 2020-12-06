import React from "react";
import Container from "./Container";

const Bookmark = ({ searchTerm, page }) => {
    let msg;
    switch (page) {
        case "favorites":
            msg = "Bookmarks You Love";
            break;
        case "later":
            msg = "Bookmarks For Later";
            break;
        case "fun":
            msg = "Bookmarks For Fun";
            break;
        case "work":
            msg = "Bookmarks For Work";
            break;
        default:
            msg = "Bookmarks"
            break;
    }

  return (
    <div>
      <h2>{msg} </h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Bookmark;
