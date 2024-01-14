import { ErrorMessage, Field } from "formik";
import { hotelFacilities } from "../../dummy/hotelOptions";

const FacilitiesSection = ({}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            htmlFor={facility}
            className="text-sm flex gap-1 text-gray-700"
          >
            <Field
              type="checkbox"
              name="facilities"
              id={facility}
              value={facility}
            />
            {facility}
          </label>
        ))}
      </div>
      <ErrorMessage
        className="text-red-500"
        name="facilities"
        component="div"
      />
    </>
  );
};

export default FacilitiesSection;
