import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import AddSales from './newSale';
import AutoComplete from "../../autocompletion/autocompletion";
class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      sales: [],
      name: ""
    };
  }
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.billNumbers);
  };

  filterByString = () => {
    console.log("working");
    let newArray = this.props.data.sales.filter(sale => {
      console.log(sale);
      return sale.area.name.toLowerCase().indexOf(this.state.name.toLowerCase()) !=-1 ? sale : console.log('no fo');
    });
    this.setState({ sales: newArray });
  };
  render() {
    return (
      <section className="app-section">
        {/* <AddSales /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Suppliers Report</h4>
        </div>

        <div className="row">
          <div class="input-field col s3">
            <input
              id="name"
              type="text"
              class="validate"
              onChange={this.updateState}
              onKeyUp={this.filterByString}
            />
            <label className="adjusted-label" for="first_name">
              Enter area
            </label>
          </div>
          <div class="input-field col s3">
            {/* <button
              class="btn waves-effect waves-light"
              name="action"
              onKeyUp={this.filterByString}
            >
              view
            </button> */}
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Bill Number</th>
                <th>Customer</th>
                <th className="wd-200">Sale Date</th>
                <th>TOTAL</th>
                <th>Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map((sale, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{sale.billNo}</td>
                    <td className="wd-200">
                      {sale.customer.firstName + " " + sale.customer.lastName}
                    </td>
                    <td>{sale.total}</td>
                    <td>{new Date(sale.salesDate).toDateString()}</td>
                    <td>{sale.discount}</td>
                    <td>{sale.total - sale.discount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default connect(store => {
  return {
    data: store.salesReducer
  };
})(Sales);
