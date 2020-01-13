import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import utlities from "../../../utlities";
import middleware from "../../../store/Middleware/users";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

// import './addSupplier.css';

const AddUser = props => {
  let [state, setState] = useState({
    ...props.user
    // code:utlities.getID("USER","code",props.data.users)
  });

  let areaBox = React.createRef();
  let chipsContainer = React.createRef();

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState(state);
  }

  let user = [];

  function findAllocatedAreas(user, allocatedAreas) {
    // let data = {};
    // allocatedAreas.forEach((area) => {
    //     data[area.name] = user.areas.indexOf(area.name) != -1 ? true : null;
    // })
    // return data;
  }

  let currentAreas = [];

  let data = {
    Apple: null,
    Microsoft: null,
    Google: null
  };

  function transformAreasToChipsData(list) {
    let obj = {};

    list.forEach(item => {
      obj[item.name] = null;
    });

    return obj;
  }

  useEffect(() => {
    // props.user.areas.forEach((area)=>{

    //     window.$('<div class="chip">'+area+'</div>').appendTo(chipsContainer.current);

    // });

    let areas = props.data.areas;

    window.$(areaBox.current).chips({
      data: props.user.areas.map(item => {
        return { tag: item.name };
      }),
      onChipAdd(chip) {
        currentAreas = this.chipsData.map(chip => {
          return areas.find(area => {
            return chip.tag == area.name;
          })._id;
        });

        window.$(chipsContainer.current).append(chip.find(".chip"));
      },
      onChipDelete(chip) {
        currentAreas = this.chipsData.map(chip => {
          return areas.find(area => {
            return chip.tag == area.name;
          })._id;
        });
      },
      autocompleteOptions: {
        chipsData: props.user.areas,
        // data: data,
        data: transformAreasToChipsData(props.data.areas),
        limit: Infinity,
        minLength: 1
      }
    });

    window
      .$(".input-field")
      .find(".chip")
      .each((i, item) => {
        window.$(chipsContainer.current).append(item);
      });
  });

  function saveUser(e) {
    e.preventDefault();

    state.areas = currentAreas;

    state.code = state._id ? state.code : props.data.userCode;
    let pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

    // Validation check
    if ((state.fullName === undefined)||(state.fullName === "")) {
      Alert.error("Please Enter User Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (state.areas.length === 0) {
      Alert.error("Please  Add  User Area!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if ((state.email === undefined)||(state.email==="")) {
      Alert.error("Please Enter  User Email Carefully", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (pattern.test(state.email) === false) {
      Alert.error(
        "Please Enter  User Email Carefully  ",
        {
          position: "top-right",
          effect: "slide",
          timeout: 3000
        }
      );
    } else if ((state.phone === undefined)||(state.phone==="")) {
      Alert.error("Please Enter  User Phone Number", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else {
      console.log("user",state);
      Alert.success("Succefully ! User Created ", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
      console.log(state)
      // state.status = true
      props.createUser(state);
    }
  }

  return (
    <div className="add-user">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
      ></div>
      <div id="modal1" class="modal" style={{ display: "block" }}>
        <div class="modal-content">
          <div className="sub-head">Add User</div>

          <div className="modal-body">
            <Alert stack={{ limit: 1 }} />

            <input
              className="readonly-code"
              id="code"
              readOnly
              value={state._id ? state.code : props.data.userCode}
              type="text"
            />
            <div className="row">
              {/* TBC, render companies name here */}
              <div class="input-field col s6">
                <input
                  value={state.fullName}
                  onChange={updateState}
                  placeholder="Full Name"
                  id="fullName"
                  type="text"
                  class="validate"
                />
              </div>

              <div class="input-field col s6">
                <div class="chips" ref={areaBox}>
                  <input placeholder="Add Area" class="custom-class" />
                </div>

                <div className="chipsContainer" ref={chipsContainer}></div>
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
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.phone}
                  onChange={updateState}
                  placeholder="Phone"
                  id="phone"
                  type="number"
                  class="validate"
                />
              </div>
            </div>
            {/* 
                    <div className="row">

                        <div class="input-field col s6">
                            <select onChange={updateState} className="inline" id="supplierProvince">
                                <option>Punjab</option>
                                <option>Sindh</option>
                                <option>Balochistan</option>
                                <option>KPK</option>
                                <option>Gilgit Baltistan</option>
                            </select>
                        </div>
                    </div> */}

            <div className="row">
              {/* <div class="input-field col s6">
                            <textarea onChange={updateState} placeholder="Address" id="supplierAddress" class="materialize-textarea"></textarea>
                            {/* <label for="supplierAddress">Street Address</label> 
                    </div> */}

              {/* <div class="input-field col s6">
                            <input onChange={updateState} placeholder="Agency" id="supplierAgency" type="text" class="validate" />
                            {/* <label className="default-input" for="supplierAgency">Agency Name</label>
                </div> */}
            </div>

            {/* <div className="row">

                <div class="input-field col s6">
                    <textarea onChange={updateState} id="supplierComments" class="materialize-textarea"></textarea>
                    <label for="supplierComments">Comments</label>
                </div>

            </div> */}
          </div>
        </div>
        <div class="modal-footer">
          <button
            className="waves-effect waves-light btn-small save"
            onClick={saveUser}
          >
            <i class="material-icons"></i>Save
          </button>
          <button
            className="waves-effect waves-light btn-small cancel"
            onClick={() => {
              //props.toggleMenu(false)
              props.showAddUser(false);
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
    createUser: data => {
      dispatch(middleware.createUser(data));
    }
  };
};

export default connect(store => {
  return {
    data: { ...store.userReducer, ...store.areaReducers }
  };
}, mapDispatchtoProps)(AddUser);
