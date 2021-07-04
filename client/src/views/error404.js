import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
	return (
		<div className="error404">
			<h1>error pagina no enctrada</h1>
			<div>
				<Link to="/home" className="button-error404">
					salir
				</Link>
			</div>
		</div>
	);
}

export default Error404;