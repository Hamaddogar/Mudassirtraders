import { connect } from "react-redux";
import React, { useState } from "react";
// import "./addCustomer.css";
import customerMiddleWare from "../../store/Middleware/customers";
import utlities from "../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import AutoComplete from "../autocompletion/autocompletion";
import Papa from "papaparse";

class AddCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      area: "",
      company: "",
      data: [],
      file: ""
    };
  }

  updateState = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangefile = e => {
    console.log(this.state.code);

    let self = this;
    this.setState({ file: e.target.files[0] }, () => {
      console.log(this.state.file);
      Papa.parse(this.state.file, {
        header: true,
        complete: function(results) {
          //   console.log(results);
          results.data.forEach((item, i) => {
            console.log(item);
            item.area = self.state.area;
            item.company = self.state.company;
            self.state.data.push(item);
          });
        }
      });
    });
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
          class="modal full-max-height"
          style={{ display: "block" }}
        >
          <div class="modal-content">
            <div className="sub-head">Add Customer</div>

            <div className="modal-body">
              <div class="row">
                <div class="col 4">
                  <AutoComplete
                    property="name"
                    onChange={(evt, area) => {
                      console.log("sals chane", area);
                      area &&
                        this.updateState({
                          target: {
                            id: "area",
                            value: area._id
                          }
                        });
                    }}
                    data={this.props.area}
                    placeholder="Select Area"
                  />
                </div>
                <div class="col 4">
                  <AutoComplete
                    property="name"
                    onChange={(evt, company) => {
                      console.log("sals chane", company);
                      company &&
                        this.updateState({
                          target: {
                            id: "company",
                            value: company._id
                          }
                        });
                    }}
                    data={this.props.company}
                    placeholder="Select Company"
                  />
                </div>
                <div class="col 4">
                  <img
                    className="icon add-item"
                    style={{ position: "relative" }}
                    src="/images/table-icons/upload-icon.png"
                    onClick={() => this.setState({ openUploadModel: true })}
                  />
                  <input
                    className="icon add-item"
                    type="file"
                    accept=".csv"
                    style={{
                      right: "50%",
                      position: "relative",
                      width: 35,
                      borderRadius: "50%",
                      opacity: 0
                    }}
                    onChange={this.onChangefile}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                className="waves-effect waves-light btn-small save"
                onClick={() => this.props.getData(this.state.data)}
              >
                <i class="material-icons"></i>Save
              </button>
              <button
                className="waves-effect waves-light btn-small cancel"
                onClick={() => {
                  //props.toggleMenu(false)
                  this.props.showAddCustomer(false);
                }}
              >
                <i class="material-icons"></i>Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
