import utlities from "../../utlities";


let initialData = {
    // salaryRecord:[],
    store: {offdays:[]}
};


export default (state = initialData, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'NEW_STORE_CREATED':
        case 'STORE_UPDATED':
        case 'STORE_LOADED':
            newState.store = action.payload || {offdays:[]};
            break;


        case 'persist/REHYDRATE':
            action.payload && (newState.store = action.payload.storeReducer.store || {offdays:[]});          
            break;
  
    }

    return newState;

}