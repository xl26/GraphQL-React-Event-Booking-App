const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    availabilty: Int!
    imageUrl: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
}
type User {
    _id: ID!
    email: String!
    password: String,
    createdEvents: [Event!]
}
type Booking {
    _id: ID!
    event: Event!
    user: User!
    numberofSeats: Int!
    createdAt: String!
    updatedAt: String!
}
type Auth {
    userId: ID!,
    token: String!,
    tokenExpiration: Int!
}
input BookingInput {
    eventId: String!,
    userId: String!,
    numberofSeats: Int!
}
input UserInput {
    name: String!
    email: String!
    password: String!
}
input EventInput {
    title: String!
    description: String!
    imageUrl: String!
    price: Float!
    date: String!
    availability: Int!
}
type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): Auth!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput ): User
    bookEvent(bookingInput: BookingInput): Booking!
    cancelBooking(bookingId: String!): Event!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)