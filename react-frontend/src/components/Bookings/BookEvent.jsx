import { useFormik } from "formik";
import { bookingSchema } from "../../schemas/bookSchema";
import ErrorMsg from "../Error/ErrorMsg";
import ErrorIcon from "../Error/ErrorIcon";
import instance from "../../../axiosConfig";

function BookEvent({ handleClose, eventId }) {
    const {
        values,
        errors,
        touched,
        isSubmitting,
        resetForm,
        handleBlur,
        handleChange,
        handleSubmit,
      } = useFormik({
        initialValues: {
          eventId: eventId,
          userId: localStorage.getItem("userId"),
          numberofSeats: 0
        },
        validationSchema: bookingSchema,
        onSubmit: async () => {
          try {
            const res = await instance({
              data: {
                query: `mutation { 
                  bookEvent( bookingInput: { eventId : "${eventId}", userId : "${localStorage.getItem("userId")}", numberofSeats: ${values.numberofSeats}}),
                {
                  _id,
                  event{
                    title
                  }
                }
                }`,
              }
            })
            resetForm()
            handleClose()
          } catch (error) {
            throw new Error(error)
          }
        },
      });
      return (
        <div className="fixed bg-slate-950 bg-opacity-30 inset-0 backdrop-blur-sm flex justify-center items-center">
          <div className="w-1/2 bg-white rounded p-2">
            <h1 className="text-center font-bold w-fit tex-xl mx-4 text-gray-700">
              Event Name
            </h1>
            <button
              type="button"
              onClick={handleClose}
              className="bg-white float-right rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="py-8  sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div className="mt-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-5  text-gray-700"
                  >
                    No. of seats
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="numberofSeats"
                      name="numberofSeats"
                      placeholder="0"
                      type="number"
                      onChange={handleChange}
                      value={values.numberofSeats}
                      onBlur={handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                  {errors.title && touched.title && (
                    <ErrorMsg message={errors.name} />
                  )}
                </div>
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Book
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default BookEvent