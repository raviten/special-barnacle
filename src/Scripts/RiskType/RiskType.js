import React from 'react';
import axios from 'axios';
import * as ApiConfig from '../ApiConfig';
import getHeader from '../helper';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

const style = {
  paper: {
    display: 'inline-block',
    'width': '200px',
    float: 'left',
  },
  'para': {
    'padding': '20px'
  }
};

class RiskType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {riskTypes: []};
  }


  componentDidMount(props) {
    var _this = this;
    let url = ApiConfig.HOST_URL + ApiConfig.RISK_TYPE;
    console.log(url);
    this.serverRequest =
      axios({
        method: "GET",
        url: url,
        headers: getHeader()
      }).then(function(result) {
          console.log(result);
          _this.setState({
            riskTypes: result.data
          });
        })
  }


  render() {
    return (
      <div>
          <p style={style.para}> Please Select risk type </p>
        <Paper style={style.paper}>
          <Menu>
            {
              this.state.riskTypes.map(function(rm) {
                let to = '/risk-type/' + rm.id;
                return (
                  <Link to={to} key={rm.id}>
                    <MenuItem primaryText={rm.name}
                      leftIcon={
                        <FontIcon
                          className="material-icons"
                          style={{color: '#559'}}>
                            label
                        </FontIcon>
                      }/>
                  </Link>
                )
              })
            }
          </Menu>
        </Paper>
      </div>
    );
  }
}
export default RiskType;
