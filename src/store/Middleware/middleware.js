// import {signup} from './../Action/actionCreater'
import * as actionCreater from './../Action/actionCreater'
import { store } from './../store';
import history from '../../historyProvider';

export const middlewaresignup = (data) => {
  console.log(data)
  return dispatch => {
    // return dispatch(actionCreater.login(data))
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        localStorage.setItem('token', resp.token);
         debugger;
        
        console.log("this is  data" ,resp.data)
        debugger;
        dispatch(actionCreater.login(resp));
        if (resp.user.id) {
          debugger;
           if(resp.user.companies !=undefined)
           {
          store.dispatch({
            type: 'COMPANIES_LOADED',
            payload: resp.data.companies
          });
        }

          store.dispatch({
            type: 'CATEGORIES_LOADED',
            payload: resp.data.categories
          });

          store.dispatch({
            type: 'ATTENDANCE_LOADED',
            payload: resp.data.attendance
          });

          store.dispatch({
            type: 'PRODUCTS_LOADED',
            payload: resp.data.products
          });

          store.dispatch({
            type: 'AREAS_LOADED',
            payload: resp.data.areas
          });


          store.dispatch({
            type: 'SUPPLIERS_LOADED',
            payload: resp.data.suppliers
          });

          store.dispatch({
            type: 'CUSTOMERS_LOADED',
            payload: resp.data.customers
          });

          store.dispatch({
            type: 'PURCHASES_LOADED',
            payload: resp.data.mypurchases
          });
          
          store.dispatch({
            type: 'EXPENSES_LOADED',
            payload: resp.data.expenses
          });

          store.dispatch({
            type: 'SALES_LOADED',
            payload: resp.data.sales
          });


          store.dispatch({
            type: 'USERS_LOADED',
            payload: resp.data.users
          });

          
          store.dispatch({
            type: 'STORE_LOADED',
            payload: resp.data.store
          });

          history.push('/dashboard');
          console.log("User was found");

        } else {
          console.log("User did npt found");
        }
      });
  };

}
export const middlewareLogin = (data) => {
  console.log(data)
  return dispatch => {
    // return dispatch(signup(data))
  }
}