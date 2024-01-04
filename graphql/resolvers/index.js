const bookingResolver = require('./bookings');
const eventResolver = require('./events');
const authresolver = require('./auth')

const rootResolver = {
  ...authresolver,
  ...bookingResolver,
  ...eventResolver
}

module.exports = rootResolver;
