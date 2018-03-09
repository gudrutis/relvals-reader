import React, {Component} from 'react';
import './App.css';
import JSONPretty from 'react-json-pretty';
import {Route, Switch} from "react-router-dom";
import queryString from 'query-string';
import Navigation from "./Components/Navigation";
import Jumbotron from "react-bootstrap/es/Jumbotron";
import Layout from "./Components/Layout";
//------------------------------------------
//      Main entry component
//------------------------------------------

/**
 * Mainly for routing
 */
class App extends Component {

    constructor() {
        super();
        this.state = {};
    }

    static errorWrongRoute = (
        <Jumbotron>
            <h1>Incorrect route specified</h1>
            <p>The route needs to be "/release_date/release_que"</p>
        </Jumbotron>
    );

    static containerWraper(content) {
        return (
            <div className={'container'}>{content}</div>
        )
    }

    render() {
        return (
            <Switch>
                <Route path="/:date/:que"
                       render={(props) => (<Layout {...props}/>)}
                />
                <Route>
                    {App.containerWraper(App.errorWrongRoute)}
                </Route>
            </Switch>
        );
    }
}

export default App;
