import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

const ManageHotelForm = () => {
  const emptyFileList = new DataTransfer().files;
  console.log("ManageHotelForm ~ emptyFileList:", emptyFileList);
  const initialValues: HotelFormData = {
    name: "",
    city: "",
    country: "",
    description: "",
    type: "",
    pricePerNight: 0,
    starRating: 1,
    facilities: [],
    imageFiles: emptyFileList,
    imageUrls: [],
    adultCount: 0,
    childCount: 0,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Type is required"),
    pricePerNight: Yup.number()
      .min(0, "Price must be a positive number")
      .required("Price is required"),
    starRating: Yup.string()
      .min(1, "Rating must be a positive number")
      .max(5, "Rating must be between 0 and 5")
      .required("Rating is required"),
    facilities: Yup.array()
      .of(Yup.string())
      .min(1, "At least one facility is required")
      .required("Facilities are required"),

    // imageFiles: Yup.mixed()
    //   .test({
    //     name: "fileCount",
    //     message: "At least one and at most six images are required",
    //     test: function (value) {
    //       if (value instanceof FileList) {
    //         return value.length > 0 && value.length <= 6;
    //       }
    //       return false;
    //     },
    //   })
    //   .required("Image is required")
    //   .test({
    //     name: "fileType",
    //     message: "Invalid file type. Only images are allowed.",
    //     test: function (value) {
    //       if (value instanceof FileList) {
    //         const allowedFileTypes = [
    //           "image/jpeg",
    //           "image/png",
    //           "image/gif",
    //           "image/bmp",
    //         ]; // Add more if needed
    //         for (let i = 0; i < value.length; i++) {
    //           if (!allowedFileTypes.includes(value[i].type)) {
    //             return false;
    //           }
    //         }
    //         return true;
    //       }
    //       return false;
    //     },
    //   }),
    adultCount: Yup.number()
      .min(0, "Number of adults must be a non-negative number")
      .required("Number of adults is required"),
    childCount: Yup.number()
      .min(0, "Number of children must be a non-negative number")
      .required("Number of children is required"),
  });

  const submitHandler = async (
    formData: HotelFormData,
    { resetForm }: FormikHelpers<HotelFormData>
  ) => {
    console.log("ManageHotelForm ~ values:", formData);
    // CREATE NEW FORMDATA OBJECT AND ALL ADD-HOTEL API
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Add other sections as needed */}
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <span className="flex justify-end my-2">
            <button
              // disabled={isSubmitting}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default ManageHotelForm;
