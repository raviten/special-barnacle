import React from 'react';
import axios from 'axios';
import * as ApiConfig from '../ApiConfig';
import {getUserHeader} from '../helper';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  paper: {
    'width': 'auto'
  },
  'para': {
    'padding': '2px'
  },
  'pre': {
    'whiteSpace': 'pre-wrap',
    'wordWrap': 'break-word'
  }
};

class Risk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {risks: []};
  }


  componentDidMount(props) {
    var _this = this;
    let url = ApiConfig.HOST_URL + ApiConfig.RISK;
    console.log(url);
    this.serverRequest =
      axios({
        method: "GET",
        url: url,
        headers: getUserHeader()
      }).then(function(result) {
          console.log(result);
          _this.setState({
            risks: result.data
          });
        })
  }


  render() {
    return (
      <div>
          <p style={style.para}> Insured Risks (Total {this.state.risks.length} risks covered)</p>
        <Paper style={style.paper}>
         <Table >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.state.risks.map(function(risk) {
                let d = [];
                let i = 1;
                for (let k in risk.data){
                  if (risk.data.hasOwnProperty(k)) {
                       d.push(<p key={i}>{k} : {risk.data[k]['value']}</p>);
                      i = i + 1;
                  }
                }
                return (
                      <TableRow key={risk.id}>
                        <TableRowColumn>
                          {risk.name}
                        </TableRowColumn>
                        <TableRowColumn>
                            {d}
                        </TableRowColumn>
                      </TableRow>
                                    )
              })
            }
            </TableBody>
            </Table>
        </Paper>
      </div>
    );
  }
}
export default Risk;
