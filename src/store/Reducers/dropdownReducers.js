let initialData = {
    loadedMenu:[],
    MainMenuItemNames:{
         home:'Home',
         accounts:'Accounts',
         sales:'Sales',
         Purchase:'Purchase',
         reporting:'Reporting',
         setting:'Setting',
         recovery:'Recovery',
         Expires:'Expires',
         Expenses:'Expenses',
         salary:'salary',
         profit:'Profit/Loss',
         return:'Return',
         stock:'Stock'
    },
    nestedItem: ['item1','item3'],
    accounts:[
        {name:'Supliers', hint:'', icon:'images/supplier.png', link:'/accounts/suppliers' },
        {name:'Customers Ledges', hint:'', icon:'images/customerledgers.png', link:'/accounts/customersledgers'}],
    reporting:[
        {name:'Attendance', hint:'', icon:'images/attendance.png', link:'/attendance'},
        {name:'Sales', hint:'', icon:'images/sale.png', link:'/reporting/sales'},
        {name:'Purchases', hint:'', icon:'images/purchases.png', link:'/reporting/purchases'},
        {name:'Closing Stock Report', hint:'', icon:'images/closingstock.png', link:'/reporting/closingstock'},
        {name:'Stock Report', hint:'', icon:'images/stockreport.png', link:'/reporting/stockreport'},
        {name:'Customers', hint:'', icon:'images/customers.png', link:'/reporting/customers'},
        {name:'Suppliers', hint:'', icon:'images/supplier-reporting.png', link:'/reporting/suppliers'},
        {name:'Delivery Reports', hint:'', icon:'images/delivery-report.png', link:'/reporting/deliveryreports'},
        {name:'Bills', hint:'', icon:'images/bills.png', link:'/reporting/bills'},
        {name:'Bills & Route Wise Summary', hint:'', icon:'images/bills-summary.png',link:'/reporting/billsummary'},
        {name:'Recoveries', hint:'', icon:'images/recovery.png', link:'/reporting/recoveries'},
        {name:'Missing Orders', hint:'', icon:'images/missing.png', link:'/reporting/missing'},
        {name:'Receovery Bills', hint:'', icon:'images/recovert-bills.png', link:'/reporting/recoverybills'}
],
    settings:[
        {name:'Store Settings', hint:'Includes Customization for your store', link:'settings/store', icon:'images/store-settings.png'},
        {name:'Password Settings', hint:'Includes Customization for your store', icon:'images/security-settings.png'},
        {name:'Users', hint:'Add, Delete and Update Users', icon:'images/user-settings.png', link:'/settings/users'},
        {name:'Customers', hint:'Manage Customers', icon:'images/customers.png', link:'/settings/customers'},
        {name:'Suppliers', hint:'Manage Suppliers', icon:'images/supplier.png', link:'/settings/suppliers'},
        {name:'Products', hint:'Manage Product Offerings', icon:'images/product-settings.png',link:'/settings/products'},
        {name:'Pricing', hint:'Manage Product Pricing', icon:'images/pricing-settings.png',link:'/settings/pricing'},
        {name:'Categories', hint:'Includes Categories Management', icon:'images/categories-settings.png',link:'/settings/categories'},
        {name:'Areas', hint:'Includes area management', icon:'images/areas-settings.png',link:'/settings/areas'},
        {name:'Companies', hint:'Includes area management', icon:'images/company-settings.png', link:'/settings/companies'}
    ]

}

const dropDown = (state = initialData, action) => {
    switch (action.type) {

        case 'SHOW_MENU':
            return {
                ...state,
                loadedMenu: state[action.payload] || []
            }

        case "persist/REHYDRATE":
            return {
                ...state
            }
    }
    return state;
}
export default dropDown;