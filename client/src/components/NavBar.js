import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components/NavBar.css';

function NavBar() {
	return (
		<div className="navbar">
			<div className="navbar-left">
				<Link to="/home" className="navbar-item">
					Home
				</Link>
			</div>
			<div className="navbar-right">
				<Link to="/createdog" className="navbar-item">
					+ Create Dog
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
