import history from '../../historyProvider';
import messages from '../../message';
import { toast } from 'react-toastify';


export default {
    /// Needs Customer ID and desired state
    fetchExpenses(userID) {

        return fetch('/api/expenses/get' + userID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

            // body: JSON.stringify(data)
        })
            .then(resp => {
                return resp.json();
            })

    },
    saveExpense(data) {

        return (dispatch) => {

            fetch('/api/expenses/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((expense) => {

                    if (expense._id) {
                        dispatch({
                            type: 'EXPENSE_CREATED',
                            payload:expense
                        });
                        toast.success(messages.expenses.created);
                    } else {
                        toast.error(messages.expenses.error.cannotCreate);
                    }

                });

        }


    }

}