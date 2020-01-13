import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddSales from './newSale';
import AutoComplete from "../../autocompletion/autocompletion";
import { render } from "react-dom";
class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      salesDate: null,
      sales: []
    };

    this.defaultAction = this.deleteItem;
  }
  // let getEditData = (data) => {
  // localStorage.setItem('_id',data._id)

  // };
  // componentDidMount() {
  //   this.setState({ sales: this.props.data.sales });
  // }
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
  };
  render() {
    window.$(this.refs.salesDatePicker).datepicker({
      onSelect: date => {
        debugger;
        let newDate = new Date(date);
        console.log("Date picking", newDate);
        this.setState({ salesDate: date });
        let newResult = this.props.data.sales.filter(sale => {
          console.log("slae", new Date(sale.salesDate));
          return new Date(sale.salesDate) == newDate ? sale : null;
        });
        console.log("After Date picking", newResult);
        this.setState({ sales: newResult });
      }
    });

    return (
      <section className="app-section">
        {/* <AddSales /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Recovery Bills</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              onChange={this.updateState}
              placeholder="Sales Date"
              className="datepicker"
              id="salesDate"
              ref="salesDatePicker"
              type="text"
            />
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>BILLS</th>
                <th className="wd-200">CUSTOMER</th>
                <th>SALES DATE</th>
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
                    <td>{new Date(sale.salesDate).toDateString()}</td>
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
