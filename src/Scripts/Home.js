import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class Home extends Component {
  render() {
    return (
      <div>
            <Link to={'/risk-type'}>
              <RaisedButton
                label="Insure a Risk"
                primary={true}
                style={style}/>
            </Link>
            <Link to={'/risks'}>
              <RaisedButton
                label="View Risks"
                primary={true}
                style={style}/>
            </Link>
      </div>
    );
  }
}

export default Home;
