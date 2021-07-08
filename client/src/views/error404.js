import React from 'react';
import { Link } from 'react-router-dom';
import '../css/views/error404.css';
import img_error404 from '../assets/images/dog_not_found.jpg';
function Error404() {
	return (
		<div className="error404">
			<h1>Sorry! page not found error</h1>
			<img src={img_error404} alt="error404" />
			<div>
				<Link to="/home" className="button-error404">
					Go back to home!
				</Link>
			</div>
		</div>
	);
}

export default Error404;
