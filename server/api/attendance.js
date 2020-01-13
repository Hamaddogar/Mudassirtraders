const Attendance = require('../db/models/attendance');

module.exports = {
    api_getAll(args) {

        var args = args || {};

        return new Promise((c, e) => {

            this.get(args, function (err, products) {

                if (err) {
                    e(err);
                } else {
                    c(products);
                }

            });

        });

    },
    get(args, cb) {

        return Attendance.find(args, cb);

    },
    markAttendance(data, cb) {

        if (data._id) {

            data.lastUpdated = new Date()
            Attendance.findByIdAndUpdate(data._id, data, { new: true }).exec(cb);

        } else {


            let newAttendance = new Attendance(data);
            // newArea.lastUpdated = new Date().toDateString;
            newAttendance.save(cb);

        }


    },
    removeAttendance(id, cb) {

        return Attendance.findOneAndRemove({ id: id }, cb);

    }
}