import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInput, submitForm } from "../actions/groupAction";

export class CreateGroup extends Component {
  submitHandler = e => {
    e.preventDefault();
    const { name, onSubmitForm } = this.props;
    return onSubmitForm(name);
  };
  render() {
    const { name, inputHandler } = this.props;
    return (
      <form method="post" onSubmit={this.submitHandler}>
        <button type="submit">Create Group</button>
        <button type="reset">Clear</button>
        <input type="text" name="name" onChange={inputHandler} value={name} required/>
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { name } = state.groupStore;
  return {
    name
  };
};
const mapDispatchToProps = dispatch => {
  return {
    inputHandler: () => dispatch(handleInput(event)),
    onSubmitForm: name => dispatch(submitForm(name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
