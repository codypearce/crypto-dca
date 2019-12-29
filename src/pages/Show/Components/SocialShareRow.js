import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditIcon
} from "react-share";

export default function SocialShareRow() {
  return (
    <div style={styles.wrapper}>
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={28} />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={28} />
      </TwitterShareButton>
      <RedditShareButton url={window.location.href}>
        <RedditIcon size={28} />
      </RedditShareButton>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row"
  }
};
