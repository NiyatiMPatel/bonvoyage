import { Formik, Form, FormikHelpers } from "formik"; //FormikHelpers
import * as Yup from "yup";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

const ManageHotelForm = ({ data, onSave, isPending }: ManageHotelFormProps) => {
  console.log("ManageHotelForm ~ data:", data?.data?.data);
  const initialValues: HotelFormData = {
    name: "",
    city: "",
    country: "",
    description: "",
    type: "",
    pricePerNight: 0,
    starRating: 1,
    facilities: [],
    adultCount: 0,
    childCount: 0,
    imageFiles: {} as FileList,
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
    adultCount: Yup.number()
      .min(0, "Number of adults must be a non-negative number")
      .required("Number of adults is required"),
    childCount: Yup.number()
      .min(0, "Number of children must be a non-negative number")
      .required("Number of children is required"),
    imageFiles: Yup.mixed()
      .test(
        "Image length",
        "Please select at least 1 and up to 6 images",
        (value) =>
          value instanceof FileList &&
          Object.keys(value).length > 0 &&
          Object.keys(value).length <= 6
      )
      .required("Images are required"),
  });

  const submitHandler = async (
    formDataJson: HotelFormData,
    { resetForm }: FormikHelpers<HotelFormData>
  ) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      console.log("formDataJson.imageFiles.forEach ~ imageFile:", imageFile);
      formData.append(`imageFiles`, imageFile);
    });

    console.log("ManageHotelForm ~ formDataJson:", formDataJson);

    console.log("ManageHotelForm ~ formData:", formData);

    onSave(formData);
    Object.keys(data?.data?.data).length > 0 && resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {() => (
        <Form encType="multipart/form-data">
          {/* Add other sections as needed */}
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <span className="flex justify-end my-2">
            <button
              disabled={isPending}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default ManageHotelForm;
