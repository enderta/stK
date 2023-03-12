/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faInstagram,
    faGithub,
    faLinkedin,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

function Footer() {
    return (
        <footer>
            <div className="row">
                <div className="col-md-4">
                    <h3>Follow Us</h3>
                    <ul className="social-icons text-center">
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 text-centre">
                    <p>
                        <span> &copy; {new Date().getFullYear()} All rights reserved</span>{" "}
                        | <span>Registered UK and Scottish charity</span> |{" "}
                        <a href="#">Send website feedback</a>
                        <img
                            className="logo"
                            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
                            alt="Code Your Future Logo"
                            width="80"
                            height="auto"
                        />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;