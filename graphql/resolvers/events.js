const Event = require("../../models/event");
const User = require("../../models/users");

const { cleanEvent } = require('./utils')

module.exports = {
  events: async () => {
    // populate : fetch all the addata of the ref object in the createdBy object .populate('createdBy')
    try {
      const events = await Event.find();
      return events.map((event) => {
        return cleanEvent(event);
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  createEvent: async (args, req) => {
    if(!req.isAuth)
    {
      throw new Error('Unauthorized access')
    }
    console.log(args.eventInput)
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      imageUrl: args.eventInput.imageUrl,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      availability: args.eventInput.availability,
      createdBy: req.userId,
    });
    try {
      const result = await event.save();
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User doesnt exist.");
      } else {
        user.createdEvents.push({
          ...result._doc,
          _id: result._doc._id.toString(),
        });
        await user.save();
      }
      return cleanEvent(result);
    } catch (error) {
      throw error;
    }
  },
};
