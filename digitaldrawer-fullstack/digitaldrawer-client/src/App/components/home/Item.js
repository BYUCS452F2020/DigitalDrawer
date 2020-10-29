import React from "react";
import Container from "./Container";

const Item = ({ searchTerm }) => {
    let msg = "Your Bookmarks";
    // if (searchTerm === 'favorite' || 'winter') {
    //     msg = msg + "You Love";
    // } else if (searchTerm === 'later')  {
    //     msg = msg + "For Later";
    // } else if (searchTerm === 'fun' || 'color') {
    //     msg = msg + "For Fun";
    // } else if (searchTerm === 'business' || 'work') {
    //     msg = msg + "For Business";
    // } else {
    //     msg = msg + "Related To " + searchTerm;
    // }
  return (
    <div>
      <h2>{msg} </h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Item;
