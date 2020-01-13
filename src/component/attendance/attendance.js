import { connect } from "react-redux";
import middleware from '../../store/Middleware/attendance';
import utilities from '../../utlities';
import './attendance.css';
import AutoComplete from '../autocompletion/autocompletion';
import React from 'react';
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import { toast } from "react-toastify";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: "simple-tab-" + index,
        'aria-controls': "simple-tabpanel-" + index,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

class Attendance extends React.Component {

    state = {
        searched: [],
        selectedUser:{},
        attendance: [],
        tabNo: 0,
        month: (new Date()).getMonth() - 1
        // attendance: this.props.data.attendanceReducer
    }

    handleChange = (event, newValue) => {

        this.setState({
            tabNo: newValue
        });
        // setValue(newValue);
    };

    fetchUserAttendance = (args) => {

        fetch('/api/attendance/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // date: newDate.getDate(),
                user: args.selectedUser || this.state.selectedUser._id,
                month: args.month || this.state.month,
                // year: newDate.getFullYear()
            })
        }).then((resp) => resp.json()).then((resp) => {
            this.setState({ searched: resp });
        })


    }

    componentDidMount = () => {

        // window.$(this.refs.attendanceDatePicker).datepicker({
        //     onSelect: (date) => {

        //         this.fetchUserAttendance({
        //             date: date,
        //             user: this.state.user._id
        //         });

        //     }
        // });

    }

    componentWillUpdate = (newProps, oldProps) => {

        console.log(20);
        this.state.attendance = newProps.data.attendance;

    }
    constructor(props) {
        super();

        this.state.users = props.data.users;


        let newDate = new Date();

        fetch('/api/attendance/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: newDate.getDate(),
                month: newDate.getMonth(),
                year: newDate.getFullYear()
            })
        }
        ).then((resp) => resp.json()).then((attendance) => {

            this.setState({
                attendance: attendance
            });

        });

    }
    markAttendance = (evt) => {

        // let userID = evt.target.value;
        let date = new Date();

        if (this.state.attendance.find((attendance) => {
            return attendance.user == evt.target.value;
        })) {
            return toast.warn("ATTENDANCE ALREADY MARKED");
        }

        this.props.markAttendance({
            time: date.toLocaleTimeString(),
            user: evt.target.value,
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        })


    }
    updateState = () => {


    }
    render() {

        let date = new Date();
        let daysInMonth = new Date(this.state.month, date.getFullYear(), 0).getDate()

        let isWorkingDay = this.props.data.store.offdays.indexOf(utilities.time.getDayName(date)) == -1

        return <section className="app-section">
            {/* <AddSales visible={addingSales} showAddSales={showAddSales} /> */}
            <div className="label-head">
                <img src="/images/label-head.png" />
                <h4>Attendance</h4>
            </div>

            <AppBar position="static">
                <Tabs value={this.state.tabNo} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="TODAY's ATTENDANCE" {...a11yProps(0)} />
                    <Tab label="DETAILED REPORT" {...a11yProps(1)} />
                    {/* <Tab label="Payroll" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>

            <TabPanel value={this.state.tabNo} index={0}>

                {isWorkingDay ?
                    <>
                        <div className="row">

                            <div class="input-field col s6">

                                <AutoComplete property="fullName"
                                    onChange={(evt, user) => {
                                        user && this.markAttendance({
                                            target: {
                                                id: "user",
                                                value: user._id
                                            }
                                        });
                                    }}
                                    data={
                                        this.props.data.users
                                    } placeholder="Select Users" />
                            </div>

                        </div>


                        <table>
                            <thead>
                                <tr>
                                    <th>SR.</th>
                                    <th>NAME</th>
                                    <th>ENTRANCE TIME</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.data.users.map((user, i) => {

                                    let attendance = this.state.attendance.find((attendance) => {
                                        return attendance.user == user._id
                                    })

                                    return <tr>
                                        <td><b>{(i + 1)}</b></td>
                                        <td>{user.fullName}</td>
                                        <td>{(attendance || {}).time}</td>
                                        <td>{((user) => {

                                            return attendance ? <div className="mAttendance_P">PRESENT</div> : <div className="mAttendance_A">ABSENT</div>

                                        })(user)}</td>

                                    </tr>
                                })}

                            </tbody>
                        </table>

                    </>
                    : <img src="/images/holiday-icon.png" className="def-absolute-center" />}

            </TabPanel>

            <TabPanel value={this.state.tabNo} index={1}>

                <div className="row">

                    <div class="input-field col s3">

                        <AutoComplete property="fullName"
                            onChange={(evt, user) => {
                                this.setState({
                                    selectedUser: user
                                });
                                if (this.state.month) {
                                    this.fetchUserAttendance({selectedUser:user});
                                }
                            }}
                            data={
                                this.props.data.users
                            } placeholder="Search User" />
                    </div>

                    <div class="input-field col s6">

                        <FormControl className="white-back" style={{ minWidth: 250 }}>
                            <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.month}
                                onChange={(evt, data) => {
                                    // debugge/r;
                                    this.setState({ month: evt.target.value });

                                    if (this.state.selectedUser) {
                                        this.fetchUserAttendance({month: evt.target.value});
                                    }

                                }}
                            >
                                <MenuItem value={0}>Janaury</MenuItem>
                                <MenuItem value={1}>February</MenuItem>
                                <MenuItem value={2}>March</MenuItem>
                                <MenuItem value={3}>April</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>May</MenuItem>
                                <MenuItem value={5}>June</MenuItem>
                                <MenuItem value={6}>July</MenuItem>
                                <MenuItem value={7}>August</MenuItem>
                                <MenuItem value={8}>September</MenuItem>
                                <MenuItem value={9}>October</MenuItem>
                                <MenuItem value={10}>November</MenuItem>
                                <MenuItem value={11}>December</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                </div>


                <table>
                    <thead>
                        <tr>
                            {/* <th>SR.</th> */}
                            <th>DATE</th>
                            <th>ENTRANCE TIME</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>

                        {utilities.getRange(1, daysInMonth).map((date, i) => {

                            let attendance = this.state.searched.find((attendance) => {
                                return attendance.date == date && attendance.user == this.state.selectedUser._id;
                            })

                            return <tr>
                                {/* <td><b>{(i + 1)}</b></td> */}
                                <td>{date}</td>
                                <td>{(attendance || {}).time}</td>
                                <td>{(() => {

                                    return attendance ? <div className="mAttendance_P">PRESENT</div> : <div className="mAttendance_A">ABSENT</div>

                                })()}</td>
                            </tr>
                        })}

                    </tbody>
                </table>

            </TabPanel>

        </section>

    }

}


export default connect((store) => {
    return {
        data: {
            ...store.storeReducer,
            ...store.userReducer,
            ...store.attendanceReducer
        }
    }
}, (dispatch) => {

    return {
        markAttendance: (data) => {

            dispatch(middleware.markAttendance(data));

        }
    }

})(Attendance);