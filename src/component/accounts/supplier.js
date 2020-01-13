import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSupplier from "./addSupplier";
import Pagination from "react-js-pagination";
import './addSupplier.css'
// const Supplier = (props)=>{
class Supplier extends React.Component {
  // let [addingSupplier, showAddSupplier] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10
    };
  }

  state = {
    openSupplierForm: false,
    suppliers: this.props.data.suppliers
  };
  //   onchange = e => {
  //     e.preventDefault();
  //     // a
  //     search(a);
  //   };
  //   search = () => {
  //     this.state.suppliers.map(s => {
  //       return s.firstName.match(/`${a}`/g);
  //     });
  //   };
  componentDidMount() {
    // console.log(this.props.match.params)
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedsuppliers = this.props.data.suppliers.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    return (
      <section className="app-section">
        {this.state.openSupplierForm ? (
          <AddSupplier
            supplier={this.state.targetSupplier}
            showAddSupplier={() => {
              this.setState({
                openSupplierForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Suppliers</h4>

           {this.props.data.suppliers.length !=0?
          <div className="pagination-setting">
   
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={renderedsuppliers.length}
            totalItemsCount={this.props.data.suppliers.length}
            pageRangeDisplayed={renderedsuppliers.length}
            onChange={pageNumber => this.handlePageChange(pageNumber)}
          />
          </div>
          :null}
        </div>
        <div className="row">
          <div class="input-field col s3">
            <input
              id="first_name"
              type="text"
              class="validate"
              onChange={this.onchange}
            />
            <label className="adjusted-label" for="first_name">
              Search Suppliers
            </label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>FULL NAME</th>
                <th>COMPANY</th>
                <th className="wd-200">PHONE</th>
                <th className="wd-200">ADDRESS</th>
                <th>
                  {this.props.showAddBtn && (
                    <img
                      onClick={() => {
                        this.setState({
                          openSupplierForm: true,
                          targetSupplier: {
                            company: {}
                          }
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
              {renderedsuppliers.map((supplier, i) => {
                return (
                  <tr>
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{supplier.code}</td>
                    <td>
                      {supplier.firstName + " " + (supplier.lastName || "")}
                    </td>
                    <td>{supplier.company.name}</td>
                    <td className="wd-200">{supplier.phone}</td>
                    <td className="wd-200">{supplier.address}</td>
                    <td>
                      <img
                        title="Edit"
                        onClick={() => {
                          this.setState({
                            targetSupplier: supplier,
                            openSupplierForm: true
                          });
                        }}
                        className="icon pointer"
                        src="/images/table-icons/edit-icon.png"
                      /> 
                      <Link to={"/accountsdetails/" + supplier._id}>
                        <img className="icon" src="/images/details-icon.png" />
                      </Link>
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
export default connect(store => {
  return {
    data: store.supplierReducer
  };
})(Supplier);
