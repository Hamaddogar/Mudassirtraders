import utlities from "../../utlities";

let initialData = {
  salaryRecord: [],
  users: [
    // {
    //     fullName: "Ahmed Ali",
    //     code: "EMP1",
    //     email: "khurram@panacloud.com",
    //     phone: "0300-889922",
    //     locations: [],
    //     date: (new Date()).toLocaleDateString(),
    //     status: "ACTIVATED",
    //     areas:"Colony Road, Sitara Colony, Sabzi Mandi, Main Bazar, Rajana Road"
    // },
    // {
    //     fullName: "Ahmed Ali",
    //     code: "EMP2",
    //     email: "khurram@panacloud.com",
    //     phone: "0300-889922",
    //     locations: [],
    //     date: (new Date()).toLocaleDateString(),
    //     status: "ACTIVATED",
    //     areas:"Colony Road, Sitara Colony, Sabzi Mandi, Main Bazar, Rajana Road"
    // },
    // {
    //     fullName: "Ahmed Ali",
    //     code: "EMP3",
    //     email: "khurram@panacloud.com",
    //     phone: "0300-889922",
    //     locations: [],
    //     date: (new Date()).toLocaleDateString(),
    //     status: "ACTIVATED",
    //     areas:"Colony Road, Sitara Colony, Sabzi Mandi, Main Bazar, Rajana Road"
    // },
    // {
    //     fullName: "Ahmed Ali",
    //     code: "EMP4",
    //     email: "khurram@panacloud.com",
    //     phone: "0300-889922",
    //     locations: [],
    //     date: (new Date()).toLocaleDateString(),
    //     status: "ACTIVATED",
    //     areas:"Colony Road, Sitara Colony, Sabzi Mandi, Main Bazar, Rajana Road"
    // }
  ]
};

export default (state = initialData, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "SALARY_RECORD_LOADED":
      newState.salaryRecord = action.payload;
      break;

    case "persist/REHYDRATE":
      action.payload && (newState.users = action.payload.userReducer.users);
      break;

    case "USERS_LOADED":
      newState.users = action.payload;
      break;

    case "USER_UPDATED":
      let target = newState[action.model].find(item => {
        return item._id == action.payload._id;
      });
      newState[action.model][newState[action.model].indexOf(target)] =
        action.payload;
      break;

    case "USER_CREATED":
      newState.users.push(action.payload);
      break;
    case "USER_DELETED":
      let newUser = Object.assign({}, newState, {
        sales: newState.users.filter(user => {
          console.log(action.payload);
          return user._id != action.payload._id;
        })
      });
      return newUser;
      break;
    case "USERS_STATUS_UPDATED":
      newState.users.forEach(user => {
        if (user._id == action.payload._id) {
          user.status = action.payload.status;
          return false;
        }
      });
      break;
  }

  newState.userCode = utlities.getID("USER", "code", newState.users);

  return newState;
};
