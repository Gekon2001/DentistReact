import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './components/App/AppRouter';

ReactDOM.render(
	<BrowserRouter>
		<AppRouter />	
	</BrowserRouter>, document.getElementById('root'));

