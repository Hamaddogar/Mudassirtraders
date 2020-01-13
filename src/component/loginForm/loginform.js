import React from "react";
import "./logincss.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import {middlewaresignup} from './../../store/Middleware/middleware'
import * as middleware from "../../store/Middleware/middleware";
import { login } from "../../store/Action/actionCreater";

class Login extends React.Component {
  state = {
    // username:'',
    email: "",
    // number:'',
    password: ""
  };
  handleValue = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    // console.log(evt.target.value);
  };
  signupUser = evt => {
    evt.preventDefault();
    this.props.updatedSignup(this.state);
  };

  render() {
  
    if (
      this.props.loggedInUser.id &&
      this.props.history.location.path == "/login"
    ) {
      this.props.history.push("/dashboard");
    }

    // console.log('state user',this.state.username);
    return (
      <div className="formstyle">
        {/* {
     
   
      this.props.history.push("/dashboard"):null
    } */}
        {/* <Link to='/'> */}
        <div className="loginForm">Login</div>
        {/* </Link> */}
        <form onSubmit={this.signupUser}>
          <input
            type="email"
            name="email"
            onChange={this.handleValue}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleValue}
            placeholder="password"
          />
          <div>
            <button className="def-btn">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    updatedSignup: data => {
      dispatch(middleware.middlewaresignup(data));
    }
  };
};
export default connect(store => {
  return {
    ...store.loginReducers
  };
}, mapDispatchtoProps)(Login);
