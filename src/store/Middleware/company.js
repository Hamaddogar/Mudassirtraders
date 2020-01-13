import history from '../../historyProvider';
import messages from '../../message';
import { toast  } from 'react-toastify';


export default {
    /// Needs Customer ID and desired state
    // toggleCompanyState(data) {        

    //     return (dispatch) => {

    //         fetch('/api/companies/toggleState', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //             .then(resp => {
    //                 return resp.json();
    //             }).then((company) => {

    //                 if(company._id){
    //                     dispatch({
    //                         type:'COMPANY_STATUS_UPDATED'
    //                     });
    //                     toast.success(messages.company.created);
    //                 }else{
    //                     toast.error(messages.company.error.cannotCreate);
    //                 }

    //              });

    //     }

    // },
    createCompany(data) {

        return (dispatch) => {


            fetch('/api/companies/create', {
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
                            type: data._id ? 'COMPANY_UPDATED' : 'COMPANY_CREATED',
                            payload:company,
                            model:'companies'
                        });
                        toast.success(messages.company[data._id ? 'updated' : 'created']);
                    }else{
                        toast.error(messages.company.error.cannotCreate);
                    }

                 });

        }

    }

}