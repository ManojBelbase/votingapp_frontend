import React from "react";

const Footer = () => {
  return (
    <footer className="border-gray-800 border-t-2 text-gray-400 py-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} Designed and Developed by
        <a href="https://www.manojbelbase.com.np/" className="text-green-400">
          Manoj Belbase
        </a>
      </p>
    </footer>
  );
};

export default Footer;
