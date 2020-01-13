import { connect } from "react-redux";
import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import AddSales from './newSale';
import AutoComplete from "../../autocompletion/autocompletion";
 import    CheckPrint  from './checkprintData'
 import ReactToPrint from 'react-to-print';

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      sales: [],
      billNo1: "",
      billNo2: "",
      billNumbers: ""
    };
  }
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.billNumbers);
  };
  filterByBill = () => {
    let newSales = this.props.data.sales.filter(sale => {
      if (this.state.billNo1 <= this.state.billNo2) {
        return this.state.billNo2 >= sale.billNo &&
          this.state.billNo1 <= sale.billNo
          ? sale
          : null;
      } else {
        // toast('you put wrong values')
      }
    });
    this.setState({ sales: newSales });
  };
  filterByString = () => {
    var newArray = [];
    if (this.state.billNumbers) {
      var string = this.state.billNumbers.split(",");
    }
    this.props.data.sales.forEach(sale => {
      string.forEach(str => {
        return sale.billNo == parseInt(str) ? newArray.push(sale) : null;
      });
    });
    console.log("final array", newArray);
    this.setState({ sales: newArray });
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
          <h4>Select Bills</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <AutoComplete
              property="billNo"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, sale) => {
                console.log("sals chane", sale);
                sale &&
                  this.updateState({
                    target: {
                      id: "billNo1",
                      value: sale.billNo
                    }
                  });
              }}
              data={this.props.data.sales.sort(function(a, b) {
                return a - b;
              })}
              placeholder="Bills From"
            />
          </div>

          <div class="input-field col s3">
            <AutoComplete
              property="billNo"
              onChange={(evt, sale) => {
                sale &&
                  this.updateState({
                    target: {
                      id: "billNo2",
                      value: sale.billNo
                    }
                  });
              }}
              data={this.props.data.sales.sort(function(a, b) {
                return a - b;
              })}
              placeholder="Bills To"
            />
          </div>
          <div class="input-field col s3">
            <button
              class="btn waves-effect waves-light"
              name="action"
              onClick={this.filterByBill}
            >
              view
            </button>
          </div>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              id="billNumbers"
              type="text"
              class="validate"
              onChange={this.updateState}
            />
            <label className="adjusted-label" for="first_name">
              Enter Bill Numbers
            </label>
          </div>
          <div class="input-field col s3">
            <button
              class="btn waves-effect waves-light"
              name="action"
              onClick={this.filterByString}
            >
              view
            </button>
            
          </div>
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
          <div>
              <ReactToPrint
                trigger={() => <button   >print</button>}
                content={() => this.componentRef}
              /> 
            <div style={{ display: "none" }}> <CheckPrint  ref={el => (this.componentRef = el)} /></div>
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
