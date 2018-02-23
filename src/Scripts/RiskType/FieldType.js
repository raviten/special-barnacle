import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */

class EnumType extends React.Component {
  state = {
    items: []
  };
  constructor(props) {
    super(props);
    this.updateInputValue = this.props.updateInputValue.bind(this);
    this.state = {
      items: this.getItems(props.schema),
      data_type: props.schema.data_type || undefined
    };
  }

  getItems(schema) {
    let items = [];
    if (!schema.oneOf) {
      return;
    }
    let oneOf = schema.oneOf;
    for (let i = 0; i < oneOf.length; i++) {
      items.push(<MenuItem value={oneOf[i]} key={i} primaryText={`${oneOf[i]}`} />);
    }
    return items;
  }


  handleChange = (event, index, value) => {
    this.setState({
      value
    });
    if (this.state.data_type && this.state.data_type === 'number') {
      value = Number(value)
    }
    this.updateInputValue(event, value);
  };

  render() {
    return (
      <SelectField
        floatingLabelText={this.state.hintText}
        floatingLabelFixed={true}
        value={this.state.value}
        onChange={this.handleChange}
        maxHeight={200}
      >
        {this.state.items}
      </SelectField>
    );
  }
}

class FieldType extends React.Component {
  constructor(props) {
    super(props);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateValue = this.props.updateValue.bind(this);
    this.state = {
      ft: this.props.ft,
      value: undefined
    };
  }

  updateInputValue(evt, value){
    if (this.state.ft.field_type === 'number') {
      value = Number(value)
    }
    let name = this.state.ft.name;
    this.updateValue(name, {key: this.state.ft.id, value: value});
  }

  renderFieldType(ft) {
    let fieldType = ft.field_type;
    if (fieldType === "text") {
      return (<TextField
              hintText={ft.name}
              onChange={this.updateInputValue}
              />);
    } else if (fieldType === "number") {
      return (<TextField  type="number"
              onChange={this.updateInputValue}
              hintText={ft.name} />);
    } else if (fieldType === "date") {
      return (<DatePicker
              hintText={ft.name}
              onChange={this.updateInputValue}
              mode="landscape" />);
    } else if (fieldType === "enum") {
      return (<EnumType
              schema={ft.schema}
              updateInputValue={this.updateInputValue}
              hintText={ft.name}/>);
    }
  }

  render() {
    var renderedFt = this.renderFieldType(this.state.ft);
    return (
      <div>
        <label>{this.state.ft.name}</label>
        <div>
          {renderedFt}
        </div>
        <br/>
      </div>
    )
  }

}
export default FieldType;