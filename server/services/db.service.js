const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
module.exports.dbName = "TaskSystem";

module.exports.connectToDB = async () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(url);

    client.connect((err) => {
      if (err) {
        reject(err);
      }
      resolve(client);
    });
  });
};
