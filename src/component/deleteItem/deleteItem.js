import React, {useRef, useState} from 'react';  
// import './addPayment.css'

const DeletePrompt = (props) => {


    let [payment, setPayment] = useState(0);    

    return <div className="delete-payment">
        <div class="modal-overlay" style={{'z-index': 1002, 'display':props.visible ? 'block' :'none', opacity: 0.5}}></div>
        <div id="modal1" class="modal" style={{'display':props.visible ? 'block' :'none'}}>
        <div class="modal-content">
            <div className="sub-head">{props.title}</div>
           <div className="text-center"> 
           {props.description}
           </div>
        </div>
        <div class="modal-footer">            
            <button className="waves-effect waves-light btn-small save" onClick={()=>{
                props.onYes(payment);
            }}><i class="material-icons"></i>Confirm</button>
            <button className="waves-effect waves-light btn-small cancel" onClick={()=>{
                props.onCancel(false) 
            }}><i class="material-icons"></i>Cancel</button>
        </div>
    </div>
</div>

}

export default DeletePrompt;