import { connect } from "react-redux";
import React, { useState } from "react";
// import './addProduct.css';
import customerMiddleWare from "../../../store/Middleware/products";
import utlities from "../../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

// const AddCustomer = (this.props) => {
class AddProduct extends React.Component {
  // let [this.state, setState] = useState({
  //     margin:0,
  //     shopkeeperPrice
  //     cost:0
  // });

  state = {
    // code: this.props.data.productCode,
    // utlities.getID("CUST", "code", this.props.data.products),
    ...this.props.product,
    costArray: this.props.product.costArray || [],
    shopkeeperArray:
     this.props.product.shopkeeperArray
        || [],
    customerArray:
       this.props.product.customerArray
        || []
  };
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    //  costArray.push(evt.target.value)

    console.log(this.state);

    evt.target.id == "shopkeeperPrice" &&
      this.state.cost &&
      (this.state.margin = this.state.cost - evt.target.value);
    this.setState(this.state);
    this.setState({
      costobject: evt.target.id
    });
  };

  saveCustomer = () => {
      
   

    this.state.code = this.state._id
      ? this.state.code
      : this.props.data.productCode;

    console.log(this.state.category);
    if (this.state.name === undefined || this.state.name === "") {
      Alert.error("Please Enter Product Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (this.state.cost === undefined || this.state.cost === "") {
      Alert.error("Please Enter  Product Cost !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.shopkeeperPrice === undefined ||
      this.state.shopkeeperPrice === ""
    ) {
      Alert.error("Please Enter   Shopkeeper Price !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.customerPrice === undefined ||
      this.state.customerPrice === ""
    ) {
      Alert.error("Please Enter  Customer price !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.quantityType === undefined ||
      this.state.quantityType === ""
    ) {
      Alert.error("Please Enter Product  Quantity Type !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.category === undefined ||
      this.state.category === "Select Category"
    ) {
      Alert.error("Please Enter  Product Category!", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.productQty === undefined ||
      this.state.productQty === ""
    ) {
      Alert.error("Please Enter  Product Quantity !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.cartonSize === undefined ||
      this.state.cartonSize === ""
    ) {
      Alert.error("Please Enter   Carton Size !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      this.state.description === undefined ||
      this.state.description === ""
    ) {
      Alert.error("Please Enter   Description !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else if (
      Object.keys(this.state.company).length === 0 ||
      this.state.company === "Select Company"
    ) {
      Alert.error("Please Enter   Select Company !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else {
      
      if (this.state.costArray.indexOf((this.state.cost).toString()) == -1) {
        this.state.costArray.push(this.state.cost);
        this.setState({
          costArray: this.state.costArray
        });
      }
       //Cann't Enter ShopKeeper CostValue
      if (
        (this.state.shopkeeperArray.indexOf((this.state.shopkeeperPrice).toString()) == -1)
      ) {
        this.state.shopkeeperArray.push(this.state.shopkeeperPrice);
        this.setState({
          shopkeeperArray: this.state.shopkeeperArray
        });
      }
   //Cann't Enter Already Customer Value
      if 
      (this.state.customerArray.indexOf((this.state.customerPrice).toString()) == -1)
  
      {
        this.state.customerArray.push(this.state.customerPrice);
        this.setState({
          customerArray: this.state.customerArray
        });
      }
      this.state.status = false
      this.props.createCustomer(this.state);

    }
  };
  render() {
    return (
      <div className="add-customer">
        <div
          class="modal-overlay"
          style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
        ></div>
        <div
          id="modal1"
          class="modal"
          style={{
            display: "block",
            "max-height": "fit-content"
            //     height: '90vh',
            //     'max-height': '90%',
            //     top: 0,
            //     bottom: 0
          }}
        >
          <div class="modal-content">
            <div className="sub-head">Add Product</div>
            <Alert stack={{ limit: 1 }} />

            <div className="modal-body">
              <input
                className="readonly-code"
                placeholder="Product Code"
                value={
                  this.state._id ? this.state.code : this.props.data.productCode
                }
                readOnly
                id="code"
                type="text"
              />

              <div className="row">
                {/* TBC, render supplier name here */}
                <div class="input-field col s6">
                  <select
                    value={this.state.company._id}
                    onChange={this.updateState}
                    id="company"
                    className="inline"
                  >
                    {[{ name: "Select Company" }]
                      .concat(this.props.data.companies)
                      .map(company => {
                        return (
                          <option value={company._id}>{company.name}</option>
                        );
                      })}
                  </select>
                  {/* <input placeholder="Placeholder" id="companyName" type="text" class="validate" />
                        <label className="default-input" for="companyName">Company Name</label> */}
                </div>

                <div class="input-field col s6">
                  <input
                    value={this.state.name}
                    onChange={this.updateState}
                    placeholder="Name"
                    id="name"
                    type="text"
                    class="validate"
                  />
                  {/* <label className="default-input" for="productName">Product Name</label> */}
                </div>
              </div>

              <div className="row">
                <div class="input-field col s6">
                  <input
                    value={this.state.cost}
                    onChange={this.updateState}
                    placeholder="Cost"
                    id="cost"
                    type="number"
                    class="validate"
                  />
                  {/* <label className="default-input" for="productCost">Product Cost</label> */}
                </div>
                <div class="input-field col s6">
                  <input
                    value={this.state.shopkeeperPrice}
                    onChange={this.updateState}
                    placeholder="Shopkeeper Price"
                    id="shopkeeperPrice"
                    type="number"
                    class="validate"
                  />
                  {/* <label className="default-input" for="shopkeeperPrice">Shopkeeper Price</label> */}
                </div>
              </div>

              <div className="row">
                <div class="input-field col s6">
                  <input
                    value={this.state.margin}
                    placeholder="Margin"
                    id="margin"
                    type="number"
                    readOnly
                  />
                  {/* <label className="default-input" for="productMargin">Margin</label> */}
                </div>

                <div class="input-field col s6">
                  <input
                    value={this.state.customerPrice}
                    onChange={this.updateState}
                    placeholder="Customer Price"
                    id="customerPrice"
                    type="number"
                    class="validate"
                  />
                  {/* <label className="default-input" for="productCpPrice">Customer Price</label> */}
                </div>
              </div>

              <div className="row">
                <div class="input-field col s6">
                  <select
                    value={this.state.quantityType}
                    onChange={this.updateState}
                    className="inline"
                    id="quantityType"
                  >
                    <option value="none">Quantity Type</option>
                    <option value="unit">Unit</option>
                    <option value="carton">Carton</option>
                  </select>
                </div>

                <div class="input-field col s6">
                  <select
                    state={this.state.category}
                    onChange={this.updateState}
                    id="category"
                    className="inline"
                  >
                    {[{ name: "Select Category" }]
                      .concat(this.props.data.categories)
                      .map(category => {
                        return (
                          <option value={category._id}>{category.name}</option>
                        );
                      })}
                  </select>
                  {/* <input onChange={this.updateState} placeholder="Placeholder" id="cartonSize" type="number" class="validate" /> */}
                  {/* <label className="default-input" for="cartonSize">Carton Price</label> */}
                </div>
              </div>

              <div className="row">
                <div class="input-field col s6">
                  <input
                    value={this.state.productQty}
                    onChange={this.updateState}
                    placeholder="Quantity"
                    id="productQty"
                    type="number"
                    class="validate"
                  />
                  {/* <label className="default-input" for="productQty">Quantity</label> */}
                </div>

                <div class="input-field col s6">
                  <input
                    value={this.state.cartonSize}
                    onChange={this.updateState}
                    placeholder="Carton Size"
                    id="cartonSize"
                    type="number"
                    class="validate"
                  />
                </div>
              </div>

              <div className="row">
                <div class="input-field col s6">
                  <textarea
                    value={this.state.description}
                    onChange={this.updateState}
                    placeholder="Description"
                    id="description"
                    class="materialize-textarea"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              className="waves-effect waves-light btn-small save"
              onClick={this.saveCustomer}
            >
              <i class="material-icons"></i>Save
            </button>
            <button
              className="waves-effect waves-light btn-small cancel"
              onClick={() => {
                //this.props.toggleMenu(false)
                this.props.showAddProduct(false);
              }}
            >
              <i class="material-icons"></i>Cancel
            </button>
          </div>
        </div>
      </div>
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
export default connect(store => {
  return {
    data: {
      ...store.categoryReducers,
      ...store.productReducers,
      ...store.companyReducers
    },
    adddata: store.productReducers
  };
}, mapDispatchtoProps)(AddProduct);
