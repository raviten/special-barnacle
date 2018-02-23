import React from 'react';
import axios from 'axios';
import * as ApiConfig from '../ApiConfig';
import getHeader, {getUserHeader} from '../helper';
import FieldType from './FieldType';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};
class RiskTypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormValue = this.updateFormValue.bind(this);
    let riskTypeId = props.match.params.pk;
    this.state = {
      formSubmitting: false,
      riskTypeId: riskTypeId,
      riskType: {
        field_types: []
      },
      form: {risk_type: riskTypeId}
    };
  }


  componentDidMount(props) {
    var _this = this;
    let url = ApiConfig.HOST_URL + ApiConfig.RISK_TYPE + this.state.riskTypeId;
    this.serverRequest =
      axios({
        method: "GET",
        url: url,
        headers: getHeader()
      }).then(function(result) {
        console.log(result);
        _this.setState({
          riskType: result.data
        });
      })

  }

  onsubmit(e) {
    console.log(this.state.form);
    var _this = this;
    let url = ApiConfig.HOST_URL + ApiConfig.RISK;
    _this.setState({
      formSubmitting: true
    });
    this.serverRequest =
       axios({
        method: "POST",
        url: url,
        headers: getUserHeader(),
        data: JSON.stringify(_this.state.form)
      }).then(function(result) {
        _this.setState({
          formSubmitting: true
        });
        window.location.href = '/risks';
      }).catch(function(err){
        _this.setState({
          formSubmitting: false
        });
      })
  }

  updateFormValue(k, v) {
    let updatedForm = this.state.form;
    updatedForm[k] = v;
    console.log(updatedForm);
    this.setState({form: updatedForm})
  }


  render() {
    var _this = this;
    return (
      <div>
        <form>
        {
          this.state.riskType.field_types.map(function(ft) {
              return (
                <FieldType key={ft.id} ft={ft} updateValue={_this.updateFormValue}/>
                );
          })
        }
        <RaisedButton
          label="Submit"
          primary={true}
          disabled={this.state.formSubmitting}
          onClick={this.onsubmit.bind(this)}
          style={style} />
        <Link to={'/risk-type'}>
          <RaisedButton label="Back" secondary={true} style={style} />
        </Link>

        </form>
      </div>
    );
  }
}
export default RiskTypeForm;