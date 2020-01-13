import React, { Component } from "react";
import "./navbar.css";
import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Menu, Dropdown, Icon, Button } from "antd";
import { store } from "../../store/store";
class Header extends Component {
  showMenu = type => {
    this.props.history.push("/");

    store.dispatch({
      type: "SHOW_MENU",
      payload: type
    });
  };

  render = () => {
    const { nestdropdown } = this.props;
    console.log(nestdropdown);
    const { accountitem } = this.props;
    console.log(accountitem);

    const { reportingItem } = this.props;
    const { MainMenuItemName } = this.props;
    console.log(MainMenuItemName);
    const { settingItems } = this.props;
    console.log(settingItems);
    const { SubMenu } = Menu;
    const account = (
      <Menu>
        {accountitem.map(item => (
          <Menu key={item}>
            <Menu.Item>{item}</Menu.Item>
          </Menu>
        ))}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );
    const reporting = (
      <Menu>
        {reportingItem.map(item => (
          <Menu key={item}>
            <Menu.Item>{item}</Menu.Item>
          </Menu>
        ))}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );
    const setting = (
      <Menu>
        {/* {settings.map(item => <Menu key={item}><Menu.Item>{item}</Menu.Item> */}
        {/* </Menu>)} */}
        {/* <SubMenu title="sub menu">{nestdropdown ? nestdropdown.map(nestItem => <Menu key={nestItem}><Menu.Item>{nestItem}</Menu.Item></Menu>) : null}
            </SubMenu> */}
      </Menu>
    );

    return (
      <div className="Navbar">
        <Row type="flex" justify="center">
          <Col span={1}>
            {" "}
            <a
              className="ant-dropdown-link"
              style={{ color: "white" }}
              href="#"
            >
              {MainMenuItemName.home}
            </a>
          </Col>
          <Col span={1} onClick={this.showMenu.bind(null, "accounts")}>
            <a
              className="ant-dropdown-link"
              style={{ color: "white" }}
              href="#"
            >
              {MainMenuItemName.accounts}
              <Icon type="down" />
            </a>
          </Col>
          <Col span={1} style={{ color: "white" }}>
            {" "}
            <Link
              className="ant-dropdown-link"
              style={{ color: "white" }}
              to="/sales"
            >
              {MainMenuItemName.sales}
            </Link>
          </Col>
          <Col span={2} style={{ color: "white" }}>
            <Link
              className="ant-dropdown-link"
              style={{ color: "white" }}
              to="/purchases"
            >
              {MainMenuItemName.Purchase}
            </Link>
          </Col>

          <Col
            span={2}
            onClick={this.showMenu.bind(null, "reporting")}
            style={{ color: "white" }}
          >
            <a
              className="ant-dropdown-link"
              style={{ color: "white" }}
              href="#"
            >
              {MainMenuItemName.reporting}
              <Icon type="down" />
            </a>
          </Col>
          <Col
            span={2}
            onClick={this.showMenu.bind(null, "settings")}
            style={{ color: "white" }}
          >
            <a
              className="ant-dropdown-link"
              style={{ color: "white" }}
              href="#"
            >
              Settings
              <Icon type="down" />
            </a>
          </Col>
          <Col span={2}>
            <Link
              className="ant-dropdown-link"
              style={{ color: "white" }}
              to="/recovery"
            >
              {MainMenuItemName.recovery}>
            </Link>
          </Col>
          <Col span={2}>
            <Link
              className="ant-dropdown-link"
              style={{ color: "white" }}
              to="/expenses"
            >
              {MainMenuItemName.Expenses}
            </Link>
            {/* <a className="ant-dropdown-link" style={{ color: 'white' }} to='/expenses' href="#">{MainMenuItemName.Expenses} */}
          </Col>
          <Col span={1}>
            <Link
              className="ant-dropdown-link"
              style={{ color: "white" }}
              to="/salary"
            >
              {MainMenuItemName.salary}
            </Link>
          </Col>
          <Col span={2}>
            <a
              className="ant-dropdown-link"
              style={{ color: "white" }}
              href="#"
            >
              {MainMenuItemName.profit}
            </a>
          </Col>

          <Col span={1}>
            <Link to="/attendence">{MainMenuItemName.return}</Link>
          </Col>

          {/* <Col span={1}><a className="ant-dropdown-link" style={{ color: 'white' }} href="#">{MainMenuItemName.return}
            </a></Col>
            <Col span={2}><a className="ant-dropdown-link" style={{ color: 'white' }} href="#">{MainMenuItemName.stock}
            </a></Col> */}
          {/* {!this.props.auth.loggedInUser.id && (
            <Col span={2}>
              {" "}
              <Link to="/login">
                <Button type="dashed">Login</Button>
              </Link>
            </Col>
          )} */}
        </Row>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    auth: state.loginReducers,
    nestdropdown: state.dropdownReducers.nestedItem,
    accountitem: state.dropdownReducers.accounts,
    reportingItem: state.dropdownReducers.reporting,
    settingItems: state.dropdownReducers.settingItem,
    MainMenuItemName: state.dropdownReducers.MainMenuItemNames
  };
};
export default withRouter(connect(mapStateToProps)(Header));
