const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = 'example';

// MongoClient.connect(url, (err, client) => {
//   assert.equal(err, null);

//   console.log('Connected correctly to server');

//   const db = client.db(dbname);
//   const collection = db.collection('uzair');
//   //   collection.insertOne(
//   //     { name: 'Uthappizza', description: 'test' },
//   //     (err, result) => {
//   //       assert.equal(err, null);

//   //       console.log('After Insert:\n');
//   //       console.log(result.ops);

//   //       collection.find({}).toArray((err, docs) => {
//   //         assert.equal(err, null);

//   //         console.log('Found:\n');
//   //         console.log(docs);

//   //         db.dropCollection('uzair', (err, result) => {
//   //           assert.equal(err, null);

//   //           client.close();
//   //         });
//   //       });
//   //     }
//   //   );
//   dboper.insertDocument(
//     db,
//     { name: 'Vadonut', description: 'Test' },
//     'uzair',
//     (result) => {
//       console.log('Insert Document:\n', result.ops);

//       dboper.findDocuments(db, 'uzair', (docs) => {
//         console.log('Found Documents:\n', docs);

//         dboper.updateDocument(
//           db,
//           { name: 'Vadonut' },
//           { description: 'Updated Test' },
//           'uzair',
//           (result) => {
//             console.log('Updated Document:\n', result.result);

//             dboper.findDocuments(db, 'uzair', (docs) => {
//               console.log('Found Updated Documents:\n', docs);

//               db.dropCollection('uzair', (result) => {
//                 console.log('Dropped Collection: ', result);

//                 client.close();
//               });
//             });
//           }
//         );
//       });
//     }
//   );
// });

// With Promise
MongoClient.connect(url)
  .then((client) => {
    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper
      .insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'uzair')
      .then((result) => {
        console.log('Insert Document:\n', result.ops);

        return dboper.findDocuments(db, 'uzair');
      })
      .then((docs) => {
        console.log('Found Documents:\n', docs);

        return dboper.updateDocument(
          db,
          { name: 'Vadonut' },
          { description: 'Updated Test' },
          'uzair'
        );
      })
      .then((result) => {
        console.log('Updated Document:\n', result.result);

        return dboper.findDocuments(db, 'uzair');
      })
      .then((docs) => {
        console.log('Found Updated Documents:\n', docs);

        return db.dropCollection('uzair');
      })
      .then((result) => {
        console.log('Dropped Collection: ', result);

        return client.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
