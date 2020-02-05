import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInput, submitForm } from "../actions/groupAction";
import { Editor, EditorState, RichUtils } from "draft-js";
import "../css/index.css";

export class CreateGroup extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };
  changeHandler = editorState => this.setState({ editorState });
  submitHandler = e => {
    e.preventDefault();
    const { name, onSubmitForm } = this.props;
    return onSubmitForm(name);
  };
  toggleInlineStyle = e => {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");
    return this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
    });
  };
  render() {
    const { name, inputHandler } = this.props;
    return (
      <div className="my-little-test">
        <input
          type="button"
          value="Bold"
          data-style="BOLD"
          onMouseDown={this.toggleInlineStyle}
        />
        <input
          type="button"
          value="Italics"
          data-style="ITALIC"
          onMouseDown={this.toggleInlineStyle}
        />
        <div className="draft-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.changeHandler}
          />
        </div>
        <form method="post" onSubmit={this.submitHandler}>
          <button type="submit">Create Group</button>
          <button type="reset">Clear</button>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            value={name}
            required
          />
        </form>
      </div>
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
