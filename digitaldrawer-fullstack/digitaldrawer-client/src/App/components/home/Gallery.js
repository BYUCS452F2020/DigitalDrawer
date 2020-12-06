import React from "react";
import NoBookmarks from "./NoBookmarks";
import BookmarkReviewCard from "./BookmarkReviewCard";
const Gallery = props => {
  const results = props.data;
  let bookmarks;
  let noBookmarks;

  // TODO: replace this with call to DB that gets the URL and then search for either a random image or image that fits the url
  // FIXME: The info that will be displayed needs to come from here. We can pass in the url, img, notes, rating, etc.
  if (results.length > 0) {
    bookmarks = results.map(image => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      return <BookmarkReviewCard url={url} key={id} alt={title} date={new Date().toDateString()} />;
    });
  } else {
    noBookmarks = <NoBookmarks />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>{bookmarks.slice(1, 4)}</ul>
      {noBookmarks}
    </div>
  );
};

export default Gallery;
