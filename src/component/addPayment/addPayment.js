import React, {useRef, useState} from 'react';  
import './addPayment.css'

const AddPayment = (props) => {


    let [payment, setPayment] = useState(0);    

    return <div className="payment-adder">
        <div class="modal-overlay" style={{'z-index': 1002, 'display':props.visible ? 'block' :'none', opacity: 0.5}}></div>
        <div id="modal1" class="modal" style={{'display':props.visible ? 'block' :'none'}}>
        <div class="modal-content">
            <div className="sub-head">Add Payment</div>
           <div className="text-center">

            <select className="inline">
                <option>Cash</option>
                <option>Cheque</option>
            </select>
            
            <input value={payment} onChange={(evt)=>{
                setPayment(evt.target.value);
            }} type="number"/>

           {/* <a ref={paymentSelector} onClick={toggleMenu} class='dropdown-trigger btn' data-target='paymentOptions'>Drop Me!</a>
           <ul id="paymentOptions" class='dropdown-content'>         
            <li><a href="#!"><i class="material-icons">view_module</i>Cash</a></li>
            <li><a href="#!"><i class="material-icons">cloud</i>Cheque</a></li>
        </ul> */}
                
           </div>
        </div>
        <div class="modal-footer">            
            <button className="waves-effect waves-light btn-small save" onClick={()=>{
                props.onPaymentAdded(payment);
            }}><i class="material-icons"></i>Save</button>
            <button className="waves-effect waves-light btn-small cancel" onClick={()=>{
                props.toggleMenu(false) 
            }}><i class="material-icons"></i>Cancel</button>
        </div>
    </div>
</div>

}

export default AddPayment;