const { connectToDB, dbName } = require("./db.service");

const taskCollectionName = "tasks";

function getUniqueId() {
  return String(new Date().getTime());
}

module.exports.addTask = async (task) => {
  return new Promise(async (resolve, reject) => {
    if (!task.name) {
      reject({
        message: "Task name is not present",
        status: 200,
        operation: "FAILED",
      });
    }
    if (task.isCompleted == null || task.isCompleted == undefined) {
      reject({
        message: "Task completion status is not present",
        status: 200,
        operation: "FAILED",
      });
    }

    let client = await connectToDB();
    const db = client.db(dbName);

    task.id = getUniqueId();

    const collection = db.collection(taskCollectionName);

    let response = await collection.insertOne(task);
    console.log("Add Task API Response", response);
    if (response.insertedCount != 1) {
      reject({
        message: "Task addition failed",
        status: 200,
        operation: "FAILED",
      });
    }

    resolve(response.ops[0]);
  });
};
module.exports.deleteTask = async (taskId) => {
  return new Promise(async (resolve, reject) => {
    if (!taskId) {
      reject({
        message: "Task id not present",
        status: 200,
        operation: "FAILED",
      });
    }

    let client = await connectToDB();
    const db = client.db(dbName);

    const collection = db.collection(taskCollectionName);
    console.log("task id to delete", taskId);
    let response = await collection.deleteOne({ id: taskId });
    console.log("task delete db operation ");
    console.log("Delete Task API Response", response);

    if (response.deletedCount != 1) {
      reject({
        message: "Task deletion failed",
        status: 200,
        operation: "FAILED",
      });
    }

    resolve(response);
  });
};
module.exports.updateTask = async (task) => {
  return new Promise(async (resolve, reject) => {
    if (!task.name) {
      reject({
        message: "Task name is not present",
        status: 200,
        operation: "FAILED",
      });
    }
    if (task.isCompleted == null || task.isCompleted == undefined) {
      reject({
        message: "Task completion status is not present",
        status: 200,
        operation: "FAILED",
      });
    }
    if (!task.id) {
      reject({
        message: "Task id is not present",
        status: 200,
        operation: "FAILED",
      });
    }

    let client = await connectToDB();
    const db = client.db(dbName);

    const collection = db.collection(taskCollectionName);
    let response = await collection.updateOne(
      { id: task.id },
      { $set: { name: task.name, isCompleted: task.isCompleted } }
    );
    console.log("Update Task DB Response", response);

    if (response.matchedCount != 1) {
      reject({
        message: "Task updation failed",
        status: 200,
        operation: "FAILED",
      });
    }

    resolve(response);
  });
};

module.exports.getTasks = async () => {
  return new Promise(async (resolve, reject) => {
    let client = await connectToDB();
    const db = client.db(dbName);
    const collection = db.collection(taskCollectionName);

    collection.find({}).toArray((err, docs) => {
      if (err) {
        reject(err);
      }
      client.close();

      resolve(docs);
    });
  });
};
