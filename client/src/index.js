import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import PreHome from './views/prehome.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

const root = document.getElementById('root');
const node = (
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={PreHome} />
					<Route path="*" component={App} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(node, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
