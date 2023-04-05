const express = require('express');
const mysql = require('mysql2');
const config = require('./config/config');
const bodyParser = require('body-parser');
const cors =require('cors')

const app = express();
const PORT = 5020;
const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
});

const tAppRoutes = require('./routes/tAppRoutes')(db);
const tmoduleRouter = require('./routes/tModuleRoutes')(db);
const tPageRoutes = require('./routes/tPageRoutes')(db);
// Routes
app.use('/applications', tAppRoutes);
app.use('/module', tmoduleRouter);
app.use('/page', tPageRoutes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});




// // Insert a new module record associated with application 1
// const newModule = { CodeModule: '36', NomModule: 'Declaration ', tApplication_IdApplication: 14 };
// db.query('INSERT INTO tmodule SET ?', newModule, (error, results, fields) => {
//   if (error) throw error;
//   console.log(`Inserted module record with ID ${results.insertId}`);
// });

// // Retrieve all module records for application 1
// db.query('SELECT * FROM tmodule WHERE tApplication_IdApplication = ?', [14], (error, results, fields) => {
//   if (error) throw error;
//   console.log(`Found ${results.length} module records for application 14`);
// });
