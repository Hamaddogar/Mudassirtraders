import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddArea from "./addArea";
import middleware from "../../../store/Middleware/area";
import Pagination from "react-js-pagination";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import customerMiddleWare from "../../../store/Middleware/products";

import "./pricing.css";
import product from "../products/product";

// import './area.css'

// const Area = (this.propss) => {
class Pricing extends React.Component {
  // let [addingArea, showAddArea] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,

      costupdate: null,
      shopkeeperCostupdate: null,
      costCustomerupdate: null
    };
  }

  state = {
    targetArea: {},
    openAreaForm: false
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  toggleStatus = company => {
    company.status = !company.status;
    this.props.toggleState(company);
  };
  selectSupplier = e => {
    
    let selectSupplier = e.target.value;
    this.setState({
      selectSupplier: selectSupplier
    });
  };

  selectProduct = e => {
    let selectProduct = e.target.value;
    this.setState({
      selectProduct: selectProduct
    });
  };

  costproduct = (e, product) => {
    this.setState({
      costupdate: e.target.value
    });

    console.log(product.cost);
  };
  costShopSelect = e => {
    let shopkeeperCostupdate = e.target.value;
    this.setState({
      shopkeeperCostupdate: shopkeeperCostupdate
    });
  };

  costCustomerSelect = e => {
    let costCustomerupdate = e.target.value;
    this.setState({
      costCustomerupdate: costCustomerupdate
    });
  };
  savecustomer = (e, product) => {
    product.cost =
      this.state.costupdate === null ? product.cost : this.state.costupdate;
    product.shopkeeperPrice =
      this.state.shopkeeperCostupdate === null
        ? product.shopkeeperPrice
        : this.state.shopkeeperCostupdate;
    product.customerPrice =
      this.state.shopkeeperCostupdate === null
        ? product.customerPrice
        : this.state.costCustomerupdate;

    this.props.createCustomer(product);
  };
  render() {
    let supplier_product_Filter = this.props.dataProduct.products.filter(
      (item, index) => {
        return (
          item.company.name === this.state.selectSupplier ||
          item.name === this.state.selectProduct
        );
      }
    );

    return (
      <section className="app-section">
        {/* {this.state.openAreaForm ? (
          <AddArea
            area={this.state.targetArea}
            showAddArea={() => {
              this.setState({
                openAreaForm: false
              });
            }}
          />
        ) : null} */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Product Pricing</h4>
        </div>
        <div className="row">
          <div class="input-field col s3">
            {/* <Autocomplete
      id="combo-box-demo"
      // options="my first option"
      getOptionLabel={option => option.title}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="---Select Supplier---" variant="outlined" fullWidth />
      )}
    /> */}
            <div className="selectSetting">
              <select
                className="selectstyle"
                onChange={e => {
                  this.selectSupplier(e);
                }}
              >
                <option value="">---Select Supplier---</option>
                {this.props.dataProduct.products.map((product, i) => {
                  return (
                    <option value={product.company.name}>
                      {product.company.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="input-field col s3">
            <div className="selectSetting">
              <select
                className="selectstyle"
                onChange={e => {
                  this.selectProduct(e);
                }}
              >
                <option value="" selected>
                  ---Select Product ---
                </option>
                {this.props.dataProduct.products.map((product, i) => {
                  return <option value={product.name}>{product.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th className="wd-20">SR.</th>
                <th>CODE</th>
                <th className="wd-200">NAME</th>
                <th>SUPPLIER</th>
                <th>COST</th>
                <th>SHOPKEEPPER PRICE</th>
                {/* <th>MARGIN</th> */}
                <th>CUSTOMER PRICE</th>
                {/* <th>QTY</th> */}
                {/* <th>TIME</th> */}
                <th>
                  {/* {this.props.showAddBtn &&   */}
                  <img
                    onClick={() => {
                      // showAddProduct(true)
                      this.setState({
                        targetProduct: {
                          company: {},
                          category: {}
                        },
                        openProductForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  {/* } */}
                </th>
              </tr>
            </thead>
            <tbody>
              {supplier_product_Filter.length != 0
                ? supplier_product_Filter.map((product, i) => {
                  return (
                    <tr>
                      <td className="wd-20">
                        <b>{i + 1}</b>
                      </td>
                      <td>{product.code}</td>
                      <td className="wd-200">{product.name}</td>
                      {/* <td>{product.product.name}</td> */}
                      <td>{product.company.name}</td>
                      <td>
                        <div className="selectSetting">
                          <select
                            className="selectstyle"
                            onChange={e => {
                              this.costproduct(e, product);
                            }}
                          >
                            {product.costArray.map((item, index) => {
                              return (
                                <option  selected= {product.cost === item * 1
                                ? "selected"
                                : "" }
                                 
                                  value={item * 1}
                                >
                                  {item * 1}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div className="selectSetting">
                          <select
                            className="selectstyle"
                            onChange={e => {
                              this.costShopSelect(e);
                            }}
                          >
                            {product.shopkeeperArray
                             
                              .map((item, index) => {
                                return (
                                  <option selected={product.shopkeeperPrice === item
                                    ? "selected"
                                    : ""}value={item * 1}>{item * 1}</option>
                                );
                              })}
                          </select>
                        </div>
                      </td>
                      {/* <td>{product.margin}</td> */}
                      <td>
                        <div className="selectSetting">
                          <select
                            className="selectstyle"
                            onChange={e => {
                              this.costCustomerSelect(e);
                            }}
                          >
                            {product.customerArray
                              
                              .map((item, index) => {
                                return (
                                  <option 
                                  selected={product.customerPrice === item
                                    ? "selected"
                                    : ""}value={item * 1}>{item * 1}</option>
                                );
                              })}
                          </select>
                        </div>
                      </td>
                      <td>
                       
                        <img
                          title="Edit"
                          onClick={e => {
                            this.savecustomer(e, product);
                          }}
                          className="icon pointer"
                          src="/images/table-icons/edit-icon.png"
                        />
                        
                      </td>
                    </tr>
                  );
                })
                : this.props.dataProduct.products.map((product, i) => {
                    return (
                      <tr>
                        <td className="wd-20">
                          <b>{i + 1}</b>
                        </td>
                        <td>{product.code}</td>
                        <td className="wd-200">{product.name}</td>
                        {/* <td>{product.product.name}</td> */}
                        <td>{product.company.name}</td>
                        <td>
                          <div className="selectSetting">
                            <select
                              className="selectstyle"
                              onChange={e => {
                                this.costproduct(e, product);
                              }}
                            >
                              {product.costArray.map((item, index) => {
                                return (
                                  <option  selected= {product.cost === item * 1
                                  ? "selected"
                                  : "" }
                                   
                                    value={item * 1}
                                  >
                                    {item * 1}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </td>
                        <td>
                          <div className="selectSetting">
                            <select
                              className="selectstyle"
                              onChange={e => {
                                this.costShopSelect(e);
                              }}
                            >
                              {product.shopkeeperArray
                               
                                .map((item, index) => {
                                  return (
                                    <option selected={product.shopkeeperPrice === item *1
                                      ? "selected"
                                      : ""}value={item * 1}>{item * 1}</option>
                                  );
                                })}
                            </select>
                          </div>
                        </td>
                        {/* <td>{product.margin}</td> */}
                        <td>
                          <div className="selectSetting">
                            <select
                              className="selectstyle"
                              onChange={e => {
                                this.costCustomerSelect(e);
                              }}
                            >
                              {product.customerArray
                                
                                .map((item, index) => {
                                  return (
                                    <option 
                                    selected={product.customerPrice === item *1
                                      ? "selected"
                                      : ""}value={item * 1}>{item * 1}</option>
                                  );
                                })}
                            </select>
                          </div>
                        </td>
                        <td>
                         
                          <img
                            title="Edit"
                            onClick={e => {
                              this.savecustomer(e, product);
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>

          {/* Paggination Code */}
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createCustomer: data => {
      dispatch(customerMiddleWare.createProduct(data));
    }
  };
};

export default connect(
  store => {
    return {
     
      dataProduct: store.productReducers
    };
  },

  mapDispatchtoProps
)(Pricing);
