import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeletePrompt from "../deleteItem/deleteItem";
import { toast } from "react-toastify";
import "./newsale.css";
import PaymentDetails from "../Payment/paymentDetails";
import middleware from "./../../store/Middleware/sales";
import AutoComplete from "../autocompletion/autocompletion";

import { FormHelperText } from "@material-ui/core";
// import AddSales from './addSales';

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      deliveryDate: new Date(),
      salesDate: null,
      deleteDialog: false,
      total: 0,
      discount: 0,
      customer: { id: 0 },
      payments: [],
      area: {},
      bills: [this.putNewOrder()],
      notoes: ""
    };

    this.defaultAction = this.deleteItem;
  }
  onProductUpdate = (bill, evt, targetProduct) => {
    // let targetProduct = this.props.data.products.find((product) => {
    //     return product._id == evt.target.value
    // });

    bill.product = targetProduct;
    bill.uPrice = targetProduct.customerPrice;
    bill.shopkeeperPrice = targetProduct.shopkeeperPrice;

    this.setState(this.state);
  };

  putNewOrder = () => {
    return {
      product: {
        customerPrice: 0,
        shopkeeperPrice: 0,
        productQty: 0,
        cartonSize: 0,
        productQty: 0
      },
      crtn: 0,
      units: 0,
      fUnit: 0,
      // uPrice: 0,
      // shopkeerPrice: 0,
      total: 0,
      discountPerc: 0,
      unitDisc: 0,
      discountedAmt: 0,
      net: 0,
      deleted: false,
      inProcess: true
      // total: 0
    };
  };

  // let [state, setState] = useState({area:-1});

  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;

    this.setState(this.state);

    console.log(this.state);
    console.log(evt.target.value);
    console.log(this.state.area);
  };

  updateBill = (bill, name, value) => {
    bill[name] = value;
    // let data = JSON.parse(JSON.stringify(this.state));
    this.setState(this.state);
  };

  deleteItem = () => {
    if (this.state.selectedBill) {
      this.state.selectedBill.deleted = true;
      this.state.deleteDialog = false;
      this.setState(this.state);
    }
  };

  restoreItem = () => {
    if (this.state.selectedBill) {
      this.state.selectedBill.deleted = false;
      this.state.deleteDialog = false;
      this.setState(this.state);
    }
  };

  onPaymentAdded = payment => {
    if (payment) {
      this.state.payments.push(payment);
      this.setState(this.state);
    }
  };
  // componentWillUnmount() {
  //   localStorage.clear();
  // }
  componentDidMount = () => {
    // let newState = [];
    let id = localStorage.getItem("_id");
    console.log(this.props.match);
    this.props.data.sales.forEach(sale => {
      // console.log(sale);
      if (sale._id === id) {
        console.log(sale);
        this.setState({
          deliveryDate: sale.deliveryDate,
          salesDate: sale.salesDate,
          total: sale.total,
          discount: sale.discount,
          customer: sale.customer,
          area: sale.area,
          notes: sale.notes
          //   bills: sale.bills
        });
      }
    });
    // console.log(newState);
    window.$(this.refs.salesDatePicker).datepicker({
      onSelect: date => {
        this.setState({ salesDate: date });

        window.$(this.refs.deliveryDatePicker).datepicker({
          minDate: date
        });
      }
    });

    window.$(this.refs.deliveryDatePicker).datepicker({});
  };
  saveSale = () => {
    this.state.billNo = this.props.data.saleCode;
    this.props.saveSale(this.state);
    // console.log(this.putNewOrder())
  };
  render() {
    let activeBills = this.state.bills.filter(bill => {
      return !bill.deleted;
    });

    let totalBill = 0;
    let totalDiscount = 0;
    let totalUnitDiscount = 0;

    if (activeBills.length) {
      activeBills.forEach(bill => {
        bill.total = Math.round(
          bill.crtn *
            (bill.product.cartonSize || 1) *
            (bill.product.shopkeeperPrice || 0) +
            (bill.units || 0) * (bill.product.shopkeeperPrice || 0)
        );
        bill.discountedAmt = Math.round(bill.total * (bill.discountPerc / 100));
        totalBill += +bill.total;
        totalDiscount += +bill.discountedAmt;
        totalUnitDiscount += +bill.unitDisc;
      });
    } else {
      totalBill = +activeBills[0].total;
      totalDiscount = +activeBills[0].discountedAmt;
      totalUnitDiscount = +activeBills[0].unitDisc;
    }

    this.state.total = totalBill;
    this.state.discount = totalDiscount + totalUnitDiscount;

    console.log(this.props.data.areas);

    // let activeBills = this.state.bills.filter(bill => {
    //   return !bill.deleted;
    // });

    let totalPayment = 0;

    this.state.payments.forEach(payment => {
      totalPayment += +payment.amount;
    });

    return (
      <section className="app-section new-sale">
        <PaymentDetails
          onCancel={() => {
            this.setState({
              addingPayment: false
            });
          }}
          payments={this.state.payments}
          customer={this.state.customer.name}
          visible={this.state.addingPayment}
          onPaymentAdded={this.onPaymentAdded}
        />

        <DeletePrompt
          onYes={() => {
            this.defaultAction();
          }}
          onCancel={() => {
            this.setState({
              deleteDialog: false
            });
          }}
          title={this.state.title}
          description={this.state.description}
          visible={this.state.deleteDialog}
        />
        {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>New Sale</h4>
          <h5>
            BILL#: <span>{this.props.data.saleCode}</span>
          </h5>
          <div className="billSummary">
            <div class="row">
              <span className="bill-summary col s6">Total Billed Amount</span>{" "}
              <span className="total-sum col s4">{Math.round(totalBill)}</span>{" "}
            </div>
            <div className="row">
              <div class="input-field col s3">
                <AutoComplete
                  property="name"
                  onChange={(evt, area) => {
                    area &&
                      this.updateState({
                        target: {
                          id: "area",
                          value: area._id
                        }
                      });
                  }}
                  data={this.props.data.areas}
                  placeholder="Select Area"
                />
                {/* {this.state.area !=""?null :  < FormHelperText><p  className="helperTextColor"> Please Add  Area</p></FormHelperText>} */}

                {/* <select onChange={this.updateState} id="area" className="inline">
                        {
                            ([{ name: "Area" }]).concat(this.props.data.areas).map((area) => {
                                return <option value={area._id}>{area.name}</option>
                            })
                        }
                    </select> */}
                {/* <label className="adjusted-label" for="first_name">Search Sales</label> */}
              </div>

              <div class="input-field col s3">
                <AutoComplete
                  property="firstName"
                  onChange={(evt, customer) => {
                    customer &&
                      this.updateState({
                        target: {
                          id: "customer",
                          value: customer._id
                        }
                      });
                  }}
                  data={this.props.data.customers.filter(customer => {
                    return customer.area._id == this.state.area;
                  })}
                  placeholder="Select Customer"
                />
                {/* {this.state.customer.id ===0? < FormHelperText><p  className="helperTextColor"> Please Select Customer </p></FormHelperText>:null}              */}

                {/* <select onChange={this.updateState} id="customer" className="inline">
                        {
                            ([{ firstName: "Customer", lastName: "" }]).concat(this.props.data.customers.filter((customer) => {
                                return customer.area._id == this.state.area;
                            })).map((customer) => {
                                return <option value={customer._id}>{customer.firstName + ' ' + customer.lastName}</option>
                            })
                        }
                    </select> */}
                {/* <label className="adjusted-label" for="first_name">Search Sales</label> */}
              </div>

              {/* <div class="input-field col s3">
                   
                    <input onChange={this.updateState} placeholder="Sales Date" className="datepicker" id="salesDate" ref="salesDatePicker" type="text" />
                    < FormHelperText><p  className="helperTextColor"> Please Select  Date </p></FormHelperText>
                </div> */}
            </div>
            {/* 
            <div className="row">

                <div class="input-field col s3">
                    <input className={!this.state.salesDate ? "disabled" : ""} onChange={this.updateState} placeholder="Delievry Date" id="deliveryDate" type="text" id="deliveryDate" ref="deliveryDatePicker" />
                    < FormHelperText><p  className="helperTextColor"> Please Select  Delievry Date </p></FormHelperText>
                </div>

                <div class="input-field col s3">
                    <textarea onChange={this.updateState} placeholder="Notes" id="notes" class="white materialize-textarea"></textarea>
                    < FormHelperText><p  className="helperTextColor"> Please Select Notes </p></FormHelperText>
                </div>


            </div> */}

            <div>
              <table className="sales-table">
                <thead className="sales-thead">
                  <tr>
                    <th className="auto-width">SR.</th>
                    <th className="wd-50">STOCK</th>
                    <th style={{ width: "255px" }}>PRODUCT</th>
                    <th className="wd-70">CRTN</th>
                    <th className="wd-70">UNITS</th>
                    <th className="wd-70">F.UNIT</th>
                    <th className="wd-70">UNIT PRICE</th>
                    <th className="wd-70">SHOPKEEPER PRICE</th>
                    <th className="wd-70">TOTAL</th>
                    <th>% DISCOUNT</th>
                    <th>Rs.</th>
                    <th>Unit Disc.</th>
                    <th>Net</th>
                    {/* <th>
                  { <img onClick={() => {
                                this.props.history.push('/newsale');
                            }} className="icon add-item" src="/images/add-icon.png" />}
              </th> */}
                  </tr>
                </thead>
                <tbody className="auto-td sales-tbody">
                  {/* product:'',
                        crtn:0,
                        units:0,
                        fUnit:0,
                        uPrice:0,
                        shopkeerPrice:0,
                        total:0,
                        discountPerc:0,
                        unitDisc:0 */}
                  {this.state.bills.map((bill, i) => {
                    //qty = 50
                    //carton size = 12
                    //target 4:2
                    // TBC, if crtns entered avaiable r greater than qty, reset the unit DIscoutn field

                    let cartons = (
                      bill.product.productQty / bill.product.cartonSize
                    )
                      .toString()
                      .split(".")[0];

                    cartons.toString() != "NaN"
                      ? (cartons =
                          cartons +
                          ":" +
                          (bill.product.productQty -
                            bill.product.cartonSize * cartons))
                      : (cartons = ":");

                    return (
                      <tr className={bill.deleted ? "deleted-row" : ""}>
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td
                          className={
                            "wd-50 f-n" +
                            (cartons.toString() == ":" ? " unvisible" : "")
                          }
                        >
                          {" "}
                          <span className="stock-indicator">{cartons}</span>
                        </td>

                        <td>
                          <AutoComplete
                            property="name"
                            onChange={(evt, product) => {
                              product &&
                                this.onProductUpdate(bill, evt, product);
                            }}
                            data={this.props.data.products.filter(product => {
                              return (
                                this.state.bills.filter(iBill => {
                                  return (
                                    bill != iBill &&
                                    iBill.product.id == product.id
                                  );
                                }).length == 0
                              );
                            })}
                            placeholder="Select Product"
                          />
                        </td>

                        <td>
                          {
                            <input
                              placeholder="crtn"
                              onChange={evt => {
                                //Check if cartons are greater than the avaiable in stock
                                let cartons = +(
                                  bill.product.productQty /
                                  bill.product.cartonSize
                                )
                                  .toString()
                                  .split(".")[0];

                                if (+evt.target.value > cartons) {
                                  bill.unitDisc = 0;
                                  this.updateBill(bill, evt.target.id, cartons);
                                } else {
                                  this.updateBill(
                                    bill,
                                    evt.target.id,
                                    evt.target.value
                                  );
                                }

                                //this.updateBill(bill, evt.target.id, evt.target.value)
                              }}
                              className="input-60"
                              type="number"
                              id="crtn"
                              value={bill.crtn}
                            />
                          }
                        </td>

                        <td>
                          {
                            <input
                              placeholder="Units"
                              onChange={evt => {
                                let cartons = +(
                                  bill.product.productQty /
                                  bill.product.cartonSize
                                )
                                  .toString()
                                  .split(".")[0];

                                let totalQty = bill.product.productQty;

                                let stockDemanded =
                                  bill.crtn * bill.product.cartonSize +
                                  +evt.target.value;

                                if (stockDemanded > bill.product.productQty) {
                                  let unitsAvailable =
                                    bill.product.productQty - stockDemanded;

                                  if (unitsAvailable > 0) {
                                    this.updateBill(
                                      bill,
                                      evt.target.id,
                                      evt.target.value
                                    );
                                  } else {
                                    let issueAvaiableStock =
                                      evt.target.value -
                                      (stockDemanded - bill.product.productQty);
                                    bill.unitDisc = 0;
                                    this.updateBill(
                                      bill,
                                      evt.target.id,
                                      issueAvaiableStock
                                    );
                                  }
                                } else {
                                  this.updateBill(
                                    bill,
                                    evt.target.id,
                                    evt.target.value
                                  );
                                }
                              }}
                              className="input-60"
                              type="number"
                              id="units"
                              value={bill.units}
                            />
                          }
                        </td>

                        <td>
                          {
                            <input
                              placeholder="Funits"
                              className="input-60"
                              type="number"
                              value={bill.fUnit}
                            />
                          }
                        </td>

                        {/* Will be updated on selecting product */}
                        <td>
                          <input
                            placeholder="UPrice"
                            className="input-60"
                            disabled
                            type="number"
                            value={bill.product.customerPrice}
                          />
                        </td>

                        {/* Will be updated on selecting product */}
                        <td>
                          <input
                            className="input-60"
                            disabled
                            type="text"
                            readonly
                            value={bill.product.shopkeeperPrice}
                          />
                        </td>

                        {/* Will be updated on selecting product */}
                        <td>
                          <input
                            className="input-80"
                            disabled
                            type="text"
                            readonly
                            value={(bill => {
                              return bill.total;
                            })(bill)}
                          />
                        </td>

                        {/* Will be updated on selecting product */}
                        <td>
                          {
                            <input
                              onInput={evt => {
                                this.updateBill(
                                  bill,
                                  evt.target.id,
                                  evt.target.value
                                );
                              }}
                              className="input-60"
                              id="discountPerc"
                              type="number"
                              value={bill.discountPerc}
                            />
                          }
                        </td>
                        <td>
                          {
                            <input
                              disabled
                              className="input-80"
                              type="number"
                              value={(bill => {
                                return bill.discountedAmt;
                              })(bill)}
                            />
                          }
                        </td>
                        {/* <td>{"discounted amount here"}</td> */}

                        {/* Will be updated on selecting product */}
                        <td>
                          <input
                            id="unitDisc"
                            onInput={evt => {
                              this.updateBill(
                                bill,
                                evt.target.id,
                                evt.target.value
                              );
                            }}
                            className="input-80"
                            onKeyDown={evt => {
                              if (evt.key == "Enter") {
                                if (!bill.product._id) {
                                  toast.error("PLEASE SELECT A PRODUCT");
                                  return;
                                }

                                let previousOrder = this.state.bills[
                                  this.state.bills.length - 1
                                ];
                                previousOrder.inProcess = false;

                                this.state.bills.push(this.putNewOrder());

                                this.setState(this.state);
                              }
                            }}
                            type="number"
                            value={bill.unitDisc}
                          />
                        </td>
                        <td>
                          <input
                            className="input-80"
                            type="number"
                            disabled
                            value={
                              bill.total - bill.discountedAmt - bill.unitDisc
                            }
                          />
                        </td>
                        <td>
                          {bill.inProcess ? (
                            <i
                              class="material-icons dp48 green pointer"
                              onClick={() => {
                                let tBill = this.state.bills[
                                  this.state.bills.length - 1
                                ];
                                tBill &&
                                  (this.state.bills[
                                    this.state.bills.length - 1
                                  ] = this.putNewOrder());

                                this.setState(this.state.bills);
                              }}
                            >
                              done_all
                            </i>
                          ) : (
                            <i
                              class="material-icons dp48 pink pointer"
                              onClick={() => {
                                if (bill.deleted) {
                                  this.defaultAction = this.restoreItem;

                                  this.setState({
                                    description:
                                      "Are you sure, you want to restore this item?",
                                    title: "Restore Item",
                                    selectedBill: bill,
                                    deleteDialog: true
                                  });
                                } else {
                                  this.defaultAction = this.deleteItem;

                                  this.setState({
                                    description:
                                      "Are you sure, you want to delete this item?",
                                    title: "Delete Current Item",
                                    selectedBill: bill,
                                    deleteDialog: true
                                  });
                                }
                              }}
                            >
                              {" "}
                              {bill.deleted ? "refresh" : "delete_forever"}
                            </i>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(
  store => {
    console.log("store", store);

    return {
      data: {
        ...store.salesReducer,
        ...store.areaReducers,
        ...store.customerReducer,
        ...store.productReducers
      }
    };
  },
  dispatch => {
    return {
      saveSale: data => {
        dispatch(middleware.createSale(data));
      }
    };
  }
)(Sales);
