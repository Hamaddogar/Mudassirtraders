import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "./addCustomer";
import Pagination from "react-js-pagination";
import customerMiddleWare from "../../store/Middleware/customers";
import Papa from "papaparse";
import utlities from "../../utlities";
import "./addCustomer.css";
import UploadModel from "../upload/uploadModel";

// const Customer = (props)=>{

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      openCustomerForm: false,
      file: "",
      openUploadModel: false,
      data: []
    };
  }
  // componentDidMount() {
  //   this.setState({ code: this.props.data.customers.length });
  // }
  // onChangefile = e => {
  //   console.log(this.state.code);

  //   let self = this;
  //   this.setState({ file: e.target.files[0] }, () => {
  //     console.log(this.state.file);
  //     Papa.parse(this.state.file, {
  //       header: true,
  //       complete: function(results) {
  //         //   console.log(results);
  //         results.data.forEach((item, i) => {
  //           console.log(item);
  //           item.code = utlities.getID(
  //             "CUST",
  //             "code",
  //             self.props.data.customers
  //           );
  //           self.props.createCustomer(item);
  //         });
  //       }
  //     });
  //   });
  // };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  deleteCustomer = customerId => {
    this.props.delCustomer(customerId);
  };
  toggleStatus = customer => {
    debugger;
    customer.status = !customer.status;
    console.log(customer.status);
    this.props.createCustomer(customer);
  };
  getData = data => {
    console.log(data);

    let self = this;

    data.forEach((element, index) => {
      let newIndex = utlities.getID("CUST", "code", self.props.data.customers);
      element.code = newIndex.split("_")[1] + (index + 1);

      self.props.createCustomer(element);

      // alert("Plaese Insert Require Data!");
    });

    self.setState({ openUploadModel: false });
  };
  render() {
    console.log(this.props.data);
    // console.log('code',this.props.data.code)
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedcustomers = this.props.data.customers.length
      ? this.props.data.customers.slice(indexOfFirstitem, indexOfLastitem)
      : [];
    console.log(renderedcustomers);
    return (
      <section className="app-section">
        {this.state.openUploadModel && (
          <UploadModel
            getData={this.getData}
            area={this.props.data.areas}
            company={this.props.data.companies}
            // company = {this.props.data.companies}
            showAddCustomer={flag => {
              this.setState({
                openUploadModel: false
              });
            }}
          />
        )}

        {this.state.openCustomerForm && (
          <AddCustomer
            customer={this.state.targetCustomer}
            showAddCustomer={flag => {
              this.setState({
                openCustomerForm: false
              });
            }}
          />
        )}
        <div className="label-head">
          <img src="/images/label-head.png" />

          <h4>Customers</h4>
          {this.props.data.customers.length != 0 ? (
            <div className="paggination-setting">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={renderedcustomers.length}
                totalItemsCount={this.props.data.customers.length}
                pageRangeDisplayed={renderedcustomers.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
          ) : null}
        </div>

        <div className="row">
          <div class="input-field col s3">
            <input
              placeholder="Placeholder"
              style = {{opacity:0}}
              id="first_name"
              type="text"
              class="validate"
            />
            <label className="adjusted-label" for="first_name">
              Search Customers
            </label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>AREA</th>
                <th>FULL NAME</th>
                <th>COMPANY</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                {/* <th>STATUS</th> */}
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "4%" }}
                    src="/images/table-icons/upload-icon.png"
                    onClick={() => this.setState({ openUploadModel: true })}
                  />
                  {/* <input
                    className="icon add-item"
                    type="file"
                    accept=".csv"
                    style={{
                      rig++ht: "4%",
                      width: 35,
                      borderRadius: "50%",
                      opacity: 0
                    }}
                    onChange={this.onChangefile}
                  /> */}
                  {this.props.showAddBtn && (
                    <img
                      onClick={() => {
                        this.setState({
                          targetCustomer: {
                            company: {},
                            area: {}
                          },
                          openCustomerForm: true
                        });
                      }}
                      className="icon add-item"
                      src="/images/add-icon.png"
                    />
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {renderedcustomers
                ? renderedcustomers.map((customer, i) => {
                    return (
                      <tr>
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{customer.code}</td>
                        <td>{customer.area.name}</td>
                        {/* <td>{customer.area.name}</td> */}
                        <td>
                          {customer.firstName + " " + (customer.lastName || "")}
                        </td>
                        {/* <td>{customer.company.name}</td> */}
                        <td>{customer.company.name}</td>
                        <td>{customer.phone}</td>
                        <td className="wd-150">{customer.address}</td>
                        <td className="wd-200" >
                          <button
                            onClick={() => this.toggleStatus(customer)}
                            className={
                              customer.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {customer.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCustomer: customer,
                                openCustomerForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />

                          <img
                            title="View"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.setState({
                                targetCustomer: customer,
                                openCustomerForm: true
                              });
                            }}
                            className="icon"
                            src="/images/details-icon.png"
                          />
                          <img
                          data-test={customer._id}
                            style={{ cursor: "pointer" }}
                            onClick={() => this.deleteCustomer(customer._id)}
                            className="icon"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          {/* Paggination Code */}
          <center></center>
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createCustomer: data => {
      dispatch(customerMiddleWare.createCustomer(data));
    },
    delCustomer: customerId => {
      console.log(customerId)
      dispatch(customerMiddleWare.deleteCustomer(customerId));
    }
  };
};
export default connect(store => {
  return {
    data: {
      ...store.customerReducer,
      ...store.companyReducers,
      ...store.areaReducers
    }
  };
}, mapDispatchtoProps)(Customer);
