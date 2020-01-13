import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  toggleSupplierState(data) {
    return dispatch => {
      fetch("/api/suppliers/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(supplier => {
          if (supplier._id) {
            dispatch({
              type: "SUPPLIER_STATUS_UPDATED"
            });
            toast.success(messages.suppliers.updated);
          } else {
            toast.error(messages.suppliers.error.cannotCreate);
          }
        });
    };
  },
  createSupplier(data) {
    return dispatch => {
      fetch("/api/suppliers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(supplier => {
          if (supplier._id) {
            dispatch({
              type: data._id ? "SUPPLIER_UPDATED" : "SUPPLIER_CREATED",
              payload: supplier,
              model: "suppliers"
            });
            toast.success(messages.suppliers[data._id ? "updated" : "created"]);
          } else {
            toast.error(messages.suppliers.error.cannotCreate);
          }
        });
    };
  },
  deleteSupplier(data) {
    console.log(data);
    return dispatch => {
      fetch("/api/suppliers/delete" + data, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(supplier => {
          if (supplier._id) {
            dispatch({
              type: "SUPPLIER_DELETED",
              payload: supplier
            });

            toast.success(messages.suppliers.created);
          } else {
            toast.error(messages.suppliers.error.cannotCreate);
          }
        });
    };
  }
};
