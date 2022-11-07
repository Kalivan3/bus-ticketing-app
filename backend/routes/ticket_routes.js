const express = require("express");
const router = express.Router();
const passport = require('passport');
const ticketRoute = require("../controllers/ticket_controllers");

router.post("/:username/:id/book-ticket", passport.authenticate('jwt',{session:false}), ticketRoute.tickets_post); //booking a ticket

router.get("/:username/:id/tickets/all", passport.authenticate('jwt',{session:false}), ticketRoute.tickets_get); //getting all booked tickets

router.get("/ticket/:id", passport.authenticate('jwt',{session:false}), ticketRoute.tickets_getOne); //getting one ticket

router.delete("/ticket/:id", passport.authenticate('jwt',{session:false}), ticketRoute.tickets_del); //deleting a ticket

module.exports = router;