export default {
  getRange(start, end) {
    if (start === end) return [start];
    return [start, ...this.getRange(start + 1, end)];
  },
  time: {
    getDayName(date) {
      // var a = new Date();
      var weekdays = new Array(7);
      weekdays[0] = "Sunday";
      weekdays[1] = "Monday";
      weekdays[2] = "Tuesday";
      weekdays[3] = "Wednesday";
      weekdays[4] = "Thursday";
      weekdays[5] = "Friday";
      weekdays[6] = "Saturday";
      return weekdays[date.getDay()];
    },
    getMonthDays(month) {
      const monthsDays = {
        January: 31,
        March: 31,
        May: 31,
        July: 31,
        August: 31,
        October: 31,
        December: 31,
        February: 28,
        April: 30,
        June: 31,
        September: 30,
        November: 30
      };

      return monthsDays[month];
    },
    getMonthFromName(monthName) {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ].indexOf(monthName);
    },

    getMonthName() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      const d = new Date();
      return monthNames[d.getMonth()];
    }
  },

  getID(suffix, prop, myList, noSuffix) {
    let lastItem = myList[myList.length - 1];

    if (!lastItem) {
      return (noSuffix ? "" : suffix + "_") + "0";
    }

    // if(!lastItem[prop]){
    //     debugger;
    // }

    if (lastItem[prop] == undefined) {
      debugger;
    }

    let lastNumber = lastItem[prop]
      .toString()
      .match(/(\d)+/g)[0]
      .replace(/0/g, "");
    return (noSuffix ? "" : suffix + "_") + (+lastNumber + 1);
  }
};
