import React from "react";
import Heart from "../../../assets/heart-circle.svg";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/abbie-barton/startup-cs260.git"
        target="_blank"
        className="pt-2"
      >
        My github repository
      </a>
      <div id="heart-holder" className="text-end">
        <img
          id="footer-heart"
          src={Heart}
          alt="heart icon"
          width="50"
        />
      </div>
    </footer>
  );
}
