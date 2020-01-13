import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Addpurchases from './addpurchases';
import middleware from "./../../store/Middleware/purchases";
import AutoComplete from "../autocompletion/autocompletion";
class Purchases extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      purchases: [],
      billNo: "",
      area: {},
      supplier: {}
      // billNo2: "",
      // billNumbers: ""
    };
  }
  componentDidMount() {
    console.log("puchase", this.props.data);
  }
  changeStatusMethod = purchase => {
    purchase.status == "deliverd"
      ? (purchase.status = "pending")
      : (purchase.status = "deliverd");
    this.props.statusChange(purchase);
    console.log(purchase);
  };
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.billNumbers);
    if (evt.target.id == "billNo") {
      let newResult = this.props.data.purchases.filter(purchase => {
        return this.state.billNo == purchase.billNo;
      });
      console.log(newResult);

      this.setState(() => {
        return { purchases: newResult };
      });
      console.log(this.state.purchases);
    } else if (evt.target.id == "supplier") {
      let newResult = this.props.data.purchases.filter(purchase => {
        return this.state.supplier.firstName == purchase.supplier.firstName;
      });
      console.log(newResult);

      this.setState(() => {
        return { purchases: newResult };
      });
      console.log(this.state.purchases);
    }
  };
  filterByBill = () => {
    let newpurchases = this.props.data.purchases.filter(purchase => {
      return this.state.purchase.billNo == purchase.billNo;
    });
    this.setState({ purchases: newpurchases });
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
        let newResult = this.props.data.purchases.filter(purchase => {
          return endDate >= new Date(purchase.deliveryDate) &&
            startDate <= new Date(purchase.deliveryDate)
        });
        this.setState({ purchases: newResult });
     
      }
    });
    return (
      <section className="app-section">
        {/* <Addpurchases visible={addingpurchases} showAddpurchases={showAddpurchases} /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Purchase Orders</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <AutoComplete
              property="billNo"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, purchase) => {
                purchase &&
                  this.updateState({
                    target: {
                      id: "billNo",
                      value: purchase.billNo
                    }
                  });
              }}
              data={this.props.data.purchases}
              placeholder="Bills No"
            />
          </div>
          <div class="input-field col s3">
            <AutoComplete
              property="firstName"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, supplier) => {
                console.log("sals chane", supplier);
                supplier &&
                  this.updateState({
                    target: {
                      id: "supplier",
                      value: supplier
                    }
                  });
              }}
              data={this.props.data.suppliers}
              placeholder="Select supplier"
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
                <th>SALE DATE</th>
                <th>DELIVERY</th>
                <th>TIME</th>
                <th>STATUS</th>
                <th>
                  <img
                    // onClick={() => {
                    //   props.history.push("/newpurchase");
                    // }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  <img
                    // onClick={() => {
                    //   props.history.push("/newpurchase");
                    // }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  {
                    <Link to="/newpurchase">
                      <img
                        // onClick={() => {
                        //   props.history.push("/newpurchase");
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
              {this.state.purchases.map((purchase, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{purchase.billNo}</td>
                    <td>
                      {purchase.supplier.firstName +
                        " " +
                        purchase.supplier.lastName}
                    </td>
                    <td>{purchase.total}</td>
                    <td>{purchase.discount}</td>
                    <td>{purchase.total - purchase.discount}</td>
                    <td>{new Date(purchase.purchasesDate).toDateString()}</td>
                    <td>{new Date(purchase.deliveryDate).toDateString()}</td>
                    <td>{new Date().toDateString()}</td>
                    <td className="wd-200">
                      <img
                        title={
                          purchase.status == "pending" ? "pending" : "deliverd"
                        }
                        onClick={() => {
                          this.changeStatusMethod(purchase);
                        }}
                        alt="ststusimg"
                        className="icon pointer"
                        src={
                          purchase.status == "deliverd"
                            ? "/images/table-icons/activated.png"
                            : "/images/table-icons/pending-icon.jpg"
                        }
                      />
                      <Link to={"/newpurchase/?id=" + purchase._id}>
                        <img
                          title="Edit"
                          className="icon pointer"
                          src="/images/table-icons/edit-icon.png"
                        />
                      </Link>
                      <img
                        title="Edit"
                        onClick={() => this.props.deletePurchase(purchase._id)}
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
    deletePurchase: purchaseId => {
      dispatch(middleware.deletePurchase(purchaseId));
    },
    statusChange: purchase => {
      dispatch(middleware.statusChange(purchase));
    }
  };
};

export default connect(store => {
  return {
    data: {
      ...store.purchaseReducer,
      ...store.areaReducers,
      ...store.supplierReducer
    }
  };
}, mapDispatchToState)(Purchases);
