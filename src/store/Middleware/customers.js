import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  toggleCustomerState(data) {
    return dispatch => {
      fetch("/api/customers/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(customer => {
          if (customer._id) {
            dispatch({
              type: "CUSTOMER_STATUS_UPDATED"
            });
            toast.success(messages.customers.customerCreated);
          } else {
            toast.error(messages.customers.error.cannotCreate);
          }
        });
    };
  },

  deleteCustomer(data) {
    console.log(data);
    return dispatch => {
      fetch("/api/customers/deleteCustomer" + data, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(customer => {
          if (customer._id) {
            dispatch({
              type: "CUSTOMER_DELETED",
              payload: customer
            });

            toast.success(messages.customers.deleted);
          } else {
            toast.error(messages.customers.error.cannotCreate);
          }
        });
    };
  },
  createCustomer(data) {
    return dispatch => {
      fetch("/api/customers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(customer => {
          console.log("middle", customer);
          if (customer._id) {
            dispatch({
              type: data._id ? "CUSTOMER_UPDATED" : "CUSTOMER_CREATED",
              payload: customer,
              model: "customers"
            });
            toast.success(messages.customers[data._id ? "updated" : "created"]);
          } else {
            toast.error(messages.customers.error.cannotCreate);
          }
        });
    };
  }
};
