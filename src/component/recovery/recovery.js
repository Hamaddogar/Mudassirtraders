import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import AddSales from './newSale';
import AutoComplete from "../autocompletion/autocompletion";
import PaymentDetails from "../Payment/paymentDetails";
import middleware from "./../../store/Middleware/sales";

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      sales: [],
      firstName: "",
      billNo: 0,
      addingPayment: false,
      sale: {}
    };
  }
  updateState = evt => {
    debugger;
    this.setState(() =>
      setTimeout(() => {
        return { sales: [], firstName: "", billNo: 0 };
      }, 1)
    );

    console.log(this.state);
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.customer);
    let newArray = this.props.data.sales.filter(sale => {
      console.log(sale);
      return sale.customer.firstName == this.state.firstName ||
        sale.billNo == this.state.billNo
        ? sale
        : null;
    });
    console.log(newArray);

    this.setState({ sales: newArray });
  };

  filterByString = () => {
    console.log("working");
    let newArray = this.props.data.sales.filter(sale => {
      console.log(sale);
      return sale.area.name == this.state.name ? sale : null;
    });
    console.log(newArray);
    this.setState({ sales: newArray });
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
    this.props.data.sales.forEach(sale => {
      totalPay += +sale.total;
      totalPaid += +this.amountPaid(sale.payments);
      totalDiscount += +sale.discount;
    });
    return {
      totalPay: totalPay,
      totalPaid: totalPaid,
      totalDiscount: totalDiscount
    };
  };
  onPaymentAdded = payment => {
    console.log(payment);
    if (payment) {
      this.state.sale.payments.push(payment);

      this.setState(this.state);
      console.log(this.state);
      this.props.updateSale(this.state.sale);
    }
  };
  addPayment = sale => {};
  render() {
    return (
      <section className="app-section">
        {/* <AddSales /> */}
        {this.state.addingPayment ? (
          <PaymentDetails
            onCancel={() => {
              this.setState({
                addingPayment: false
              });
            }}
            payments={this.state.sale.payments}
            customer={this.state.firstName}
            visible={this.state.addingPayment}
            onPaymentAdded={this.onPaymentAdded}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Products Report</h4>
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
                      id: "firstName",
                      value: customer.firstName
                    }
                  });
              }}
              data={this.props.data.customers}
              placeholder="select customer"
            />
          </div>
          {/* <div class="input-field col s3">
            <button
              class="btn waves-effect waves-light"
              name="action"
              onClick={this.filterByString}
            >
              view
            </button>
          </div> */}
          <div class="input-field col s3">
            <AutoComplete
              property="billNo"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, sale) => {
                console.log("sals chane", sale);
                sale &&
                  this.updateState({
                    target: {
                      id: "billNo",
                      value: sale.billNo
                    }
                  });
              }}
              data={this.props.data.sales}
              placeholder="select Bill No"
            />
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>Bill Number</th>
                <th>Customer</th>
                <th className="wd-200">Sale Date</th>
                <th>Total Payable</th>
                <th>Discount</th>
                <th>Amount Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map((sale, i) => {
                return (
                  <tr
                    key={i}
                    onClick={
                      () =>
                        this.setState({
                          sale: sale,
                          addingPayment: true
                        })
                      // console.log(sale)
                    }
                  >
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{sale.billNo}</td>
                    <td className="wd-200">
                      {sale.customer.firstName + " " + sale.customer.lastName}
                    </td>
                    <td>{new Date(sale.salesDate).toDateString()}</td>
                    <td>{sale.total}</td>
                    <td>{sale.discount}</td>
                    <td>{this.amountPaid(sale.payments)}</td>
                    <td>
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
                <td></td>
                <td></td>
                <td></td>
              
                <td>Total</td>
                <td>
                  {this.state.sales.length ? this.totalPayAble().totalPay : 0}
                </td>
                <td>
                  {this.state.sales.length
                    ? this.totalPayAble().totalDiscount
                    : 0}
                </td>
                <td>
                  {this.state.sales.length ? this.totalPayAble().totalPaid : 0}
                </td>{" "}
                <td>
                  {this.state.sales.length
                    ? this.totalPayAble().totalPay -
                      this.totalPayAble().totalPaid -
                      this.totalPayAble().totalDiscount
                    : 0}
                </td>
              
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default connect(
  store => {
    return {
      data: { ...store.salesReducer, ...store.customerReducer }
    };
  },
  dispatch => {
    return {
      updateSale: data => {
        dispatch(middleware.createSale(data));
      }
    };
  }
)(Sales);
