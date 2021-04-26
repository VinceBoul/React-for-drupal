import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ArticlesList} from "./components/ArticlesList";
import {Header} from "./components/header";
import {DrupalLogs} from "./components/DrupalLogs";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Header />
          <Switch>
              <Route exact path="/" component={App} />
              <Route path="/articles" component={ArticlesList} />
              <Route path="/drupal-logs" component={DrupalLogs} />
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
