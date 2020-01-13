import { connect } from "react-redux";
import React, { useState } from "react";
// import './addCustomer.css';
import middleware from "../../../store/Middleware/area";
import utlities from "../../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const AddArea = props => {
  let [state, setState] = useState({
    code: utlities.getID("AREA", "code", props.data.areas),
    ...props.area
  });
  console.log(state.code);

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
  }

  function saveArea() {
    state.code = props.data.code;
    // validation Area
  
    if (state.name === undefined || state.name === "") {
      Alert.error("Please Enter  Area !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else {
      Alert.success("Successfully  ! Area Created !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });

      props.createArea(state);
    }
  }

  return (
    <div className="add-area">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
      ></div>
      <div id="modal1" class="modal modal-small" style={{ display: "block" }}>
        <div class="modal-content">
          <div className="sub-head">Add Area</div>
          <Alert stack={{ limit: 1 }} />
          <div className="modal-body def-modal-body text-center">
            <input
              className="readonly-code"
              placeholder="Area Code"
              value={props.data.code}
              readOnly
              id="code"
              type="text"
            />

            <div className="row">
              <div class="input-field col s12">
                <input
                  value={state.name}
                  onChange={updateState}
                  placeholder="Name"
                  id="name"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="companyName">Company Name</label> */}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            className="waves-effect waves-light btn-small save"
            onClick={saveArea}
          >
            <i class="material-icons"></i>Save
          </button>
          <button
            className="waves-effect waves-light btn-small cancel"
            onClick={() => {
              //props.toggleMenu(false)
              props.showAddArea(false);
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
    createArea: data => {
      dispatch(middleware.createArea(data));
    }
  };
};
export default connect(store => {
  return {
    data: store.areaReducers
  };
}, mapDispatchtoProps)(AddArea);
