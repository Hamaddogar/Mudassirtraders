import React from "react";
import { connect } from "react-redux";
// import AutoComplete from "../../autocompletion/autocompletion";

import middleware from "./../../../store/Middleware/store";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
  // KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

class StoreSettings extends React.Component {
  state = {
    offdays: [],
    ...this.props.data.store
  };

  componentDidMount = () => {
    let that = this;

    this.offdays = this.props.data.store.offdays;

    window.$(this.refs.offDays).chips({
      data: (this.props.data.store.offdays || []).map(item => {
        return { tag: item };
      }),
      onChipAdd(chip) {
        that.offdays = this.chipsData.map(chip => {
          return chip.tag;
        });

        // window.$(that.refs.chipsContainer).append(chip.find('.chip'));
      },
      onChipDelete(chip) {
        that.offdays = this.chipsData.map(chip => {
          return chip.tag;
        });
      },
      autocompleteOptions: {
        chipsData: this.props.data.store.offdays,
        // data: data,
        data: {
          Sunday: null,
          Monday: null,
          Tuesday: null,
          Wednesday: null,
          Thursday: null,
          Friday: null,
          Saturday: null
        },
        limit: Infinity,
        minLength: 1
      }
    });

    // window.$('.input-field').find('.chip').each((i, item) => {
    //     window.$(this.refs.chipsContainer).append(item);
    // });
  };

  updateState = evt => {
    evt.target
      ? (this.state[evt.target.id] = evt.target.value)
      : (this.state[evt.name] = evt.data);
    this.setState({ ...this.state });
  };

  componentDidUpdate = (oldprops, newprops) => {
    this.state._id = this.props.data.store._id;
  };

  saveStore = () => {
    this.state.offdays = this.offdays;

    console.log(this.state.name);
    let pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

    if (this.state.name === undefined || this.state.name === "") {
      Alert.error("Please Enter  Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (this.state.phone === undefined || this.state.phone === "") {
      Alert.error("Please Enter  phone Number !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (this.state.email === undefined || this.state.email === "") {
      Alert.error("Please Enter  Email Carefully!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (pattern.test(this.state.email) === false) {
      Alert.error("Please Enter Email  Carefully !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (this.state.address === undefined || this.state.address === "") {
      Alert.error("Please Enter  Address !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (
      this.state.password === undefined ||
      this.state.password === ""
    ) {
      Alert.error("Please Enter  Password !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (
      this.state.startTiming === null ||
      this.state.startTiming === ""
    ) {
      Alert.error("Please Enter  Start Timing !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (
      this.state.endingTiming === undefined ||
      this.state.endingTiming === ""
    ) {
      Alert.error("Change  Ending Timing!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (this.state.offdays.length === 0) {
      Alert.error("Please Add Off Days!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else {
      console.log(this.state);

      this.props.saveSettings(this.state);
      Alert.success(" Successfully ! Offer Created", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    }
  };

  render() {
    return (
      <div className="app-section">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="label-head">
            <img src="/images/label-head.png" />
            <h4>Store Settings</h4>
          </div>
          <Alert stack={{ limit: 1 }} />

          <div style={{ marginTop: "55px" }}>
            <div className="row">
              <div class="input-field col s4">
                <input
                  value={this.state.name}
                  onChange={this.updateState}
                  placeholder="Name"
                  id="name"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>

              <div class="input-field col s4">
                <input
                  value={this.state.phone}
                  onChange={this.updateState}
                  placeholder="Phone"
                  id="phone"
                  type="text"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s4">
                <input
                  value={this.state.email}
                  onChange={this.updateState}
                  placeholder="Email"
                  id="email"
                  type="email"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>

              <div class="input-field col s4">
                <input
                  value={this.state.password}
                  onChange={this.updateState}
                  placeholder="Password"
                  id="password"
                  type="password"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s4">
                <textarea
                  value={this.state.address}
                  onChange={this.updateState}
                  placeholder="Address"
                  id="address"
                  class="white-back materialize-textarea"
                ></textarea>
                {/* <label for="supplierAddress">Street Address</label> */}
              </div>

              <div class="input-field col s4 white-back">
                <KeyboardTimePicker
                  margin="normal"
                  id="startTiming"
                  label="START TIMING"
                  value={this.state.startTiming}
                  onChange={value => {
                    this.updateState({ name: "startTiming", data: value });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div class="input-field col s4">
                <div class="chips" ref="offDays">
                  <input placeholder="Add Offday" class="custom-class" />
                </div>

                <div className="chipsContainer" ref="chipsContainer"></div>
              </div>

              <div class="input-field col s4 white-back">
                <KeyboardTimePicker
                  margin="normal"
                  id="endingTiming"
                  label="END TIMING"
                  value={this.state.endingTiming}
                  onChange={value => {
                    this.updateState({ name: "endingTiming", data: value });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </div>
            </div>
          </div>

          {/* </div> */}

          <div className="app-footer">
            <button
              className="waves-effect waves-light btn-small save"
              onClick={this.saveStore}
            >
              <i class="material-icons"></i>Save
            </button>
          </div>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    saveSettings: data => {
      dispatch(middleware.updateStore(data));
    }
  };
};

export default connect(store => {
  return {
    data: {
      ...store.storeReducer
    }
  };
}, mapDispatchtoProps)(StoreSettings);
