import { connect, useSelector } from "react-redux";
import React, { useState } from "react";
// import './addCustomer.css';
import middleware from "../../../store/Middleware/company";
import utlities from "../../../utlities";
import { lastDayOfQuarterWithOptions } from "date-fns/fp";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const AddCompany = props => {
  let [state, setState] = useState({
    // code:code,
    ...props.company
  });
  console.log(state.code);

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
  }

  function saveCustomer() {
    state.code = state._id ? state.code : props.data.code;
       // validation check
    if ((state.name === undefined)||(state.name==="")) {
      Alert.error("Please Enter  Company Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if ((state.phone === undefined)||(state.phone==="")) {
      Alert.error("Please Enter  Company Phone Number!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if ((state.address === undefined)||(state.address==="")) {
      Alert.error("Please Enter  Company Address", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else {
      props.createCompany(state);
      Alert.success("Successfully ! Campany Created", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    }
  }

  // setState({
  //     code:code
  // })

  return (
    <div className="add-customer">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.9 }}
      ></div>
      <div id="modal1" class="modal modal-small" style={{ display: "block" }}>
        <div class="modal-content">
          <div className="sub-head">Add Company</div>
          <Alert stack={{ limit: 1 }} />
          <input
            className="readonly-code"
            placeholder="Company Code"
            value={state._id ? state.code : props.data.code}
            readOnly
            id="code"
            type="text"
          />

          <div className="modal-body def-modal-body text-center">
            <div className="row">
              <div class="input-field col s12">
                <input
                  value={state.name}
                  onChange={updateState}
                  placeholder="Company Name"
                  id="name"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="companyName">Company Name</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s12">
                <input
                  value={state.phone}
                  onChange={updateState}
                  placeholder="Company Phone"
                  id="phone"
                  type="number"
                  class="validate"
                />
                {/* <label className="default-input" for="companyPhone">Company Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s12">
                <input
                  value={state.address}
                  onChange={updateState}
                  placeholder="Company Address"
                  id="address"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="companyAddress">Company Address</label> */}
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
              props.showAddCompany(false);
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
    createCompany: data => {
      dispatch(middleware.createCompany(data));
    }
  };
};
export default connect(store => {
  return {
    data: store.companyReducers
  };
}, mapDispatchtoProps)(AddCompany);
