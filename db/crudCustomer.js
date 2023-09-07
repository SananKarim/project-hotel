// CRUD operations module

const User = require("../model/customerRegister");
const { connectToDatabase } = require("./db");

const getById = async (Id) => {
  try {
    connectToDatabase();
    const result = await User.findById();
    console.log(result);
    closeDatabaseConnection();
    return result;
  } catch (error) {
    console.log(error);
    closeDatabaseConnection();
    return error;
  }
};

const write = async (data) => {
  try {
    connectToDatabase();
    console.log(data);
    const result = await User.create(data);
    console.log(result, "this is result section");
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const update = async (id, updateData) => {
  try {
    connectToDatabase();
    const result = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const list = async () => {
  try {
    connectToDatabase();
    const results = await User.find();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getByEmail = async (email) => {
  try {
    connectToDatabase();
    const result = await User.findOne({ email });
    console.log(result, "testing email in db email function");
    return result;
  } catch (error) {
    console.error(error, "in getByEmailAndRole function");
    throw error;
  }
};

module.exports = {
  getById,
  write,
  update,
  list,
  getByEmail,
};
