let express = require('express');
let server = express();
let bd = require('body-parser');
// let cors = require('cors');
let User = require('./db/users');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('config');
server.use(bd.json());
server.use(bd.urlencoded());

let companyController = require('./controllers/company');
let companyAPI = require('./api/company');

let categoryController = require('./controllers/category');
let categoryAPI = require('./api/category');

let supplierController = require('./controllers/supplier');
let customerController = require('./controllers/customer');
let customerAPI = require('./api/customer');


let productController = require('./controllers/product');
let productAPI = require('./api/product');

let areaController = require('./controllers/area');
let userController = require('./controllers/user');

let salesController = require('./controllers/sale');
let salesAPI = require('./api/sale');

let storeController = require('./controllers/store');

let purchaseController = require('./controllers/purchase');
let purchasesAPI = require('./api/purchase');

let storeAPI = require('./api/store');

let expenseController = require('./controllers/expenses');
let expensesAPI = require('./api/expense');

let attendanceController = require('./controllers/attendance');

server.use('/api/expenses', expenseController);

server.use('/api/companies', companyController);
server.use('/api/suppliers', supplierController);
let suppliersAPI = require('./api/supplier');

server.use('/api/customers', customerController);
server.use('/api/products', productController);

server.use('/api/areas', areaController);
let areaAPI = require('./api/area');

server.use('/api/users', userController);
let userAPI = require('./api/user');


server.use('/api/sales', salesController);
server.use('/api/purchases', purchaseController);

server.use('/api/attendance', attendanceController);
let attendanceAPI = require('./api/attendance');


server.use('/api/categories', categoryController);
server.use('/api/store', storeController);

server.post('/login', (req, res) => {

  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({
      msg: 'fill all required field'
    });
  }
  User.findOne({ email }).then(user => {
    // if (user) return res.status(400).json({ msg: 'User already exist' });

    if (user) {

      jwt.sign(
        { id: user.id },
        'jwtSecret',
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          let date = new Date();


          Promise.all([
            companyAPI.api_getAll(), 
            categoryAPI.api_getAll(),
            productAPI.api_getAll(),
            areaAPI.api_getAll(),
            customerAPI.api_getAll(),
            salesAPI.api_getAll(),
            suppliersAPI.api_getAll(),
            userAPI.api_getAll(),
            purchasesAPI.api_getAll(),
            expensesAPI.api_getAll(),
            storeAPI.get(),
            attendanceAPI.api_getAll({
              date:date.getDate(),
              month:date.getMonth(),
              year:date.getFullYear()
            })
          ]).then((data) => {

            console.log(data);
            res.json({
              token,
              data: {
                companies: data[0],
                categories: data[1], 
                products: data[2], 
                areas: data[3],
                customers: data[4],
                sales: data[5] ,
                suppliers: data[6], 
                users: data[7], 
                mypurchases: data[8], 
                expenses: data[9],
                store:data[10],
                attendance:data[11]
              },
              user: {
                id: user.id,
                username: user.username,
                number: user.number,
                email: user.email
              },
              success: true
            });

          })







        }
      );

    } else {

      const newUser = new User({
        //username,
        password,
        email,
        // number
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              { id: user.id },
              'jwtSecret',
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    username: user.username,
                    number: user.number,
                    email: user.email
                  },
                  success: true
                });

              }
            );
          });
        });
      });

    }
  });

});
const port = process.env.PORT || 9000;

server.use(express.static('./build'));

server.use((err, req, res, next)=>{

  console.log(err.message); 

})

server.listen(port, function () {
  console.log('server started on 9000');
});