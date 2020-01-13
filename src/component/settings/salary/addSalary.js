import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import utlities from "../../../utlities";
import middleware from "../../../store/Middleware/users";
import Currency from "react-currency-formatter";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

// import './addSupplier.css';

const AddUser = props => {
  let [state, setState] = useState({
    ...props.user
    // code:utlities.getID("USER","code",props.data.users)
  });
  console.log("PropsUser", {
    ...props.user
  },state);

  let areaBox = React.createRef();
  let chipsContainer = React.createRef();

  let [record, setRecord] = useState({
    records: []
  });

  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
  }

  let user = [];

  const classes = useStyles();

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
  const monthDropDown = React.useRef();

  useEffect(() => {
    // props.user.areas.forEach((area)=>{

    //     window.$('<div class="chip">'+area+'</div>').appendTo(chipsContainer.current);

    // });

    window.$(monthDropDown.current).dropdown();
  });

  const [value, setValue] = React.useState(0);
  // const [salary, setSalary] = React.useState(0);

  const [paymentType, setPaymentType] = React.useState("regularpay");
  const [selectedMonth, setSelectedMonth] = React.useState(
    utlities.time.getMonthName()
  );

  const handleChange = (event, newValue) => {
    if (newValue == 1) {
      props.fetchSalaries(props.user._id).then(records => {
        setRecord({
          records: records
        });
      });
    }

    setValue(newValue);
  };

  fetchAttendance();

  function fetchAttendance(args) {
    fetch("/api/attendance/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // date: newDate.getDate(),
        user: props.user._id,
        month: utlities.time.getMonthFromName(selectedMonth)
        // year: newDate.getFullYear()
      })
    })
      .then(resp => resp.json())
      .then(attendanceDays => {
        let days = utlities.time.getMonthDays(selectedMonth);
        let leaves = days - attendanceDays.length;
        let perDaySalary = props.user.salary / days;

        let payableSalary = perDaySalary * attendanceDays.length;

        setState({
          amount: Math.round(payableSalary),
          offdays: leaves
        });

        console.log(20);
        // this.setState({ searched: resp });
      });
  }

  function saveSalary() {
    // state.areas = currentAreas;
    // console.log(state);
    // state.code = state._id ? state.code : props.data.userCode;
    // state.type = paymentType;
    // state.user = props.user._id
    // state.month = selectedMonth;
    props.createSalary({
      type: paymentType,
      user: props.user._id,
      month: selectedMonth,
      amount: state.amount
    });
  }

  return (
    <div className="add-user">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
      ></div>
      <div
        id="modal1"
        class="modal"
        style={{ display: "block", height: "405px" }}
      >
        <div class="modal-content">
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="ADD NEW" {...a11yProps(0)} />
                <Tab label="PREVIOUS SALARIES" {...a11yProps(1)} />
                <Tab label="Payroll" {...a11yProps(2)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <div className="row">
                <div class="input-field col s6">
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Payment Type</FormLabel>
                    <RadioGroup
                      aria-label="paymentType"
                      name="paymentType"
                      value={paymentType}
                      onChange={evt => {
                        setPaymentType(evt.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="prepay"
                        control={<Radio />}
                        label="PRE-PAY"
                      />
                      <FormControlLabel
                        value="regularpay"
                        control={<Radio />}
                        label="REGULAR PAY"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div class="input-field col s6">
                  <input
                    value={state.amount}
                    onChange={updateState}
                    placeholder="Amount"
                    id="amount"
                    type="number"
                    class="validate"
                  />
                  <input
                    readOnly
                    value={state.offdays}
                    onChange={evt => {
                      let days = utlities.time.getMonthDays(
                        utlities.time.getMonthName()
                      );
                      let perDaySalary = props.user.salary / days;
                      let payableSalary =
                        perDaySalary * (days - evt.target.value);

                      setState({
                        amount: Math.round(payableSalary)
                      });
                    }}
                    placeholder="Off Days"
                    id="offdays"
                    type="number"
                    class="validate"
                  />
                  <a
                    class="dropdown-trigger btn"
                    ref={monthDropDown}
                    href="#"
                    data-target="dropdown1"
                  >
                    {selectedMonth}
                  </a>

                  <ul
                    title="Select Month"
                    onClick={evt => {
                      setSelectedMonth(evt.target.innerText);
                    }}
                    id="dropdown1"
                    class="dropdown-content"
                  >
                    <li>
                      <a href="#!">JANUARY</a>
                    </li>
                    <li>
                      <a href="#!">FEBRUARY</a>
                    </li>
                    <li>
                      <a href="#!">MARCH</a>
                    </li>
                    <li>
                      <a href="#!">APRIL</a>
                    </li>
                    <li>
                      <a href="#!">MAY</a>
                    </li>
                    <li>
                      <a href="#!">JUNE</a>
                    </li>
                    <li>
                      <a href="#!">JULY</a>
                    </li>
                    <li>
                      <a href="#!">AUGUST</a>
                    </li>
                    <li>
                      <a href="#!">SEPTEMBER</a>
                    </li>
                    <li>
                      <a href="#!">OCTOBER</a>
                    </li>
                    <li>
                      <a href="#!">NOVEMBER</a>
                    </li>
                    <li>
                      <a href="#!">DECEMBER</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <table className="center-black text-black" border="1">
                    <tr>
                      <th>TOTAL SALARY</th>
                      <td className="center-table">
                        <Currency quantity={props.user.salary} currency="PKR" />{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>TOTAL OFFDAYS</th>
                      <td className="center-table">{state.offdays}</td>
                    </tr>
                    <tr>
                      <th>PAYABLE SALARY</th>
                      <td className="border-top center-table">
                        <Currency quantity={state.amount} currency="PKR" />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <table>
                <thead>
                  <tr>
                    <th>SR.</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Month</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {record.records.map((company, i) => {
                    return (
                      <tr>
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{new Date(company.date).toDateString()}</td>
                        <td>{company.type}</td>
                        <td>{company.month}</td>
                        <td>{company.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <div className="row">
                <div class="input-field col s6">
                  <input
                    value={state.salary}
                    onChange={updateState}
                    placeholder="Salary"
                    id="salary"
                    type="number"
                    class="validate"
                  />
                  <a
                    className="btn"
                    onClick={() => {
                      props.updateUser({
                        _id: props.user._id,
                        salary: state.salary
                      });
                    }}
                  >
                    Update
                  </a>
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
        {value == 0 ? (
          <div class="modal-footer absolute-bottom">
            <button
              className="waves-effect waves-light btn-small save"
              onClick={saveSalary}
            >
              <i class="material-icons"></i>Issue Salary
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
        ) : null}
      </div>
    </div>
  );
};

const mapDispatchtoProps = dispatch => {
  return {
    fetchSalaries: userID => {
      return middleware.fetchSalaries(userID);
    },
    updateUser: data => {
      dispatch(middleware.createUser(data));
    },
    createSalary: data => {
      dispatch(middleware.createSalary(data));
    }
  };
};

export default connect(store => {
  return {
    data: { ...store.userReducer, ...store.areaReducers }
  };
}, mapDispatchtoProps)(AddUser);
