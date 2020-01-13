import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentDetails from "../Payment/paymentDetails";
import middleware from "../../store/Middleware/sales";

class SupplierDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      addingPayment: false,
      sales: [],
      sale: {}
    };
  }
  // let payment = 0;

  onPaymentAdded = payment => {
    console.log(payment);
    if (payment) {
      this.state.sale.payments.push(payment);

      this.setState(this.state);
      console.log(this.state);
      this.props.updateSale(this.state.sale);
    }
    this.setState({ addingPayment: false });
  };

  componentDidMount() {
    let startIndex = window.location.search.indexOf("=");
    var id = window.location.search.slice(
      startIndex + 1,
      window.location.search.length
    );
    let result = this.props.data.sales.filter(sale => {
      return id == sale.customer._id;
    });
    // setsales(()=>setTimeout(()=>result,1));

    this.setState({ sales: result });

    console.log(result);
    // console.log(thisales);
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
            payments={this.state.sale.payments}
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
                <th>CUSTOMER</th>
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
              {this.state.sales.map((sale, i) => {
                // console.log("data", props.data.supplierAccounts);
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      this.setState({
                        addingPayment: true,
                        sale: sale
                      });
                    }}
                  >
                    <td>
                      {sale.customer.firstName + " " + sale.customer.lastName}
                    </td>
                    <td className="wd-200">{sale.total}</td>
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
      data: { ...store.dataReducers, ...store.salesReducer }
    };
  },
  dispatch => {
    return {
      updateSale: data => {
        dispatch(middleware.createSale(data));
      }
    };
  }
)(SupplierDetails);

// fetch the supplier array filter the the suppler with paramms id
