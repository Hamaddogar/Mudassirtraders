import utlities from "../../utlities";

let initialData = {
    expenses: [
        // {_id:1,code:'COMP_1', name:'Category 1', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:2,code:'COMP_2', name:'Category 2', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:3,code:'COMP_3', name:'Category 3', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:4,code:'COMP_4', name:'Category 4', address:'some code in here too now again there is some', phone:'0231-2345678'},
        // {_id:5,code:'COMP_5', name:'Category 5', address:'some code in here too now again there is some', phone:'0231-2345678'},
    ]
};


export default (state = initialData, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'persist/REHYDRATE':
            action.payload && (newState.expenses = action.payload.expensesReducer.expenses || []);
            break;

        case 'EXPENSES_LOADED':
            newState.expenses = action.payload;
            break;

        case 'EXPENSE_CREATED':
            newState.expenses.push(action.payload);
            break;

    }

    newState.expCode = utlities.getID("EXP", "code", newState.expenses);


    return newState;

}
