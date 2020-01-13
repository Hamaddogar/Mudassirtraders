import utlities from '../../utlities';

let initialData = {
    purchases: [
        // { _id: 1, area: "a1", customer: { name: "c1" }, data: new Date(), deliveryDate: new Date(), notes: "" },
        // { _id: 2, area: "a2", customer: { name: "c2" }, data: new Date(), deliveryDate: new Date(), notes: "" },
        // { _id: 3, area: "a3", customer: { name: "c3" }, data: new Date(), deliveryDate: new Date(), notes: "" },
        // { _id: 4, area: "a4", customer: { name: "c4" }, data: new Date(), deliveryDate: new Date(), notes: "" },
        // { _id: 5, area: "a5", customer: { name: "c5" }, data: new Date(), deliveryDate: new Date(), notes: "" },
    ]
};

export default (state = initialData, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case 'persist/REHYDRATE':
            action.payload && (newState.purchases = action.payload.purchaseReducer.purchases || []);
            break;

        case 'PURCHASES_LOADED':
            newState.purchases = action.payload;
            break;

        case 'PURCHASE_CREATED':
            newState.purchases.push(action.payload);
            break;
            case "PURCHASE_DELETED":
                let newsale = Object.assign({}, newState, {
                    purchases: newState.purchases.filter(purchase => {
                    console.log(action.payload);
                    return purchase._id != action.payload._id;
                  })
                });
                return newsale;
                break;
                case "PURCHASE_UPDATED":
                    let updatedpurchase = Object.assign({}, newState, {
                      sales: newState.purchases.map(purchase => {
                        console.log(action.payload);
                        debugger;
                        return purchase._id == action.payload._id
                          ? (purchase = action.payload)
                          : purchase;
                      })
                    });
                    console.log(updatedpurchase);
                    return updatedpurchase


    }

    newState.purchaseCode = utlities.getID("PUR", "billNo", newState.purchases, true);

    return newState;

}
