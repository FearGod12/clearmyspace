import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./style.css";

export default function Footer () {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-column">
          <h4 className="footer-heading">Help</h4>
          <ul className="footer-links">
            <li>
              <Link to="/help-center" className="footer-link">Help Center</Link>
            </li>
            <li>
              <Link to="/contact-us" className="footer-link">Contact Us</Link>
            </li>
            <li>
              <Link to="/how-to-shop" className="footer-link">How to shop on ClearMySpace?</Link>
            </li>
            <li>
              <Link to="/delivery-options" className="footer-link">Delivery options and timelines</Link>
            </li>
            <li>
              <Link to="/return-product" className="footer-link">Report a Seller?</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">About ClearMySpace</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about-us" className="footer-link">About Us</Link>
            </li>
            <li>
              <Link to="/terms" className="footer-link">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link">Privacy Notice</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-heading">Make Money with ClearMySpace</h4>
          <ul className="footer-links">
            <li>
              <Link to="/login" className="footer-link">Sell on ClearMySpace</Link>
            </li>
            <li>
              <Link to="/#" className="footer-link">Become a Sales Consultant</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-icons">
        <a href="#" className="social-icon-link">
          <FaLinkedin className="social-icon" />
        </a>
        <a href="#" className="social-icon-link">
          <FaInstagram className="social-icon" />
        </a>
        <a href="#" className="social-icon-link">
          <FaFacebook className="social-icon" />
        </a>
        <a href="#" className="social-icon-link">
          <FaTwitter className="social-icon" />
        </a>
      </div>
    </footer>
  );
};
