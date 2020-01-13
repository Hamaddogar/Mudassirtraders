// import history from '../../historyProvider';
import messages from "../../message";
import { toast } from "react-toastify";
import { connect } from "react-redux";

export default {
  /// Needs Customer ID and desired state
  deletePurchase(id) {
    debugger
    return dispatch => {
      fetch("/api/purchases/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(purchase => {
          console.log(purchase)
          debugger
          if (purchase._id) {
            dispatch({
              type: "PURCHASE_DELETED",
              payload: purchase
            });
            toast.success(messages.area.updated);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },

  toggleState(data) {
    return dispatch => {
      fetch("/api/purchase/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(company => {
          if (company._id) {
            dispatch({
              type: "PURCHASE_UPDATED"
            });
            toast.success(messages.area.created);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },
  toggleState(data) {
    return dispatch => {
      fetch("/api/purchases/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(company => {
          if (company._id) {
            dispatch({
              type: "PURCHASE_UPDATED"
            });
            toast.success(messages.purchase.updated);
          } else {
            toast.error(messages.purchase.error.cannotCreate);
          }
        });
    };
  },
  createPurchase(data) {
    return dispatch => {
      fetch("/api/purchases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(purchase => {
          if (data._id) {
            dispatch({
              type: "PURCHASE_UPDATED",
              payload: purchase
            });
            toast.error(messages.sales.updated);
          } else {
            dispatch({
              type: "PURCHASE_CREATED",
              payload: purchase
            });
            toast.success(messages.sales.saved);
          }
        });
    };
  }
};
