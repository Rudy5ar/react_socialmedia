import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Footer.css';

interface FooterProps {
    user: string | undefined;
  }

const Footer: React.FC<FooterProps> = ({ user }) => {
    return (
        <footer className="footer">
            <Link to={`/user/${user}`}>{user ? user : 'Unknown User'}</Link>
        </footer>
    );
};

export default Footer;
