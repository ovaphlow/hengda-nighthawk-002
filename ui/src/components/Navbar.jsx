import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTools,
  faUserCircle,
  faBell,
} from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">动车段帐项管理系统</a>
        <ul className="navbar-nav mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <FontAwesomeIcon icon={faHome} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/setting">
              <FontAwesomeIcon icon={faTools} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/message">
              <FontAwesomeIcon icon={faBell} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/user">
              <FontAwesomeIcon icon={faUserCircle} fixedWidth />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
