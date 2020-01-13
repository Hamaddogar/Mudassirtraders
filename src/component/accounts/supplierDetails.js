import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentDetails from "../Payment/paymentDetails";
import middleware from "./../../store/Middleware/purchases";

class SupplierDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      addingPayment: false,
      purchases: [],
      purchase: {}
    };
  }
  // let payment = 0;

  onPaymentAdded = payment => {
    console.log(payment);
    if (payment) {
      this.state.purchase.payments.push(payment);

      this.setState(this.state);
      console.log(this.state);
      this.props.updatePurchase(this.state.purchase);
    }
    this.setState({ addingPayment: false });
  };

  componentDidMount() {
    let startIndex = window.location.search.indexOf("=");
    var id = window.location.search.slice(
      startIndex + 1,
      window.location.search.length
    );
    let result = this.props.data.purchases.filter(purchase => {
      return id == purchase.supplier._id;
    });
    // setPurchases(()=>setTimeout(()=>result,1));

    this.setState({ purchases: result });

    console.log(result);
    // console.log(thipurchases);
  }

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
    this.props.data.purchases.forEach(purchase => {
      totalPay += +purchase.total;
      totalPaid += +this.amountPaid(purchase.payments);
      totalDiscount += +purchase.discount;
    });
    return {
      totalPay: totalPay,
      totalPaid: totalPaid,
      totalDiscount: totalDiscount
    };
  };
  render() {
    return (
      <section className="app-section">
        {this.state.addingPayment ? (
          <PaymentDetails
            onCancel={() => {
              this.setState({
                addingPayment: false
              });
            }}
            payments={this.state.purchase.payments}
            customer={this.state.firstName}
            visible={this.state.addingPayment}
            onPaymentAdded={this.onPaymentAdded}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Account Details</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            {/* <input placeholder="Placeholder" id="supplierSearch" type="text" class="validate" />
                <label className="adjusted-label" for="supplierSearch">Search Payment</label> */}
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SUPPLIER</th>
                <th className="wd-200">TOTAL PAYABLE</th>
                <th>DISCOUNT</th>

                <th className="wd-200">AMOUNT PAID</th>

                <th className="wd-200">BALANCE</th>
                <th className="wd-200"></th>
                <th>
                  {/* <img
                    // onClick={() => {
                    //   toggleMenu(true);
                    // }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  /> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.purchases.map((purchase, i) => {
                // console.log("data", props.data.supplierAccounts);
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      this.setState({
                        addingPayment: true,
                        purchase: purchase
                      });
                    }}
                  >
                    <td>
                      {purchase.supplier.firstName +
                        " " +
                        purchase.supplier.lastName}
                    </td>

                    <td className="wd-200">{purchase.total}</td>
                    <td>{purchase.discount}</td>
                    <td>{this.amountPaid(purchase.payments)}</td>
                    <td>
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
              
                <td>Total</td>
                <td>
                  {this.state.purchases.length
                    ? this.totalPayAble().totalPay
                    : 0}
                </td>
                <td>
                  {this.state.purchases.length
                    ? this.totalPayAble().totalDiscount
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
      data: { ...store.dataReducers, ...store.purchaseReducer }
    };
  },
  dispatch => {
    return {
      updatePurchase: data => {
        dispatch(middleware.createPurchase(data));
      }
    };
  }
)(SupplierDetails);

// fetch the supplier array filter the the suppler with paramms id
