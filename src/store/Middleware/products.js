import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";

export default {
  /// Needs Customer ID and desired state
  toggleProductState(data) {
    debugger
    return dispatch => {
      fetch("/api/products/toggleState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(product => {
          if (product._id) {
            dispatch({
              type: "PRODUCT_UPDATED",
              payload: product,
            });
            toast.success(messages.products.created);
          } else {
            toast.error(messages.products.error.cannotCreate);
          }
        });
    };
  },
  createProduct(data) {
    return dispatch => {
      fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(product => {
          console.log("Peoduct Midd", product);
          if (product._id) {
            dispatch({
              type: data._id ? "PRODUCT_UPDATED" : "PRODUCT_CREATED",
              payload: product,
              model: "products"
            });
            toast.success(messages.products[data._id ? "updated" : "created"]);
          } else {
            toast.error(messages.products.error.cannotCreate);
          }
        });
    };
  },
  deleteProduct(id) {
    return dispatch => {
      fetch("/api/products/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(product => {
            debugger
          if (product._id) {
            dispatch({
              type: "PRODUCT_DELETED",
              payload: product
            });
            toast.success(messages.area.created);
          } else {
            toast.error(messages.area.error.cannotCreate);
          }
        });
    };
  },
};
