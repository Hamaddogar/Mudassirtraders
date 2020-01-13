import React from "react";
import { Route } from "react-router-dom";
import Login from "../loginForm/loginform";
import "./dashboard.css";
import Navbar from "../navbar/navbar";
import Papa from "papaparse";
import assert from "assert";
class Dashboard extends React.Component {
  //  componentDidMount(){
  //      console.log('csv',new Csv())
  //  }
  state = {
    file: ""
  };

  render() {
    return (
      <div>
        <div className="dashboard-container">
          {/* <h1>This is dashboard</h1>    */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
