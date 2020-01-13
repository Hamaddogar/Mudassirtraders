import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import AddSales from './addSales';
import middleware from "./../../store/Middleware/sales";
import AutoComplete from "../autocompletion/autocompletion";
class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      sales: [],
      billNo1: "",
      area: {},
      customer: {}
      // billNo2: "",
      // billNumbers: ""
    };
  }
  changeStatusMethod = sale => {
    sale.status == "deliverd"
      ? (sale.status = "pending")
      : (sale.status = "deliverd");
    this.props.statusChange(sale);
    console.log(sale);
  };
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.billNumbers);
  };
  filterByBill = () => {
    let newSales = this.props.data.sales.filter(sale => {
    return this.state.sale.billNo ==sale.billNo
    });
    this.setState({ sales: newSales });
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
          return this.state.sale.billNo == sale.billNo &&
            this.state.area.name == sale.area.name &&
            this.state.customer.firstName == sale.customer.firstName &&
            endDate >= new Date(sale.salesDate) &&
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
        {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Sale Orders</h4>
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
                      id: "sale",
                      value: sale
                    }
                  });
              }}
              data={this.props.data.sales}
              placeholder="Bills No"
            />
          </div>
          <div class="input-field col s3">
            <AutoComplete
              property="name"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, area) => {
                console.log("sals chane", area);
                area &&
                  this.updateState({
                    target: {
                      id: "area",
                      value: area
                    }
                  });
              }}
              data={this.props.data.areas}
              placeholder="Select Area"
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
                      value: customer
                    }
                  });
              }}
              data={this.props.data.customers}
              placeholder="Select Customer"
            />
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
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>BIL#</th>
                <th>CUSTOMER</th>
                <th>TOTAL</th>
                <th>DISCOUNT</th>
                <th>NET BILL</th>
                <th>SALES DATE</th>
                <th>DELIVERY</th>
                <th>TIME</th>
                <th>Status</th>
                <th>
                  <img
                    // onClick={() => {
                    //   props.history.push("/newsale");
                    // }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  <img
                    // onClick={() => {
                    //   props.history.push("/newsale");
                    // }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  {
                    <Link to="/newsale">
                      <img
                        // onClick={() => {
                        //   props.history.push("/newsale");
                        // }}
                        className="icon add-item"
                        src="/images/add-icon.png"
                      />
                    </Link>
                  }
                </th>
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
                    <td>
                      {sale.customer.firstName + " " + sale.customer.lastName}
                    </td>
                    <td>{sale.total}</td>
                    <td>{sale.discount}</td>
                    <td>{sale.total - sale.discount}</td>
                    <td>{new Date(sale.salesDate).toDateString()}</td>
                    <td>{new Date(sale.deliveryDate).toDateString()}</td>
                    <td>{new Date().toDateString()}</td>
                    <td className="wd-200">
                      <img
                        title={
                          sale.status == "pending" ? "pending" : "deliverd"
                        }
                        onClick={() => {
                          this.changeStatusMethod(sale);
                        }}
                        alt="ststusimg"
                        className="icon pointer"
                        src={
                          sale.status == "deliverd"
                            ? "/images/table-icons/activated.png"
                            : "/images/table-icons/pending-icon.jpg"
                        }
                      />
                      <Link to={"/newsale/?id=" + sale._id}>
                        <img
                          title="Edit"
                          className="icon pointer"
                          src="/images/table-icons/edit-icon.png"
                        />
                      </Link>
                      <img
                        title="Edit"
                        onClick={() => this.props.deleteSale(sale._id)}
                        className="icon pointer"
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
  }
}
const mapDispatchToState = dispatch => {
  return {
    toggleState: data => {
      dispatch(middleware.toggleState(data));
    },
    deleteSale: saleId => {
      dispatch(middleware.deleteSale(saleId));
    },
    statusChange: sale => {
      dispatch(middleware.statusChange(sale));
    }
  };
};

export default connect(store => {
  return {
    data: {
      ...store.salesReducer,
      ...store.areaReducers,
      ...store.customerReducer
    }
  };
}, mapDispatchToState)(Sales);
