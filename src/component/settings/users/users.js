import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddUser from "./addUser";
import Pagination from "react-js-pagination";
import middleware from "../../../store/Middleware/users";
import './user.css'

// const User = (this.props) => {
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser: { areas: [] },
      activePage: 1,
      itemPerPage: 10
    };
  }

  state = {
    // targetUser: { areas: [] },
    openUserForm: false
  };

  // let [addingUser, showAddUser] = useState(false);
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  deleteUser = user => {
    let result = window.confirm("confirm delete user");
    if (result) {
      this.props.deleteUser(user);
    }
  };
  toggleStatus = user => {
    user.status = !user.status;
    this.props.toggleState(user);
  };
  render = () => {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let rendereduser = this.props.data.users.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    let uIndex = this.props.data.users.indexOf(this.state.targetUser);

    uIndex == -1 &&
      (this.state.targetUser = this.props.data.users.find(user => {
        return user._id == this.state.targetUser._id;
      }) || {
        areas: []
      });

    return (
      <section className="app-section">
        {this.state.openUserForm ? (
          <AddUser
            user={this.state.targetUser}
            showAddUser={() => {
              this.setState({
                openUserForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Users</h4>
          {this.props.data.users.length!=0?
          <div className="paggination-setting">

          <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={rendereduser.length}
              totalItemsCount={this.props.data.users.length}
              pageRangeDisplayed={rendereduser.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </div>
          :null}
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              placeholder="Placeholder"
              id="first_name"
              type="text"
              class="validate"
            />
            <label className="adjusted-label" for="first_name">
              Search Users
            </label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>EMPLOYEE CODE</th>
                <th className="wd-200">FULL NAME</th>
                <th className="wd-200">EMAIL</th>
                <th>CONTACT</th>
                <th>ADDRESS</th>
                <th>DATE</th>
                <th>
                  <img
                    onClick={() => {
                      this.setState({
                        targetUser: {
                          areas: []
                        },
                        openUserForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {rendereduser.map((user, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{user.code}</td>
                    <td className="wd-200">{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.areas
                        .map(area => {
                          return area.name;
                        })
                        .join(",")}
                    </td>
                    <td>{user.date}</td>
                    <td>
                    <button
                        onClick={()=>this.toggleStatus( user)}
                        className={
                          user.status
                            ? "control-btn"
                            : "control-btn disabled-btn"
                        }
                      >
                        {user.status ? "Activate" : "Deactivate"}
                      </button>
                      <img
                        title="Edit"
                        onClick={() => {
                          this.setState({
                            targetUser: user,
                            openUserForm: true
                          });
                        }}
                        className="icon pointer"
                        src="/images/table-icons/edit-icon.png"
                      />

                      <img
                        className="icon"
                        onClick={() => {
                          this.deleteUser(user._id);
                        }}
                        src="/images/table-icons/del-icon.png"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        
        </div>
      </section>
    );
  };
}
const mapDispatchtoProps = dispatch => {
  return {
    deleteUser: data => {
      dispatch(middleware.deleteUser(data));
    },
    toggleState: data => {
      dispatch(middleware.toggleUserState(data));
    },

  };
};
export default connect(store => {
  return {
    data: store.userReducer
  };
}, mapDispatchtoProps)(User);
