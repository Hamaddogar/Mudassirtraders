let attendance = {
    attendance: []
};


export default (state = attendance, action) => {

    let newState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case 'ATTENDANCE_LOADED':
                newState.attendance = action.payload;
            break;
        
        case 'ATTENDANCE_CREATED':
                newState.attendance.push(action.payload);
            break;


    }

    return newState;

}