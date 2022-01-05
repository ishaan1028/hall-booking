
const path = require("path");
const fs = require("fs");

const roomDataFile = path.join(__dirname, "../data/room.json");
let roomData = JSON.parse(fs.readFileSync(roomDataFile, 'utf8'));

console.log("roomDataFile", roomDataFile);
console.log("roomData", roomData);

const bookingsFile = path.join(__dirname, "../data/bookings.json");
let bookings = JSON.parse(fs.readFileSync(bookingsFile, 'utf8'));

module.exports = {
    createRoom(req, res) {
        roomData.push({ ...req.body, ...{ "id": "room" + (roomData.length + 1) } });
        fs.writeFileSync(roomDataFile, JSON.stringify(roomData));
        res.send({
            message: "Room created successfully"
        });
    },
    bookRoom(req, res) {

        let flag = 0;
        bookings.forEach((booking) => {
            let bookStart = parseFloat(booking.startTime);
            let reqStart = parseFloat(req.body.startTime);
            let bookFinish = parseFloat(booking.finishTime);
            let reqFinish = parseFloat(req.body.finishTime);

            if (booking.roomId === req.body.roomId && booking.date === req.body.date &&
                ((reqStart >= bookStart && reqStart < bookFinish) || (reqFinish <= bookFinish && reqFinish > bookStart))) {
                flag = 1;
            }

        });

        if (flag) {
            res.send({
                message: "Room already booked for the given date and time"
            });
        }
        else {
            bookings.push({ ...req.body, ...{ "id": "booking" + (bookings.length + 1) } });
            fs.writeFileSync(bookingsFile, JSON.stringify(bookings));

            res.send({
                message: "Room booked successfully"
            });
        }

    },
    getAllRooms(req, res) {
        let roomBooked = bookings.map((booking) => ({ ...booking, ...{ "isBooked": "yes" } }))

        let roomUnBooked = roomData.map((room) => ({ "roomId": room.id, "isBooked": "No" }))
            .filter((room) => (!bookings.some(booking => booking["roomId"] == room["roomId"])));

        let resData = [...roomUnBooked, ...roomBooked];
        res.send(resData);
    },
    getAllCustomers(req, res) {
        res.send(bookings);
    }
}

