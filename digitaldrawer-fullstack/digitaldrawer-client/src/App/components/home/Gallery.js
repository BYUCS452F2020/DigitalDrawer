import React from "react";
import NoBookmarks from "./NoBookmarks";
import BookmarkReviewCard from "./BookmarkReviewCard";
const Gallery = props => {
  const results = props.data;
  let bookmarks;
  let noBookmarks;

  /* Hardcoded DB Data in case DB decides to be a Karen for demo */
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
      return <BookmarkReviewCard url={url} key={id} alt={title} date={new Date().toDateString()} site={title+".com"} />;
    });
  } else {
    noBookmarks = <NoBookmarks />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>
        <BookmarkReviewCard url={"https://cnet2.cbsistatic.com/img/Fdd4mqgolGnyFa6LyPZzfqqZIQM=/1200x675/2017/11/24/c59c1263-f401-4709-a09d-84b0bccdbdca/reddit-alien-red.jpg"} key={1} alt={"Reddit"} date={new Date().toDateString()} site={"www.reddit.com"} />
        <BookmarkReviewCard url={"https://i.ytimg.com/vi/_pjICT3pdNw/maxresdefault.jpg"} key={2} alt={"HackTheBox"} date={new Date().toDateString()} site={"www.hackthebox.eu"} />
        <BookmarkReviewCard url={"https://miro.medium.com/max/1200/0*zuhXdNAIUoxEem4-.jpeg"} key={1} alt={"LeetCode"} date={new Date().toDateString()} site={"www.leetcode.com"} />
        <BookmarkReviewCard url={"https://www.pluralsight.com/content/pluralsight/en/jcr:content/image-res/file.transform/share-image/image.img.1cf79401-04ae-4bc1-baec-de3432e76803.jpg"} key={1} alt={"PluralSight"} date={new Date().toDateString()} site={"www.pluralsight.com"} />
        <BookmarkReviewCard url={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAflBMVEX///8AAACHh4dlZWVXV1dJSUmlpaXNzc24uLiMjIyTk5NMTExra2uWlpZ4eHiamprR0dGysrLm5ua+vr6ioqKrq6ve3t75+fnw8PB+fn7l5eUaGhp3d3fFxcXb29tRUVE+Pj4LCwtdXV01NTUWFhZBQUEmJiZvb28wMDAiIiI0tQbAAAAHCUlEQVR4nO2da1viMBBGC+UiKMIiFZC7l0X//x/cRVcpIW+alEwmw+Z8pOUxR6BNZyaTLDMxW03mz9vFrhEnu4+3vFl0p0YHAw9LbgNbPppdd71uzj1sR+ZrJ79iwT3gGmwfrP1+cY+1Lu8rK7/1O/dAL2Azqxaccw/yQiYVfuPf3CO8mI3x5vHAPTwvPGLBCffYPAEvOD3ukXnjRi/Y5B6XR7SKQ+5ReUXzRb2Oi8yRs8vNE/eIvKPeND64B+Sd1qngPfd4CCjKgiPu0ZBQnqPKn6vpyI+CBfdYiBj9GHKPhIq3b8FO5anbeeehGxc3k2X1b+v7Q9yZT2s91A5mETMrthVD/zpvZTxpOea1qGDdMo7+a/DPhjO2hmetSFjtDOPvH86YGk7ocQ/fCkPgc3E4foOP24fneOljhcN3cA+P1ggkM4GDE4fAlPhP8AAMT2yybIyONblH7QS8pOJ7xQv3mN2A18sx/Aq7JTr4QamIFYpx33GP2BmQjOig+/0T94CdAYGmXvaifb3NPd4a6A2X2av29V/cw62BPt6bZzvt6xZJqujoak2e9Z/th/Lm6fyuzPzscap5cnx/9g8a5Ccn0PzKtSot/ct75b1qPHyoHFfntnPluBrpUiJ9ntA+EQPDfoXhQDmu3ozuWQy1twVgWCjvlWGovbUDQzV1I8NQO/1OhskwGSbDZJgMk2EyhIbqvFU1XFYYbqIzVCMEaihVNVALBNWQpfrswW+YrU9yd+dxuKeT46Oz47OK4/yGIkiGyTB+kmEyjJ9kmAzjJxkmw/hJhmUkldIc0ZZGAcN2LpA7bcIeGF4RyVA+yVA+yVA+yVA+yVA+yVA+yVA+yVA+yVA+/61h3mvKo9d2MLz+aOL1R4STYZwkw2QYP8kwGcZPMkyG8ZMM6xmOh/E0XyAxPBTxE9Wlu0NhOPg8O5ZOUgSGd19nv0bSC8y74fSnlVgkPSZ8G5Y7nqrr93nwbHjauUdtQcCCX0N1rVcMsSuvhucNwiJoXefRcPqmeQ//BdWf4Uz7nvdAHhh/hqC1+XMgEYg/Q9SylrvDm8ffIWr/xtx7yee1FHV/5Z2E+zTUX2sazP2lvN4PH4HhIoQJwu+cBm00cBvABOF5XjoAimqzgYD4fra4A4pVm/XQ4f35UDd1O2C3rRQB/p+Ad0CRq6uk/ygGbF/LNAkniNPoOxWy9a+liLWhGWpe/VYCSOKlaJc2tb1LEGhi3hugyJEXIMpboC14GIL9RIYRTcKpck9rYPibzARBll1DWw/QNIMyQJc/RFsT0HSDwhBmSNEGEx0aEwRlDhht9xJ2/whKQ0Pf/oCQ5vHR1nu7kJNw2koFtInE1rsHhrgWA+0iEXCTBepqE7QTu9pFkg7yehoU1QiWWiQ3hNu3+TZBkBsaNrMJA7Uh3E5YbWFPBrEh3E443OM+rSHcBjPg9JvUEO6XHDImRWkI96IN+oxIaIhybY0thQiEzhDGvgMHMsgMYSwqdDCKzBBu6R267pTKEG7nGrwOjMgQBb0Z6jJoDOEupwzFikEzM+EmoyUoDOEmriwVtQSGMUxGS/g3hJNRprJv74Yox020P0c1vg1Rzum4K31oPBvCyWhVrXCzfVuftukX7tcQTkarotwwXmWJITjp1XC6QCOomm3DcI4l6hY2VIb6HWgbFpPRSw0NlYE+DW/R36+ejMowhJNRi6I9EYb36K/bVLJLMISTUavKUgGGKBlqudxCsKHhMi7MEORCbdcESTA820fugPVCWRGGmqS9/cI1GYZnzxUL+5ILIYbq5cYh9CvFMJuVp94uxfliDLPpcfLtVCwrx/A4/XYrXovE0K6oMLf/bwQx1M6XgaFl7v0QD3Zd5kT4BPzsYGibmy5unWPbMARpieH55dXBkLIEZtW/BEM6RF8C2sp22tdjaTnjgv7bkWf6kFLg+mUv6EsHc5Dg5G+Q4I5W5O+VCcRcomn+ZA1IE/VRBjD4YomL2elFCljby7bWtSaorq4LM0iv3EN2w7D8Ch4KWKDtARiEz9AlqBFJ7ydL0NL5z/ARLDZgqTaoh9nBMFEMV2Z/GfAT/Dc5w4f52wbZMIO/we+Zy3nfrhIxdCkzY0y5fj3bwfLXT97Crj9z5QbWDX7yL0T2bjypsRjE06L0lFHV4/T3HQ8tcy2xmQ87UTEZLtEanRI/GWnzJy2X44Xy0shCrJTiuNr9S8RTrr2BWU/RnFyVUNcnySjPfxYXJmGooWO4Glsq55EmWGooFE3C77puGdrqM116XiogVHg9ijAWitoGSMNQIAmX2UnixVhVMIULssVQuRICrqEQgkUkewarRwVguZRlJHUKl9uXvYwk/hz3bgsex31YjR8lL50avX4eJ3D1ZGTkRf2s/NNq0tznrXaU3Lbyfa/oVhTV/QH686l+ngldowAAAABJRU5ErkJggg=="} key={1} alt={"Educative"} date={new Date().toDateString()} site={"www.educative.io"} />
      </ul>
      <ul>{bookmarks.slice(1, 10)}</ul>
      {noBookmarks}
    </div>
  );
};

export default Gallery;
