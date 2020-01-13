import utlities from "../../utlities";

let initialData = {
    companies: [
        // {_id:1,code:'COMP_1', name:'Nestle', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:2,code:'COMP_2', name:'Kolson', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:3,code:'COMP_3', name:'Candy Land', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:4,code:'COMP_4', name:'product 4', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:5,code:'COMP_5', name:'product 5', address:'some code in here too now again there is some', phone:'0231-2345678'},
    ]
};


export default (state = initialData, action) => {

     console.log("this is initialData",initialData)
     console.log("this is state",state)
     console.log("this is Aaction",action.payload)



    debugger;
    let newState = JSON.parse(JSON.stringify(state));
    debugger;
    switch (action.type) {
       
        case 'persist/REHYDRATE':
            action.payload && (newState.companies = action.payload.companyReducers.companies);
            break;
        case 'COMPANIES_LOADED':
            debugger;
            newState.companies = action.payload.data.companies;
            break;

        case 'COMPANY_UPDATED':
            let target = newState[action.model].find((item) => {
                return item._id == action.payload._id;
            })
            newState[action.model][newState[action.model].indexOf(target)] = action.payload;
            break;

        case 'COMPANY_CREATED':
            newState.companies.push(action.payload);
            break;

        // case 'COMPANY_STATUS_UPDATED':
        //     newState.companies.forEach((company) => {

        //         if (company._id == action.payload._id) {
        //             company.status = action.payload.status;
        //             return false;
        //         }

        //     });
        //     break;



    }

    newState.code = utlities.getID("COMP","code", newState.companies);


    return newState;

}
