import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Addpurchases from './addpurchases';
import middleware from "../../../store/Middleware/purchases";
import AutoComplete from "../../autocompletion/autocompletion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Purchases extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      startDate: null,
      endDate: null,
      purchases: [],
      billNo1: "",
      detailReport: {},
      summeryReport: {}
      // billNo2: "",
      // billNumbers: ""
    };
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
  };
  filterByBill = () => {
    let newpurchases = this.props.data.purchases.filter(purchase => {
      return this.state.purchase.billNo == purchase.billNo;
    });
    this.setState({ purchases: newpurchases });
  };
  monthlyDateSelect = date => {
    let result = this.props.data.purchases.filter(purchase => {
      return (
        new Date(purchase.deliveryDate).getMonth() == new Date(date).getMonth() &&
        new Date(purchase.deliveryDate).getFullYear() == new Date(date).getFullYear()
      );
    });
    console.log(result);
    this.setState({ purchases: result });
  };
  amountPaid = payments => {
    let totalAmountPaid = 0;
    payments.forEach(pay => {
      totalAmountPaid += +pay.amount;
    });
    console.log(totalAmountPaid);
    return totalAmountPaid;
  };
  totalPayAble = () => {
    let totalPay = 0;
    let totalPaid = 0;
    let totalDiscount = 0;
    let totalBillDiscount = 0;
    let totalCost = 0;
    let totalProfit = 0;
    this.props.data.purchases.forEach(purchase => {
      totalPay += +purchase.total;
      totalPaid += +this.amountPaid(purchase.payments);
      totalDiscount += +purchase.discount;
      totalBillDiscount += +purchase.billDiscount;
      totalCost += +this.totalProductCost(purchase.bills);
    });
    return {
      totalPay: totalPay,
      totalPaid: totalPaid,
      totalDiscount: totalDiscount,
      totalBillDiscount,
      totalCost
    };
  };
  totalProductCost = bills => {
    let totalCostPrice = 0;
    bills.forEach(bill => {
      console.log(totalCostPrice);

      totalCostPrice += bill.product.cost ? +bill.product.cost : 0;
      console.log(totalCostPrice);
    });
    console.log(totalCostPrice);
    return totalCostPrice;
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
            ? // startDate.getFullYear() <= new Date(purchase.purchasesDate).getFullYear()
              purchase
            : null;
        });
        this.setState({ purchases: newResult });
        // console.log("star Result", this.state.startDate);
        // console.log("end Result", this.state.endDate);
        // console.log("new Result", newResult);
      }
    });
    return (
      <section className="app-section">
        {/* <Addpurchases visible={addingpurchases} showAddpurchases={showAddpurchases} /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Purchase Report</h4>
        </div>

        <div className="row">
          <div class="input-field col "></div>
        </div>
        <div className="row">
          <div class="input-field col s3 m6">
            <AutoComplete
              property="name"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, summeryReport) => {
                console.log("sals chane", summeryReport);
                summeryReport &&
                  this.updateState({
                    target: {
                      id: "summeryReport",
                      value: summeryReport
                    }
                  });
              }}
              data={[{ name: "Summery Report" }, { name: "Bill Wise" }]}
              placeholder=" Purchases Summary Reports"
            />
          </div>
          <div class="input-field col s3 m6">
            <AutoComplete
              property="name"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, detailReport) => {
                console.log("sals chane", detailReport);
                detailReport &&
                  this.updateState({
                    target: {
                      id: "detailReport",
                      value: detailReport
                    }
                  });
              }}
              data={[{ name: "Monthly Report" }, { name: "Date Range" }]}
              placeholder="Purchases Detailed Reports"
            />
          </div>
          {this.state.detailReport.name == "Monthly Report" ? (
            <div class="input-field col s3 m6">
              <DatePicker
                onSelect={this.monthlyDateSelect}
                selected={this.state.selectedDate}
                onChange={date => this.setState({ selectedDate: date })}
                dateFormat="MM/yyyy"
              />
            </div>
          ) : this.state.detailReport.name == "Date Range" ? (
            <div>
              <h6>Select A Date:</h6>
              <div class="input-field col s3 m6">
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
              <div class="input-field col s3 m6">
                <input
                  onChange={this.updateState}
                  placeholder="End Date"
                  className="datepicker"
                  // views={["year", "month"]}
                  id="endDate"
                  ref="endDatePicker"
                  type="text"
                  value={this.state.endDate}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div>
          {this.state.summeryReport.name == "Summery Report" ? (
            <table>
              <thead>
                <tr>
                  <th>Total Qty</th>
                  <th>Total Cost</th>
                  <th>Item Discount</th>
                  <th>Bill Discount</th>
                  <th>Total Purchase Price</th>
                  <th>Total Payable</th>
                  <th>Profit</th>
                  <th>Total Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Qty</td>
                  <td>{this.totalPayAble().totalCost}</td>

                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>

                  <td>
                    {this.state.purchases.length ? this.totalPayAble().totalPay : 0}
                  </td>

                  <td>
                    {" "}
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalDiscount -
                        this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalCost
                      : 0}
                  </td>
                  <td>
                    {" "}
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPaid
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalPaid -
                        this.totalPayAble().totalBillDiscount -
                        this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : this.state.summeryReport.name == "Bill Wise" ? (
            <table>
              <thead>
                <tr>
                  <th>Bill Number</th>
                  <th>Supplier Name</th>
                  <th>Cost Price</th>
                  <th>Purchase Price</th>
                  <th>Item Discount</th>
                  <th>Bill Discount</th>
                  <th>Total Payable</th>
                  <th>Profit</th>
                  <th>Total Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.purchases.map((purchase, i) => {
                  return (
                    <tr key={i}>
                      <td>{purchase.billNo}</td>
                      <td>
                        {purchase.supplier.firstName + " " + purchase.supplier.lastName}
                      </td>
                      <td>{this.totalProductCost(purchase.bills)}</td>
                      <td>{purchase.total}</td>
                      <td>{purchase.discount}</td>
                      <td>{purchase.billDiscount}</td>
                      <td>{purchase.total - purchase.discount - purchase.billDiscount}</td>

                      <td> {purchase.total - this.totalProductCost(purchase.bills)}</td>
                      <td>{this.amountPaid(purchase.payments)}</td>
                      <td>
                        {" "}
                        {purchase.discount > 0
                          ? purchase.total -
                            this.amountPaid(purchase.payments) -
                            purchase.discount
                          : purchase.total - this.amountPaid(purchase.payments)}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{}</td>
                  <td>Total</td>
                  <td>{this.state.purchases.length ?this.totalPayAble().totalCost:0}</td>
                  <td>
                    {this.state.purchases.length ? this.totalPayAble().totalPay : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalDiscount -
                        this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalCost
                      : 0}
                  </td>
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPaid
                      : 0}
                  </td>{" "}
                  <td>
                    {this.state.purchases.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalPaid -
                        this.totalPayAble().totalBillDiscount -
                        this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : null}
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
    deletepurchase: purchaseId => {
      dispatch(middleware.deletepurchase(purchaseId));
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
      ...store.customerReducer
    }
  };
}, mapDispatchToState)(Purchases);
