import messages from "../../message";
import { toast } from "react-toastify";

export default {
  updateStore(data) {
    return dispatch => {
      fetch("/api/store/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(resp => {
          return resp.json();
        })
        .then(updatedStore => {
          console.log("udateSupllier", updatedStore);
          // if (data._id) {
          dispatch({
            type: data._id ? "NEW_STORE_CREATED" : "STORE_UPDATED",
            payload: updatedStore
          });
          toast.success(messages.store[data._id ? "updated" : "created"]);
          // } else {
          //     toast.error(messages.store.error.cannotCreate);
          // }
        });
    };
  }
};
