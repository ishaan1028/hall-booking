const route = require("express").Router();
const roomsService = require("../services/rooms.service");

// create new room
route.post("/create", roomsService.createRoom);

// get all rooms
route.get("/all", roomsService.getAllRooms);

// get all customers
route.get("/customers", roomsService.getAllCustomers);

// book a room
route.post("/book", roomsService.bookRoom);

module.exports = route;