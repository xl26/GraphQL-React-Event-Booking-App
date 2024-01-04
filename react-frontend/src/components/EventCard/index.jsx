function EventCard({ event, handleOpen, id }) {
  const { title, description, price, seatsRemaining, date, imageUrl } = event;
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={imageUrl} alt="Sunset in the mountains" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Date of event: {date}
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Seats remaining : {seatsRemaining}
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: {price}
        </span>
        <button onClick={() => handleOpen(id)} class="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-extrabold text-white mr-2 mb-2">
          Book Event
        </button>
      </div>
    </div>
  );
}

export default EventCard;
