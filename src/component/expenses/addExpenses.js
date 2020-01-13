import { connect } from "react-redux";
import React, { useState, useEffect, useRef } from 'react';
import utlities from '../../utlities';
import middleware from '../../store/Middleware/expenses';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <Typography
//             component="div"
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             <Box p={3}>{children}</Box>
//         </Typography>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

// import './addSupplier.css';

const AddUser = (props) => {

    let [state, setState] = useState({});

    function updateState(evt) {

        state[evt.target.id] = evt.target.value;
        setState({ ...state });

    }

    const classes = useStyles();

    const deliveryDatePicker = useRef();

    useEffect(()=>{
        
        window.$(deliveryDatePicker.current).datepicker({
            minDate: new Date() 
        });

    })

    function saveExpense() {

        state.code = props.data.expCode;
        props.createExpense(state);
    }

    return <div className="add-user">
        <div class="modal-overlay" style={{ 'z-index': 1002, 'display': 'block', opacity: 0.5 }}></div>
        <div id="modal1" class="modal modal-small" style={{ 'display': 'block', 'height': '405px' }}>
            <div class="modal-content">

                <div className="def-modal-body modal-body">

                <input className="readonly-code" placeholder="Customer Code" value={props.data.expCode} readOnly id="code" type="text" />


                    <div className="sub-head">Add Expense</div>

                    <div className={classes.root}>

                        <div className="row">

                            <div class="input-field col s12">


                                <input value={state.amount} onChange={updateState} placeholder="Amount" id="amount" type="number" class="validate" />


                            </div>

                        </div>           

                        <div className="row">

                            <div class="input-field col s12 text-center">

                                <input onChange={updateState} placeholder="Date" id="date" type="text" id="deliveryDate" ref={deliveryDatePicker} />
                            </div>
                        </div>

                                     <div class="input-field col s12">
                            <textarea onChange={updateState} placeholder="Notes" id="notes" class="white materialize-textarea"></textarea>

                        </div>


                    </div>

                </div>


            </div>
            <div class="modal-footer absolute-bottom">
                <button className="waves-effect waves-light btn-small save" onClick={saveExpense}><i class="material-icons"></i>Save Expense</button>
                <button className="waves-effect waves-light btn-small cancel" onClick={() => {
                    //props.toggleMenu(false) 
                    props.showAddUser(false)
                }}><i class="material-icons"></i>Cancel</button>
            </div>
        </div >
    </div >

};

const mapDispatchtoProps = (dispatch) => {
    return {
        createExpense: (data) => {
            dispatch(middleware.saveExpense(data));
        }
    }
}

export default connect((store) => {
    return {
        data: { ...store.expensesReducer }
    }
}, mapDispatchtoProps)(AddUser);