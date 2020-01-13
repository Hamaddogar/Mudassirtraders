import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSupplier from "./addSupplier";
import Pagination from "react-js-pagination";
import supplierMiddleWare from "../../../store/Middleware/suppliers";
import Papa from "papaparse";

// const supplier = (props)=>{

class Supplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      opensupplierForm: false,
      file: ""
    };
  }

  onChangefile = e => {
    let self = this;
    this.setState({ file: e.target.files[0] }, () => {
      console.log(this.state.file);
      Papa.parse(this.state.file, {
        header: true,
        complete: function(results) {
          //   console.log(results);
          results.data.forEach((item, i) => {
            //   if(item._id != ''){
            console.log(item);
            item.code = "CUST_" + i;
            self.props.createsupplier(item);
            //   }
            //    setTimeout(()=>{

            //    })
          });
        }
      });
    });
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  deleteSupplier = supplierId => {
    this.props.delsupplier(supplierId);
  };
  toggleStatus = supplier => {
    debugger
    supplier.status = !supplier.status;
  console.log(supplier.status)
  this.props.createsupplier(supplier);
};
  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedsuppliers = this.props.data.suppliers.length?  this.props.data.suppliers.slice(
      indexOfFirstitem,
      indexOfLastitem
    ):[]
    console.log(renderedsuppliers);
    return (
      <section className="app-section">
        {this.state.opensupplierForm && (
          <AddSupplier
            supplier={this.state.targetsupplier}
            showAddSupplier={flag => {
              this.setState({
                opensupplierForm: false
              });
            }}
          />
        )}
        <div className="label-head">
          <img src="/images/label-head.png" />

          <h4>suppliers</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              placeholder="Placeholder"
              id="first_name"
              type="text"
              class="validate"
            />
            <label className="adjusted-label" for="first_name">
              Search suppliers
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
                <th className="wd-200">PHONE</th>
                <th className="wd-200">ADDRESS</th>
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "4%" }}
                    src="/images/table-icons/upload-icon.png"
                  />
                  <input
                    className="icon add-item"
                    type="file"
                    accept=".csv"
                    style={{
                      right: "4%",
                      width: 35,
                      borderRadius: "50%",
                      opacity: 0
                    }}
                    onChange={this.onChangefile}
                  />
                  {this.props.showAddBtn && (
                    <img
                      onClick={() => {
                        this.setState({
                          targetsupplier: {
                            company: {},
                            area: {}
                          },
                          opensupplierForm: true
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
              {renderedsuppliers
                ? renderedsuppliers.map((supplier, i) => {
                    return (
                      <tr>
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{supplier.code}</td>
                        {/* <td>{supplier.area.name}</td> */}
                        <td>
                          {supplier.firstName + " " + (supplier.lastName || "")}
                        </td>
                        {/* <td>{supplier.company.name}</td> */}
                        <td className="wd-200">{supplier.phone}</td>
                        <td className="wd-200">{supplier.address}</td>
                        <td>
                        <button
                        onClick={()=>this.toggleStatus(supplier)}
                        className={
                          supplier.status
                            ? "control-btn"
                            : "control-btn disabled-btn"
                        }
                      >
                        {supplier.status ? "Activate" : "Deactivate"}
                      </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetsupplier: supplier,
                                opensupplierForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />

                          <img
                            onClick={() => {
                                this.setState({
                                  targetsupplier: supplier,
                                  opensupplierForm: true
                                });
                              }}
                            className="icon"
                            src="/images/details-icon.png"
                          />
                          <img
                            onClick={() => this.deleteSupplier(supplier._id)}
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
          <center>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={renderedsuppliers.length}
              totalItemsCount={this.props.data.suppliers.length}
              pageRangeDisplayed={renderedsuppliers.length}
              onChange={pageNumber => this.handlePageChange(pageNumber)}
            />
          </center>
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createsupplier: data => {
      dispatch(supplierMiddleWare.createSupplier(data));
    },
    delsupplier: supplierId => {
      dispatch(supplierMiddleWare.deleteSupplier(supplierId));
    },
   
  };
};
export default connect(store => {
  return {
    data: store.supplierReducer
  };
}, mapDispatchtoProps)(Supplier);
