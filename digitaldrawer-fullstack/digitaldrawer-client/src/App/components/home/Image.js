import React from "react";

const Image = ({ url, title }) => (
  <li id="wrapper">
    <img src={url} alt={title} className="hover"/>
    <p className="bookmark-overview">URL: https://www.reddit.com</p>
    <p className="bookmark-overview">Rating: 10/10</p>
    <p className="bookmark-overview">Last Visited: 10/30/2020</p>
  </li>
);

export default Image;
