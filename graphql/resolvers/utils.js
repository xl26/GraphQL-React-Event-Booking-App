const Event = require("../../models/event");
const User = require("../../models/users");

const { dateToString } = require("../../helpers/date");

// for nested events to be fetched from userId -> created Events for each user - this wil return an array of events
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return cleanEvent(event);
    });
  } catch (error) {
    throw new Error(error);
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return cleanEvent(event);
  } catch (error) {
    throw new Error(error);
  }
};

// to get the details of the user that created an event : more granular fetch
const user = async (userId) => {
  try {
    const res = await User.findById(userId);
    return {
      ...res._doc,
      _id: res.id,
      // events.bind - to avaoid infinite loop of user -> events -> createdBy -> user
      createdEvents: events.bind(this, res._doc.createdEvents),
    };
  } catch (error) {
    throw new Error(error);
  }
};

const cleanBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    event: singleEvent.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const cleanEvent = (event) => {
  return {
    ...event._doc,
    _id: event._doc._id,
    date: dateToString(event._doc.date),
    createdBy: user.bind(this, event._doc.createdBy),
  };
};


exports.cleanEvent = cleanEvent;
//exports.events = events;
exports.cleanBooking = cleanBooking;