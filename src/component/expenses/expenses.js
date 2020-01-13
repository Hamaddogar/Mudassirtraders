import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddExpense from "./addExpenses";

// const User = (this.props) => {
class Expenses extends React.Component {
  state = {
    targetUser: { areas: [] },
    openUserForm: false,
    expenses: [],
    startDate: null,
    endDate: null,
    total: 0
  };

  // let [addingUser, showAddUser] = useState(false);
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.billNumbers);
  };

  render = () => {
    window.$(this.refs.startDatePicker).datepicker({
      onSelect: date => {
        console.log("date", date);
        this.setState({ startDate: date });
      }
    });
    window.$(this.refs.endDatePicker).datepicker({
      onSelect: date => {
        this.setState({ endDate: date ,total:0});
        let startDate = new Date(this.state.startDate);
        let endDate = new Date(this.state.endDate);
        let newResult = this.props.data.expenses.filter(expense => {
          console.log("exp", expense);
          return endDate >= new Date(expense.date) &&
            startDate <= new Date(expense.date)
            ? expense
            : null;
        });

        newResult.forEach(exp => {
          debugger;
          this.state.total += exp.amount;
          console.log(this.state.total);
        });
        this.setState({ expenses: newResult });

      }
    });

    return (
      <section className="app-section">
        {this.state.openUserForm ? (
          <AddExpense
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
          <h4>Expenses</h4>
        </div>
        <div className="row">
          <h6>Select A Date:</h6>
          <div class="input-field col s3">
            <input
              onSelect={this.updateState}
              placeholder="Start Date"
              className="datepicker"
              id="startDate"
              ref="startDatePicker"
              type="text"
              value={this.state.startDate}
            />
          </div>
          <div class="input-field col s3">
            <input
              onChange={this.updateState}
              placeholder="End Date"
              className="datepicker"
              id="endDate"
              ref="endDatePicker"
              type="text"
              value={this.state.endDate}
            />
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>EXPENSE CODE</th>
                <th>AMOUNT</th>
                <th>DATE</th>
                <th className="wd-200">NOTES</th>
                <th>
                  {
                    <img
                      onClick={() => {
                        this.setState({
                          targetUser: {},
                          openUserForm: true
                        });
                      }}
                      className="icon add-item"
                      src="/images/add-icon.png"
                    />
                  }
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.expenses.map((user, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{user.code}</td>
                    <td>{user.amount}</td>
                    <td>{new Date(user.date).toDateString()}</td>
                    <td className="wd-200">{user.notes}</td>
                  </tr>
                );
              })}
              <tr>
                <td>Total</td> <td></td> <td>{this.state.total}</td>
                <td></td>
                <td className="wd-200"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };
}
export default connect(store => {
  return {
    data: store.expensesReducer
  };
})(Expenses);
