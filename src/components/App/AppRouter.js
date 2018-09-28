import React, { Component } from 'react';
import './app.sass';
import {Route, Switch} from 'react-router-dom';

import ServiceDirectory from '../ServiceDirectory/ServiceDirectory'
import LogInForm from '../LogInForm/LogInForm'

class AppRouter extends Component {

	render() {
	    return (
	    	<Switch>
	    		<Route path="/" component={LogInForm} exact />
	    		<Route path="/service" component={ServiceDirectory} />
	    	</Switch>
	    )
	}
}

export default AppRouter;

	   		//
