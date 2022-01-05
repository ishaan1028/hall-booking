# Hall-Booking-API

1. Get all rooms with booked data - /rooms/all

2. Get all customers with booked data - /rooms/customers

3. Create room (POST) with body - /rooms/create

{
"numberOfSeats":2,
"amenities":["WiFi,TV,AC"],
"pricePerHour":600
}

4. Booking a room (POST) with body - /rooms/book

{
"customerName": "John",
"date": "5-1-2022",
"startTime": "1.30",
"finishTime":"2",
"roomId":5
}
