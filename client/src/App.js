import React from 'react';
import { Route, Switch } from 'react-router-dom';

// views
import Home from './views/home';
import Error404 from './views/error404';
import Dog from './views/dog';

import NavBar from './components/NavBar';

import './css/App.css';

function App() {
	return (
		<div className="page">
			<header className="page-header">
				<Route path="/" component={NavBar} />
			</header>
			<div className="page-content">
				<Switch>
					<Route exact path="/home" component={Home} />
					<Route exact path="/dog/:dogId" component={Dog} />
					<Route path="*" component={Error404} />
				</Switch>
			</div>
			<div className="page-footer">pie de pagina</div>
		</div>
	);
}

export default App;
