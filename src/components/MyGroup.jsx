import React, { Component } from "react";
import { navigate } from "@reach/router";
import { fetchGET } from "./fetch";
import Loading from "./Loading.jsx";
import ViewGroup from "./ViewGroup.jsx";
import Modal from "./Modal.jsx";

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
    return fetchGET("http://localhost:3000/api/v1/groups")
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
    return fetchGET(
      `http://localhost:3000/api/v1/groups/${this.state.group_id}/members`
    )
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

  closeModal = () => this.setState({ showModal: false })

  render() {
    if (!localStorage.getItem("token")) return navigate("/login");
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
    if (isLoading === true) return <Loading />;
    return (
      <div>
        {singleGroup}
        {showModal ? (
          <Modal>
            {emptyMembersList ? <div>{emptyMembersList}</div> : members}
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default MyGroup;
