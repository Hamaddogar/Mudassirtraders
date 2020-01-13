import { toast  } from 'react-toastify';


const initialData = {
    supplierAccounts:[
        {  _id:3, totalPayable:4500, amountPaid:1500, date:new Date()},
        {  _id:4, totalPayable:8500, amountPaid:1500, date:new Date()},
        {  _id:5, totalPayable:2500, amountPaid:1500, date:new Date()},
        {  _id:7, totalPayable:9500, amountPaid:1500, date:new Date()},
        {  _id:8, totalPayable:7500, amountPaid:1500, date:new Date()}
    ],
    suppliers:[
        {id:1, code:'SUP00001', fullName:'', company:'NESTLE', phone:'0321-9876542',address:'lorem loremloremloremloremloremlorem lorem loremlorem lorem'},
        {id:2,code:'SUP00002', fullName:'', company:'KOLSON', phone:'',address:''},
        {id:3,code:'SUP00003', fullName:'', company:'SHANGRILA', phone:'',address:''},
        {id:4,code:'SUP00004', fullName:'', company:'YOUNG`S', phone:'',address:''},
        {id:5,code:'SUP00005', fullName:'', company:'POPULAR', phone:'',address:''},
        {id:6,code:'SUP00006', fullName:'', company:'QURSHI', phone:'',address:''},
        {id:7,code:'SUP00007', fullName:'', company:'GIGGLY', phone:'',address:''},
        {id:8,code:'SUP00008', fullName:'', company:'CANDY LAND', phone:'',address:''},
        {id:9,code:'SUP00009', fullName:'', company:'MEDICAM', phone:'',address:''},
        {id:10,code:'SUP000010', fullName:'', company:'NEELI BAAR', phone:'',address:''},
    ]
}


const dataReducer = (state = initialData, action)=>{

    let newState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case 'PAY_TO_SUPPLIER':
            //Add backend add logic in here
                newState.supplierAccounts.push(action.payload);
                // TBC move notofication code out of here
                toast.success("PAYMENT ADDED!");
        return newState;

        case 'LOAD_SUPPLIERS':

        return newState;

    }


return newState;

}

export default dataReducer;