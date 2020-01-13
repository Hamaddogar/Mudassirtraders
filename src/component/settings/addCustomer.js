import { connect, useSelector } from "react-redux";
import React, { useState } from "react";
import "./addCustomer.css";
import customerMiddleWare from "../../store/Middleware/customers";
import utlities from "../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const AddCustomer = props => {
  console.log(props);
  const { code } = useSelector(state => {
    return {
      code: state.customerReducer.code
    };
  });

  let [state, setState] = useState({
    code: code,
    ...props.customer
  });

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
  }

  function saveCustomer() {
    // TBC add validation here
    console.log(Object.keys(state.area));
    let pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    console.log("state.firstName", state.firstName);
    // Validation check
    if (state.firstName === undefined || state.firstName === "") {
      Alert.error("Please Enter Customer Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.lastName === undefined || state.lastName === "") {
      Alert.error("Please Enter Customer Last  Name!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (
      Object.keys(state.area).length === 0 ||
      state.area === "Select Area"
    ) {
      Alert.error("Please Select Customer Area!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.email === undefined || state.email === "") {
      Alert.error("Please Enter Customer Email Carefully!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (pattern.test(state.email) === false) {
      Alert.error("Please  Enter Customer Email Carefully!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.gender === undefined || state.gender === "Gender") {
      Alert.error("Please Select Customer Gender!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.zip === undefined || state.zip === "") {
      Alert.error("Please Enter Customer  Zip Code!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.province === undefined || state.province === "Province") {
      Alert.error("Please select Customer Province!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.address === undefined || state.address === "") {
      Alert.error("Please Enter  Customer  Address!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.city === undefined || state.city === "") {
      Alert.error("Please Enter Customer City Name!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.phone === undefined || state.phone === "") {
      Alert.error("Please Enter Customer  Phone Number!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (Object.keys(state.company).length === 0) {
      Alert.error("Please  select  Company! ", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else {
      Alert.success("Succefully ! You Have Add Customer!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
      console.log("Add customer", state);
      state.status = false;
      props.createCustomer(state);
    }
  }

  return (
    <div className="add-customer">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
      ></div>
      <div
        id="modal1"
        class="modal full-max-height"
        style={{ display: "block" }}
      >
        <div class="modal-content">
          <div className="sub-head">Add Customer</div>

          <div className="modal-body">
            <Alert stack={{ limit: 1 }} />
            <input
              className="readonly-code"
              placeholder="Customer Code"
              value={code}
              readOnly
              id="code"
              type="text"
            />

            <div className="row">
              {/* TBC, render area name here */}
              <div class="input-field col s6">
                <select
                  value={state.area.name}
                  onChange={updateState}
                  id="area"
                  className="inline"
                >
                  {[{ name: state.area.name ? state.area.name : "Select Area" }]
                    .concat(props.data.areas)
                    .map(area => {
                      return <option value={area._id}>{area.name}</option>;
                    })}
                </select>
                {/* <select onChange={updateState} id="location" className="inline">
                                <option>320GB</option>
                                <option>160GB</option>
                            </select> */}
                {/* <input placeholder="Placeholder" id="companyName" type="text" class="validate" />
                        <label className="default-input" for="companyName">Company Name</label> */}
              </div>

              <div class="input-field col s6">
                <input
                  value={state.phone}
                  onChange={updateState}
                  placeholder="Phone"
                  id="phone"
                  type="number"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.firstName}
                  onChange={updateState}
                  placeholder="First Name"
                  id="firstName"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierfName">First Name</label> */}
              </div>
              <div class="input-field col s6">
                <input
                  value={state.lastName}
                  onChange={updateState}
                  placeholder="Last Name"
                  id="lastName"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierlName">Last Name</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.email}
                  onChange={updateState}
                  placeholder="Email"
                  id="email"
                  type="email"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierEmail">Email</label> */}
              </div>

              <div class="input-field col s6">
                <select
                  value={state.gender}
                  onChange={updateState}
                  className="inline"
                  id="gender"
                >
                  <option>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.zip}
                  onChange={updateState}
                  placeholder="Zip"
                  id="zip"
                  type="number"
                  class="validate"
                  maxlength="11"
                />
                {/* <label className="default-input" for="supplierZip">Zip</label> */}
              </div>

              <div class="input-field col s6">
                <select
                  value={state.province}
                  onChange={updateState}
                  className="inline"
                  id="province"
                >
                  <option value="Province">Province</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="KPK">KPK</option>
                  <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <textarea
                  value={state.address}
                  onChange={updateState}
                  placeholder="Address"
                  id="address"
                  class="materialize-textarea"
                ></textarea>
                {/* <label for="supplierAddress">Street Address</label> */}
              </div>

              <div class="input-field col s6">
                <input
                  value={state.city}
                  onChange={updateState}
                  placeholder="City"
                  id="city"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierAgency">Agency Name</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <textarea
                  value={state.comments}
                  onChange={updateState}
                  placeholder="Comments"
                  id="comments"
                  class="materialize-textarea"
                ></textarea>
                {/* <label for="supplierComments">Comments</label> */}
              </div>

              <div class="input-field col s6">
                <select
                  value={state.company.name}
                  onChange={updateState}
                  id="company"
                  className="inline"
                >
                  {[
                    {
                      name: state.company.name
                        ? state.company.name
                        : "Select Company"
                    }
                  ]
                    .concat(props.data.companies)
                    .map(company => {
                      return (
                        <option value={company._id}>{company.name}</option>
                      );
                    })}
                </select>
                {/* <input  onChange={updateState} placeholder="Company" id="company" type="text" class="validate" /> */}
                {/* <label className="default-input" for="supplierAgency">Agency Name</label> */}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            className="waves-effect waves-light btn-small save"
            onClick={saveCustomer}
          >
            <i class="material-icons"></i>Save
          </button>
          <button
            className="waves-effect waves-light btn-small cancel"
            onClick={() => {
              //props.toggleMenu(false)
              props.showAddCustomer(false);
            }}
          >
            <i class="material-icons"></i>Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    createCustomer: data => {
      dispatch(customerMiddleWare.createCustomer(data));
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
}, mapDispatchtoProps)(AddCustomer);
