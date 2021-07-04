import React from "react";
import { Route, Switch } from 'react-router-dom';
// views
import PreHome from './views/prehome.js';
import Home from './views/home.js';

import './css/App.css';

function App() {
	return (
		<div className="page">
			{/*<header className="page-header"><Route path="/" component={NavBar} /></header>*/}
			<div className="page-content">
				<Switch>
					<Route exact path="/" component={PreHome} />
					<Route path="/home" component={Home} />
				</Switch>
			</div>
			{/*<div className="page-footer">pie de pagina</div>*/}
		</div>
	);
}

export default App;
