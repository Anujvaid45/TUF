import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar">
        <Link to='/' style={{color:"white",textDecoration:'none'}}>
      <h1>Welcome to TUF</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/list">View List</Link>
          </li>
          <li>
            <Link to="/create">Create Entry</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
