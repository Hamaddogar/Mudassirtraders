import React, { useRef, useState, useEffect } from 'react';
import utlities from '../../utlities';
import './addPayment.css'

const PaymentDetails = (props) => {


    let [payment, setPayment] = useState({ amount: 0 });

    // useEffect(() => {
    //     // setPayment({});
    //     console.log(props)
    // })

    return <div className="add-payment">
        <div class="modal-overlay" style={{ 'z-index': 1002, 'display': props.visible ? 'block' : 'none', opacity: 0.5 }}></div>
        <div id="modal1" class="modal" style={{ 'display': props.visible ? 'block' : 'none' }}>
            <div class="modal-content">
                <div className="sub-head">Payment Details {props.customer ? " for " + props.customer : ""}</div>
                <table>
                    <thead>
                        <tr>
                            <td>Sr.</td>
                            <td>Date</td>
                            <td>Cash/Cheque</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.payments.length ? props.payments.map((payment, index) => {

                                return <tr>
                                    <td>{(index + 1)}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.type}</td>
                                    <td>{payment.amount}</td>
                                </tr>

                            }):null
                        }
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">

                <div className="row">

                    <div className="col s8">

                        <div class="input-field col s12">

                            <div className="row">

                                <div className="col s10">

                                    <input value={payment.amount} placeholder="Amount" onChange={(evt) => {
                                        setPayment({ type: payment.type || "", amount: evt.target.value });

                                    }} id="deliveryDate" type="number" id="paymentAmtBox" />

                                </div>

                                <div className="col s2">


                                    <select value={payment.type} className="inline wd-70" onChange={(evt) => {
                                        setPayment({ type: evt.target.value, amount: payment.amount || 0 });
                                    }} id="paymentType">
                                        <option key="Type" value="Type">Type</option>
                                        <option key="Cash" value="Cash">Cash</option>
                                        <option key="Cheque" value="Cheque">Cheque</option>
                                    </select>

                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="col s4">
                        <button className={"waves-effect waves-light btn-small save" + ((!payment.type || payment.type == "Type") ? " disabled" : "")} onClick={() => {
                            // payment.paymentID = utlities.getID();
                            payment.date = new Date().toDateString();
                            setPayment({ amount: 0, type:"Type" });
                            props.onPaymentAdded(payment);
                        }}><i class="material-icons"></i>Add Payment</button>
                        <button className="waves-effect waves-light btn-small cancel" onClick={() => {
                            props.onCancel(false)
                        }}><i class="material-icons"></i>Cancel</button>
                    </div>

                </div>

            </div>
        </div>
    </div >

}

export default PaymentDetails;