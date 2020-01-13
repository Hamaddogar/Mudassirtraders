import utlities from "../../utlities";


let initialData = {
    suppliers: [
        // { _id: 3, code: "SUPPL1", totalPayable: 4500, amountPaid: 1500, date: new Date() },
        // { _id: 4, code: "SUPPL2", totalPayable: 8500, amountPaid: 1500, date: new Date() },
        // { _id: 5, code: "SUPPL3", totalPayable: 2500, amountPaid: 1500, date: new Date() },
        // { _id: 7, code: "SUPPL4", totalPayable: 9500, amountPaid: 1500, date: new Date() },
        // { _id: 8, code: "SUPPL5", totalPayable: 7500, amountPaid: 1500, date: new Date() }
    ]
};


export default (state = initialData, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'persist/REHYDRATE':
            action.payload && (newState.suppliers = action.payload.supplierReducer.suppliers);
            break;

        case 'SUPPLIERS_LOADED':
            newState.suppliers = action.payload;
            break;
        case "SUPPLIER_DELETED":
            let newData = Object.assign({}, newState,{
                suppliers:newState.suppliers.filter((supplier)=>{
                  return supplier._id != action.payload._id
                })
              })
            console.log('re',newData)
            return newData
        case 'SUPPLIER_UPDATED':
            let target = newState[action.model].find((item)=>{
                    return item._id == action.payload._id;
            })
            newState[action.model][newState[action.model].indexOf(target)] = action.payload;
            break

        case 'SUPPLIER_CREATED':
            newState.suppliers.push(action.payload);
            break;

        case 'SUPPLIER_STATUS_UPDATED':
            newState.suppliers.forEach((supplier) => {

                if (supplier._id == action.payload._id) {
                    supplier.status = action.payload.status;
                    return false;
                }

            });
            break;



    }

    newState.supplierCode = utlities.getID("SUPPL","code", newState.suppliers);


    return newState;

}