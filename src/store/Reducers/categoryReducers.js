import utlities from "../../utlities";

let initialData = {
    categories: [
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
            action.payload && (newState.categories = action.payload.categoryReducers.categories);
            break;

        case 'CATEGORY_UPDATED':
            let target = newState[action.model].find((item) => {
                return item._id == action.payload._id;
            })
            newState[action.model][newState[action.model].indexOf(target)] = action.payload;
            break;

            case "CATEGORY_DELETED":
                let newproduct = Object.assign({}, newState, {
                    categories: newState.categories.filter(product => {
                    console.log(action.payload);
                    return product._id != action.payload._id;
                  })
                });
                return newproduct;
        case 'CATEGORIES_LOADED':
            newState.categories = action.payload;
            break;

        case 'CATEGORY_CREATED':
            newState.categories.push(action.payload);
            break;

        case 'CATEGORIES_STATUS_UPDATED':
            newState.categories.forEach((category) => {

                if (category.__id == action.payload.__id) {
                    category.status = action.payload.status;
                    return false;
                }

            });
            break;



    }

    newState.categCode = utlities.getID("CATEG", "code", newState.categories);


    return newState;

}
