import { connect } from "react-redux";
import React, { useState } from "react";
// import './addCustomer.css';
import middleware from "../../../store/Middleware/category";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import utlities from "../../../utlities";

const AddCategory = props => {
  let [state, setState] = useState({
    ...props.category
    // code:utlities.getID("CATEG","code",props.data.categories)
  });
  console.log(state.code);

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
  }

  function saveCategory() {
    state.code = state._id ? state.code : props.data.categCode;

    if (state.name === "") {
      Alert.error("Please Enter  Catgory!", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    } else {
      Alert.success("Successfully!  Catgory created !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
      props.createCategory(state);
    }
  }

  return (
    <div className="add-category">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
      ></div>
      <div id="modal1" class="modal modal-small" style={{ display: "block" }}>
        <div class="modal-content">
          <div className="sub-head">Add Catgory</div>
          <Alert stack={{ limit: 1 }} />
          <div className="modal-body def-modal-body text-center">
            <input
              className="readonly-code"
              placeholder="Category Code"
              value={state._id ? state.code : props.data.categCode}
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
            onClick={saveCategory}
          >
            <i class="material-icons"></i>Save
          </button>
          <button
            className="waves-effect waves-light btn-small cancel"
            onClick={() => {
              //props.toggleMenu(false)
              props.showAddCategory(false);
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
    createCategory: data => {
      dispatch(middleware.createCategory(data));
    }
  };
};
export default connect(store => {
  return {
    data: store.categoryReducers
  };
}, mapDispatchtoProps)(AddCategory);
