import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../auth/App.css';
import { Redirect } from 'react-router';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const Newsidebar = (props) => {
    const { user, } = useContext(UserContext);


    if (user) {
        return <Redirect to='/blog' />
    }
    return (
        <React.Fragment>
            <Router>
                <div className="App">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={"/sign-in"}>My site</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div >
                        <div >
                            <Switch>
                                <Route exact path='/sign-in' component={Login} />
                                <Route path="/sign-in" component={Login} />
                                <Route path="/sign-up" component={Register} />
                            </Switch>
                        </div>
                    </div>
                </div></Router>
        </React.Fragment>
    );
}

export default Newsidebar;