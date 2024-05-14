// const express = require('express');
// const mysql = require('mysql2');
// const app = express();

// const connnection = mysql.createConnection({
//   host: 'localhost',
//   database: 'rnmqlcrud',
//   user: 'root',
// });

// connnection.connect(function (error) {
//   if (error) {
//     console.log('there is a problem');
//   }
//   console.log('database connected....');

//   const sql = 'select * from crud';
//   connnection.query(sql, function (error, results, fields) {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log(results);
//   });
// });

// app.get('/user', (req, res) => {
//   try {
//     const data = 'select * from crud';

//     connnection.query(data, function (error, result) {
//       console.log(result, 'shahriar');
//       if (!error) {
//         res.status(200).send(result);
//       } else {
//         console.log(error, 'shahriar');
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete('/user/:id', (req, res) => {
//   const userId = req.params.id;
//   const deleteQuery = `DELETE FROM crud WHERE id = ${userId}`;

//   connnection.query(deleteQuery, (error, result) => {
//     if (error) {
//       console.error('Error deleting user:', error);
//       res.status(500).send('Error deleting user');
//     } else {
//       console.log('User deleted successfully');
//       res.status(200).send('User deleted successfully');
//     }
//   });
// });

// app.post('/user/update/:id', (req, res) => {
//     const userId = req.params.id;
//     const { name, position, salary } = req.body; // Assuming you're sending the updated data in the request body

//     const updateQuery = `UPDATE crud SET name=?, position=?, salary=? WHERE id=?`;
//     const values = [name, position, salary, userId];

//     connection.query(updateQuery, values, (error, result) => {
//       if (error) {
//         console.error('Error updating user:', error);
//         res.status(500).send('Error updating user');
//       } else {
//         console.log('User updated successfully');
//         res.status(200).send('User updated successfully');
//       }
//     });
//   });

// app.get('/', (req, res) => {
//   res.send('server is connected...');
// });

// app.listen(5000, () => {
//   console.log('server is connected at 5000');
// });

// ----------------------------------------------------------

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'rnmqlcrud',
});

app.use(express.json());
app.use(cors());

// ------------------------get data---------------------
app.get('/user', (req, res) => {
  const query = 'select * from crud';

  database.query(query, (err, data) => {
    if (err) {
      res.json(err);
    }
    return res.json(data);
  });
});

// --------------------------insert data------------------------

app.post('/user', (req, res) => {
  const query = 'INSERT INTO crud (name, position, salary) VALUES (?, ?, ?)';
  const values = [req.body.name, req.body.position, req.body.salary];
  database.query(query, values, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json('Added successfully');
      console.log('Added successfully');
    }
  });
});

// --------------------------------delete user------------------------

app.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = 'Delete from crud where id=?';

  database.query(query, id, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json('deleted successfully...');
    }
  });
});

// --------------------------------update --------------------------

app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const query = "UPDATE crud SET name=?, position=?, salary=? WHERE id=?";
  const values = [req.body.name, req.body.position, req.body.salary, id];

  database.query(query, values, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(8000, () => {
  console.log('server is running....');
});
