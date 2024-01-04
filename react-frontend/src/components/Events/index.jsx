import { useState, useEffect } from "react";
import EventCard from "../EventCard";
import CreateEvent from "./CreateEvent";
import BookEvent from "../Bookings/BookEvent";
import instance from "../../../axiosConfig";

const dummyData = [
  {
    title: "Product A",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 29.99,
    seatsRemaining: 100,
    date: "2023-01-05",
  },
  {
    title: "Item XYZ",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 49.95,
    seatsRemaining: 100,
    date: "2023-02-12",
  },
  {
    title: "Gadget X",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 99.5,
    seatsRemaining: 100,
    date: "2023-03-20",
  },
  {
    title: "Fashionable Accessory",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 39.5,
    seatsRemaining: 100,
    date: "2024-07-01",
  },
  {
    title: "Tech Innovation",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 299.99,
    seatsRemaining: 100,
    date: "2024-08-09",
  },
  {
    title: "Tech Innovation 2",
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Voluptatibus quia, nulla! Maiores et perferendis eaque,
    exercitationem praesentium nihil.`,
    price: 299.99,
    seatsRemaining: 100,
    date: "2024-08-09",
  },
];

function Events() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);
  let data = dummyData;
  useEffect(() => {
    async function getAllEvents() {
      const res = await instance({
        data: {
          query: `
              query {
                events {
                  title,_id,
                  description,price,imageUrl,date
                }
              }`,
        },
      });
      setEvents(res.data.data.events);
    }
    getAllEvents();
  }, []);
  const handleCreateClose = () => {
    setShowCreateModal(false);
  };
  const handleCreateOpen = () => {
    setShowCreateModal(true);
  };
  const handleOpenBookModal = (id) => {
    setEventId(id);
    setShowBookModal(true);
  };
  const handleCloseBookModal = () => {
    setShowBookModal(false);
  };
  const EmptyScreen = () => {
    return (
      <div className="min-h-screen inset-0 flex justify-center items-center">
        No events to see.
      </div>
    );
  };
  return (
    <>
      {showCreateModal && <CreateEvent handleClose={handleCreateClose} />}
      <button
        onClick={handleCreateOpen}
        class="bg-blue-500 m-5 mr-8 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Create an Event
      </button>
      {events.length === 0 ? (
        <EmptyScreen />
      ) : (
        <>
          {showBookModal && (
            <BookEvent handleClose={handleCloseBookModal} eventId={eventId} />
          )}

          <div class="flex flex-wrap gap-5 justify-around ml-10 mt-20">
            {events.map((event) => {
              return (
                <EventCard
                  event={event}
                  id={event._id}
                  handleOpen={handleOpenBookModal}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Events;
