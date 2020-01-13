import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddUser from './addSalary';

// const User = (this.props) => {
class Salary extends React.Component {


    state = {
        targetUser: { areas: [] },
        openUserForm: false
    }

    // let [addingUser, showAddUser] = useState(false);

    render = () => {

        let uIndex = this.props.data.users.indexOf(this.state.targetUser);

        uIndex == -1 && (
            this.state.targetUser = this.props.data.users.find((user) => {
                return user._id == this.state.targetUser._id;
            }) || {
                areas: []
            }
        );

        return <section className="app-section">
            {this.state.openUserForm ? <AddUser user={this.state.targetUser} showAddUser={() => {
                this.setState({
                    openUserForm: false,
                })
            }} /> : null}
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Salary</h4>
            </div>
            <div className="row">
                <div class="input-field col s3">
                    <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                    <label className="adjusted-label" for="first_name">Search Users</label>
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
                                <img onClick={() => {
                                    this.setState({
                                        targetUser: {
                                            areas: []
                                        },
                                        openUserForm: true,
                                    })
                                }} className="icon add-item" src="/images/add-icon.png" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.data.users.map((user, i) => {
                            return <tr>
                                <td><b>{(i + 1)}</b></td>
                                <td>{user.code}</td>
                                <td className="wd-200">{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.areas.map((area) => {
                                    return area.name
                                }).join(',')}</td>
                                <td>{user.date}</td>
                                <td>
                                    {/* <img title="Edit" onClick={() => {
                                        this.setState({
                                            targetUser: user,
                                            openUserForm: true
                                        })
                                    }
                                    } className="icon pointer" src="/images/table-icons/edit-icon.png" /> */}

                                    <img title="Show Salary Details" className="pointer" onClick={() => {
                                        this.setState({
                                            targetUser: user,
                                            openUserForm: true
                                        })
                                    }
                                    } className="icon pointer" src="/images/table-icons/detail-icon.png" />

                                    {/* <Link to={'/accountsdetails/' + user.id}>
                                        <img className="icon" src="/images/details-icon.png" />
                                    </Link> */}
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>


        </section>

    }

}
export default connect((store) => {
    return {
        data: store.userReducer
    }
})(Salary);