const express = require("express")
const cors = require("cors")

const roomsRoute = require("./routes/rooms.route");
const morgan = require("morgan");

const port = process.env.PORT || 3001

const app = express();

app.use(morgan("common"));

app.use("/", express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/rooms", roomsRoute);

app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port)
})

