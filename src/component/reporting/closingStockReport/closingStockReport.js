import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddSales from './newSale';
import AutoComplete from "../../autocompletion/autocompletion";
import { connect } from "react-redux";
class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      sales: [],
      name: "",
      customer: ""
    };
  }
  updateState = evt => {
    // this.setState({});
    // console.log(this.props.data.sales);

    this.setState({ [evt.target.id]: evt.target.value });
    if (evt.target.id === "customer") {
      debugger;
      setTimeout(() => {
        this.autoCompleteChange();
      }, 1);
    }
  };
  filterByString = () => {
    // this.setState({});

    if (this.state.name != "") {
      let newArray = this.props.data.sales.filter(sale => {
        console.log(sale);
        return sale.area.name
          .toLowerCase()
          .indexOf(this.state.name.toLowerCase()) != -1
          ? sale
          : console.log("no fo");
      });
      this.setState({ sales: newArray });
    }
  };
  autoCompleteChange = () => {
    console.log(this.state);
    debugger;
    let autonewArray = this.props.data.sales.filter(sale => {
      console.log(sale);
      return sale.customer.firstName == this.state.customer ? sale : null;
    });
    this.setState({ sales: autonewArray });
  };
  render() {
    window.$(this.refs.startDatePicker).datepicker({
      onSelect: date => {
        console.log("date", date);
        this.setState({ startDate: date });
      }
    });
    window.$(this.refs.endDatePicker).datepicker({
      onSelect: date => {
        debugger;
        this.setState({ endDate: date });
        let startDate = new Date(this.state.startDate);
        let endDate = new Date(this.state.endDate);
        let newResult = this.props.data.sales.filter(sale => {
          console.log(
            "sale year",
            typeof new Date(sale.salesDate).toDateString()
          );
          console.log("end year", endDate);
          console.log("start year", startDate);
          return endDate >= new Date(sale.salesDate) &&
            startDate <= new Date(sale.salesDate)
            ? // startDate.getFullYear() <= new Date(sale.salesDate).getFullYear()
              sale
            : null;
        });
        this.setState({ sales: newResult });
        // console.log("star Result", this.state.startDate);
        // console.log("end Result", this.state.endDate);
        // console.log("new Result", newResult);
      }
    });

    return (
      <section className="app-section">
        {/* <AddSales /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Customers Report</h4>
        </div>
        <h6>Select A Date:</h6>

        <div className="row">
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
        <div className="row">
          <div class="input-field col s3">
            <AutoComplete
              property="firstName"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, customer) => {
                console.log("sals chane", customer);
                customer &&
                  this.updateState({
                    target: {
                      id: "customer",
                      value: customer.firstName
                    }
                  });
              }}
              onInputChange={this.autoCompleteChange}
              data={this.props.data.customers}
              placeholder="select customer"
            />
          </div>
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
    data: { ...store.salesReducer, ...store.customerReducer }
  };
})(Sales);
