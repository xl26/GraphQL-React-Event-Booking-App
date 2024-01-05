# Event Booking Application

This React application is a demonstration of React Router, Tailwind CSS, and Firebase integration for image storage. The primary purpose of this app is to facilitate event creation and booking for specific dates. The backend is developed using Node.js and GraphQL.

## Features

- **Event Management**: Users can create, view, and book events for specific dates.
- **Image Storage**: Utilizes Firebase for storing event-related images.
- **Backend API**: Built with Node.js and GraphQL for efficient data handling.

## About GraphQL Integration

This application showcases the power of GraphQL for managing the backend API. GraphQL offers:

- **Efficient Queries**: Enables clients to request only the needed data, reducing over-fetching.
- **Single Endpoint**: Provides a single endpoint for multiple data operations, optimizing network requests.
- **Strongly Typed Schema**: Defines a clear schema for data models, enhancing development and reducing errors.

## Caveats and Setup

- **Firebase and MongoDB Credentials**: Users intending to fork this repository need Firebase and MongoDB credentials.
  - Add these credentials to the root directory and the frontend folder.

## Note on Authentication

This project prioritizes showcasing the usage of GraphQL and backend functionalities. Frontend authentication has not been implemented as a primary feature.

## Usage

### Getting Started

1. **Firebase Setup**: Obtain Firebase credentials and add them to the root directory and the frontend folder.
2. **MongoDB Configuration**: Ensure MongoDB credentials are available for backend functionalities.
3. **Dependencies Installation**: Run `npm install` to install necessary dependencies.
4. **Backend Server**: Start the backend server using `npm start` in the main directory.
5. **Launch Frontend**: Start the frontend application using `npm start` in the frontend directory.

## Contribution

Contributions to improve GraphQL implementations, enhance backend functionalities, or improve overall application features are encouraged. Please follow standard guidelines for contributions and create pull requests.

## License

This repository and its contents are licensed under the [MIT License](LICENSE).
