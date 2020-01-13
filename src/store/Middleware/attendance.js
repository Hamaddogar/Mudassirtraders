import history from '../../historyProvider';
import messages from '../../message';
import { toast  } from 'react-toastify';


export default {
    markAttendance(data) {

        return (dispatch) => {


            fetch('/api/attendance/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    return resp.json();
                }).then((attendance) => {

                    if(attendance._id){
                        dispatch({
                            type:data._id ? 'ATTENDANCE_UPDATED' : 'ATTENDANCE_CREATED',
                            payload:attendance,
                            model:'categories'
                        });
                        toast.success(messages.attendance[data._id ? 'updated' : 'created']);
                    }else{
                        toast.error(messages.attendance.error.cannotCreate);
                    }

                 });

        }

    }

}