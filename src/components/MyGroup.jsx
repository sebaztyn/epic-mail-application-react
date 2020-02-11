import React, { Component } from "react";
//import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchGET } from "./fetch";
import Loading from "./Loading.jsx";
import ViewGroup from "./ViewGroup.jsx";
import Modal from "./Modal.jsx";
import { setDisplayMessageDetails } from "../actions/displayAction.js";

const url =
  process.env.NODE_ENV === "production"
    ? "https://epic-mail-2018.herokuapp.com/api/v1"
    : "http://localhost:3000/api/v1";
export class MyGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupMembers: [],
      emptyGroup: "",
      emptyMembersList: "",
      errorMessage: "",
      indexId: null,
      isLoading: true,
      group_id: null,
      memberListLoading: true,
      showModal: false
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    return fetchGET(`${url}/groups`)
      .then(response => {
        if (response.data) {
          return this.setState({
            groups: response.data,
            emptyGroup: "",
            errorMessage: "",
            isLoading: false
          });
        }
        if (response.message) {
          return this.setState({
            groups: [],
            emptyMessage: response.message,
            emptyGroup: "",
            isLoading: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  setGroupIdHandler = id => {
    this.setState(
      {
        group_id: +id,
        showModal: true
      },
      this.memberListHandler
    );
  };
  memberListHandler = () => {
    return fetchGET(`${url}/groups/${this.state.group_id}/members`)
      .then(response => {
        if (response.data) {
          return this.setState({
            groupMembers: response.data,
            emptyMembersList: "",
            memberListLoading: false
          });
        }
        if (response.message) {
          return this.setState({
            groupMembers: [],
            emptyMembersList: response.message,
            memberListLoading: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  closeModal = () => this.setState({ showModal: false });

  render() {
    if (!localStorage.getItem("token"))
      return this.props.history.push("/login");
    const {
      groups,
      isLoading,
      showModal,
      emptyMembersList,
      groupMembers
    } = this.state;
    const singleGroup = groups.map(group => (
      <ViewGroup
        key={group.group_id}
        id={group.user_id}
        name={group.name}
        memberListHandler={() => this.setGroupIdHandler(group.group_id)}
      />
    ));
    const members = groupMembers.map(member => (
      <div key={member.group_members_id}>
        <strong>
          <em>
            {member.firstname} {member.lastname}
          </em>
        </strong>
        <button onClick={this.closeModal}>Close</button>
      </div>
    ));
    const { displayMessageDetail: displayMessage } = this.props;
    return (
      <div className="flex-1 lg:flex-3 pt-2 sm:left-40 lg:left-20 sm:absolute sm:w-3/5 lg:w-4/5 h-full xs:w-full mr-4">
        <div
          className={`pr-2 absolute top-0 left-0 h-full xs:w-full sm:w-full lg:w-2/5 overflow-y-auto overflow-x-hidden ${
            displayMessage === true
              ? "xs:hidden sm:hidden md:hidden"
              : "xs:block sm:block md:block"
          } lg:block`}
        >
          <div className="uppercase text-gray-300 bg-gray-900 font-bold mt-2 mx-auto h-10 flex justify-center items-center w-10/12 sm:w-11/12 mb-4 xs:rounded-t-lg sm:rounded-tr-lg">
            group list
          </div>
          {isLoading === true && <Loading />}
          {singleGroup}
          {showModal ? (
            <Modal>
              {emptyMembersList ? <div>{emptyMembersList}</div> : members}
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { displayMessageDetail } = state.displayMessage;
  return { displayMessageDetail };
};
const mapDispatchToProps = dispatch => {
  return { setDisplay: () => dispatch(setDisplayMessageDetails(true)) };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyGroup)
);
