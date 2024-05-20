import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    //production URI
    await mongoose.connect("mongodb://localhost:27017/ttday");

    await Room.deleteMany();
    console.log("Data deleted successfully");

    await Room.insertMany(rooms);
    console.log("Data inserted successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
