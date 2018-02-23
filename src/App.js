import React from 'react';
import './App.css';
import RiskTypeForm from './Scripts/RiskType/RiskTypeForm';
import RiskType from './Scripts/RiskType/RiskType';
import Risk from './Scripts/Risks/Risks';
import Home from './Scripts/Home';
import {   BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Paper from 'material-ui/Paper';

const style = {
  height: '100%',
  minHeight: 756,
  width: '80%',
  margin: 10,
  padding: 50,
  textAlign: 'left',
  display: 'inline-block',

};

function onTitleClick() {
  window.location.assign('/');

}

const AppBarIcon = () => (
  <AppBar
    title="Home"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    showMenuIconButton={false}
    onTitleClick= {onTitleClick}
  />
);

const Main = () => (
  <main>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/risk-type' component={RiskType}/>
        <Route path='/risk-type/:pk' component={RiskTypeForm}/>
        <Route exact path='/risks' component={Risk}/>
      </Switch>
    </Router>
  </main>
)

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  <div>
    <AppBarIcon />
    <Paper style={style} zDepth={1}>
      <Main />
    </Paper>
  </div>
  </MuiThemeProvider>
)

export default App;