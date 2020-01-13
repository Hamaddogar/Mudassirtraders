import history from '../../historyProvider';
import messages from '../../message';
import { toast  } from 'react-toastify';


export default {
    /// Needs Customer ID and desired state
    toggleCategoryState(data) {        

        return (dispatch) => {

            fetch('/api/categories/toggleState', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((company) => {

                    if(company._id){
                        dispatch({
                            type:'CATEGORY_STATUS_UPDATED'
                        });
                        toast.success(messages.categories.created);
                    }else{
                        toast.error(messages.categories.error.cannotCreate);
                    }

                 });

        }

    },
    deleteCategory(id) {
        return dispatch => {
          fetch("/api/categories/delete/" + id, {
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
                  type: "CATEGORY_DELETED",
                  payload: sale
                });
                toast.success(messages.area.created);
              } else {
                toast.error(messages.area.error.cannotCreate);
              }
            });
        };
      },
    createCategory(data) {

        return (dispatch) => {


            fetch('/api/categories/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((company) => {

                    if(company._id){
                        dispatch({
                            type:data._id ? 'CATEGORY_UPDATED' : 'CATEGORY_CREATED',
                            payload:company,
                            model:'categories'
                        });
                        toast.success(messages.categories[data._id ? 'updated' : 'created']);
                    }else{
                        toast.error(messages.categories.error.cannotCreate);
                    }

                 });

        }

    }

}