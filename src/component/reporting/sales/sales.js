import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import AddSales from './addSales';
import middleware from "../../../store/Middleware/sales";
import AutoComplete from "../../autocompletion/autocompletion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      startDate: null,
      endDate: null,
      sales: [],
      billNo1: "",
      detailReport: {},
      summeryReport: {}
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
      return this.state.sale.billNo == sale.billNo;
    });
    this.setState({ sales: newSales });
  };
  monthlyDateSelect = date => {
    let result = this.props.data.sales.filter(sale => {
      return (
        new Date(sale.salesDate).getMonth() == new Date(date).getMonth() &&
        new Date(sale.salesDate).getFullYear() == new Date(date).getFullYear()
      );
    });
    console.log(result);
    this.setState({ sales: result });
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
    this.props.data.sales.forEach(sale => {
      totalPay += +sale.total;
      totalPaid += +this.amountPaid(sale.payments);
      totalDiscount += +sale.discount;
      totalBillDiscount += +sale.billDiscount;
      totalCost += +this.totalProductCost(sale.bills);
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
        let newResult = this.props.data.sales.filter(sale => {
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
        {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Sale Report</h4>
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
              placeholder=" Sales Summary Reports"
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
              placeholder="Sales Detailed Reports"
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
                  <th>Total Sale Price</th>
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
                    {this.state.sales.length
                      ? this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>

                  <td>
                    {this.state.sales.length ? this.totalPayAble().totalPay : 0}
                  </td>

                  <td>
                    {" "}
                    {this.state.sales.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalDiscount -
                        this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalCost
                      : 0}
                  </td>
                  <td>
                    {" "}
                    {this.state.sales.length
                      ? this.totalPayAble().totalPaid
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
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
                  <th>Customer Name</th>
                  <th>Cost Price</th>
                  <th>Sale Price</th>
                  <th>Item Discount</th>
                  <th>Bill Discount</th>
                  <th>Total Payable</th>
                  <th>Profit</th>
                  <th>Total Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sales.map((sale, i) => {
                  return (
                    <tr key={i}>
                      <td>{sale.billNo}</td>
                      <td>
                        {sale.customer.firstName + " " + sale.customer.lastName}
                      </td>
                      <td>{this.totalProductCost(sale.bills)}</td>
                      <td>{sale.total}</td>
                      <td>{sale.discount}</td>
                      <td>{sale.billDiscount}</td>
                      <td>{sale.total - sale.discount - sale.billDiscount}</td>

                      <td> {sale.total - this.totalProductCost(sale.bills)}</td>
                      <td>{this.amountPaid(sale.payments)}</td>
                      <td>
                        {" "}
                        {sale.discount > 0
                          ? sale.total -
                            this.amountPaid(sale.payments) -
                            sale.discount
                          : sale.total - this.amountPaid(sale.payments)}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{}</td>
                  <td>Total</td>
                  <td>{this.totalPayAble().totalCost}</td>
                  <td>
                    {this.state.sales.length ? this.totalPayAble().totalPay : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalDiscount -
                        this.totalPayAble().totalBillDiscount
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalPay -
                        this.totalPayAble().totalCost
                      : 0}
                  </td>
                  <td>
                    {this.state.sales.length
                      ? this.totalPayAble().totalPaid
                      : 0}
                  </td>{" "}
                  <td>
                    {this.state.sales.length
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
