import { useFormik } from "formik";
import { eventSchema } from "../../schemas/eventSchema";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import instance from "../../../axiosConfig";
import ErrorIcon from "../Error/ErrorIcon";
import ErrorMsg from "../Error/ErrorMsg";

function CreateEvent({ handleClose }) {
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/event-banners/${imageUpload + v4()}`);
    const res = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(res.ref);
    return url;
  };

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
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      availability: 0,
      date: new Date().toISOString(),
    },
    validationSchema: eventSchema,
    onSubmit: async () => {
      try {
        const url = await uploadImage();
        const res = await instance({
          data: {
            query: `mutation{
                createEvent(eventInput: {title: "${values.title}", description: "${values.description}", price: ${values.price}, date: "${values.date}", availability:${values.availability}, imageUrl: "${url}"}),
                {
                  title
                }
              }`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          alert("Event Created!");
          resetForm();
          handleClose();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  });
  return (
    <div className="fixed bg-slate-950 bg-opacity-30 min-h-screen inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="w-3/4 bg-white rounded p-2">
        <h1 className="text-center font-bold w-fit tex-xl mx-4 text-gray-700">
          Create an event
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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
                Title
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  onChange={handleChange}
                  value={values.title}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.title && touched.title && <ErrorIcon />}
              </div>
              {errors.title && touched.title && (
                <ErrorMsg message={errors.title} />
              )}
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Description
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  value={values.description}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.description && touched.description && <ErrorIcon />}
              </div>
              {errors.description && touched.description && (
                <ErrorMsg message={errors.description} />
              )}
            </div>
            <div className="mt-6">
              <label
                class="block mb-2 text-sm font-medium text-black dark:text-gray-900"
                for="file_input"
              >
                Upload event banner
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={(event) => setImageUpload(event.target.files[0])}
              />
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <div className="mt-6">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Price
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="price"
                  name="price"
                  type="number"
                  onChange={handleChange}
                  value={values.price}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.price && touched.price && <ErrorIcon />}
              </div>
              {errors.price && touched.price && (
                <ErrorMsg message={errors.price} />
              )}
            </div>
            <div className="mt-6">
              <label
                htmlFor="availability"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Availability
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="availability"
                  name="availability"
                  type="number"
                  onChange={handleChange}
                  value={values.availability}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.availability && touched.availability && <ErrorIcon />}
              </div>
              {errors.availability && touched.availability && (
                <ErrorMsg message={errors.availability} />
              )}
            </div>
            <div className="mt-6">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Date
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="date"
                  name="date"
                  type="date"
                  onChange={handleChange}
                  value={values.date}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.date && touched.date && <ErrorIcon />}
              </div>
              {errors.date && touched.date && (
                <ErrorMsg message={errors.date} />
              )}
            </div>
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
