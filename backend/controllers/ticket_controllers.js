const Ticket = require("../models/ticket");
const User = require("../models/user");

module.exports.tickets_post = async (req, res) => {
  let user_id = req.params.id;

  let newTicket = new Ticket({
    route: req.body.route,
    date: Date.parse(req.body.date),
    time: req.body.time,
    amount: req.body.amount,
    user: user_id
  });

  await newTicket.save((err) => {

    try {
      res.status(200).json(newTicket);
    }
    catch (err) {
      res.status(500).json({
        failedToUpdate: "Failed to generate ticket!",
      });
    };
  });
};

//fetch all tickets booked by a user
module.exports.tickets_get = async (req, res) => {
  const user_id = req.params.id;
  try {
    const tickets = await Ticket.find({ user: user_id });
    if (tickets.length > 0) {
      res.json({ tickets });
    } else {
      res.json({ message: "No tickets booked by user!" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid request!" })
  }

};

//fetch specific ticket
module.exports.tickets_getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findById({
      _id: id,
    });
    if (ticket) {
      res.json({ ticket });
    } else {
      res.json({ message: "Ticket does not exist!!" });
    }

  } catch (error) {
    res.status(401).json({ error: "Invalid entry!!!" })
  }
};

//delete ticket
module.exports.tickets_del = async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id,
    });
    res.status(204).send();
  } catch {
    res.status(404);
    res.json({
      error: "Ticket doesn't exist!",
    });
  }
};
