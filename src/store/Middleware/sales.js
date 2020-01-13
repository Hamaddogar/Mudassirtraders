import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  getEditSale(data) {
    return dispatch => {
      dispatch({
        type: "GET_EDIT_SALE",
        payload: data
      });
    };
  },
  deleteSale(id) {
    return dispatch => {
      fetch("/api/sales/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(sale => {
          if (sale._id) {
            dispatch({
              type: "SALE_DELETED",
              payload: sale
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
      fetch("/api/sales/toggleState", {
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
              type: "SALE_UPDATED"
            });
            toast.success(messages.area.created);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },
  statusChange(data) {
    // let newData = data.status == "pending" ? "deliverd":"pending"
    return dispatch => {
      fetch("/api/sales/toggleStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(sale => {
          if (sale._id) {
            dispatch({
              type: "SALE_STATUS_UPDATED",
              payload: sale
            });
            toast.success(messages.area.created);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },
  createSale(data) {
    return dispatch => {
      fetch("/api/sales/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(sale => {
          console.log(sale);
          if (data._id) {
            dispatch({
              type: "SALE_UPDATED",
              payload: sale
            });
            toast.error(messages.sales.updated);
          } else {
            dispatch({
              type: "SALE_CREATED",
              payload: sale
            });
            toast.success(messages.sales.saved);
          }
        });
    };
  }
};
