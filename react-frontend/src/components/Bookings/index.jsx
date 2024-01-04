import { useEffect, useState } from "react";
import instance from "../../../axiosConfig";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [Id, setId] = useState('')
  const [showCancelModal, setShowCancelModal] = useState(false);

  function handleCancelModalOpen(id) {
    setId(id);
    setShowCancelModal(true)
  }
  function handleCancelModalClose() {
    setShowCancelModal(false)
  }

  const CancelEvent = ({booking , handleClose}) => {
    async function cancelBooking(){
      try {
        const res = await instance({
          data: {
            query: `mutation { 
              cancelBooking( bookingId : "${booking}"),
            {
              _id
            }
            }`,
          }
        })
      } catch (error) {
        throw new Error(error)
      }
    }
    return (
      <div className="fixed bg-slate-950 bg-opacity-30 min-h-screen inset-0 backdrop-blur-sm flex justify-center items-center">
        <div className="w-fit bg-white rounded p-2">
          <button
            type="button"
            onClick={handleClose}
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center float-right"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="p-6 pt-0 text-center">
            <svg
              class="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">
              Are you sure you want to delete this booking?
            </h3>
            <button
              onClick={cancelBooking}
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={handleClose}
              class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    async function getAllBookings() {
      const res = await instance({
        data: {
          query: `
              query {
                bookings {
                  _id,
                  createdAt,
                  numberofSeats,
                  event{
                    title,
                    date
                  }
                }
              }`,
        },
      });
      setBookings(res.data.data.bookings);
    }
    getAllBookings();
  }, []);

  const EmptyScreen = () => {
    return (
      <div className="flex justify-center inset-0 items-center">
        No Bookings to see.
      </div>
    );
  };
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            {showCancelModal && <CancelEvent booking={Id} handleClose={handleCancelModalClose}/>}
            {bookings.length === 0 ? (
              <>
                <EmptyScreen />
              </>
            ) : (
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Event Title
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Date of Event
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings &&
                    bookings.map((booking) => {
                      return (
                        <tr class="border-b">
                          <td class="whitespace-nowrap px-6 py-4">
                            {booking.event.title}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {booking.event.date}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            <button
                              onClick={handleCancelModalOpen(booking._id)}
                              class="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                            >
                              Cancel Booking
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
