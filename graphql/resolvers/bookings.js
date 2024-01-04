const Booking = require("../../models/bookings");
const Event = require("../../models/event");
const User = require("../../models/users");

const { cleanBooking, cleanEvent } = require("./utils");

module.exports = {
  bookings: async (args,req) => {
    try {
      const bookings = await Booking.find({ user : req.userId});
      return bookings.map((booking) => {
        return cleanBooking(booking);
      });
    } catch (error) {}
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized access");
    }
    try {
      
      const fetchEvent = await Event.findById(args.bookingInput.eventId);
      const fetchUser = await User.findById(args.bookingInput.userId);
      const booking = new Booking({
        event: fetchEvent,
        user: fetchUser,
        numberofSeats: args.bookingInput.numberofSeats,
      });
      
      fetchEvent.availability =
        fetchEvent.availability - args.bookingInput.numberofSeats;
      await fetchEvent.save();
      const res = await booking.save();
      return cleanBooking(res);
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  },
  cancelBooking: async (args, req) => {
    console.log(args)
    if (!req.isAuth) {
      throw new Error("Unauthorized access");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = cleanEvent(booking.event);
      
      
      // booking._doc can work too, but we are not using because
      // the fields of an entity in the db is available on the high level as well
      // _doc : for just the exact data with no metadata
      
      await Booking.deleteOne({ _id: args.bookingId });
      await Event.updateOne({_id:  booking.event._id }, { $inc: {availability : booking.numberofSeats}});
      return event;
    } catch (error) {
      console.log(args)
      throw new Error(error);
    }
  },
};
