import React, { Component } from "react";
import DateTime from "react-datetime";
import moment from "moment";
export default class TimeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }
  handleChange = newDate => {
    console.log("newDate", moment(newDate).format("LLL"));
    let newDateString = moment(newDate).format("LLL");
    this.props.datePick(newDateString);
    return this.setState({ date: newDateString });
  };
  render() {
    return <DateTime onChange={this.handleChange} closeOnTab={true} />;
  }
}
