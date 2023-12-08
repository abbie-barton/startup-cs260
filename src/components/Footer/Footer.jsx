import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/abbie-barton/startup-cs260.git"
        target="_blank"
        class="pt-2"
      >
        My github repository
      </a>
      <div id="heart-holder" class="text-end">
        <img
          id="footer-heart"
          src="/assets/heart-circle.svg"
          alt="heart icon"
          width="50"
        />
      </div>
    </footer>
  );
}
