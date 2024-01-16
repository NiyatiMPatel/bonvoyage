import { ErrorMessage, useFormikContext } from "formik";

const ImagesSection = () => {
  const { setFieldValue } = useFormikContext<HotelFormData>();
  // console.log("ImagesSection ~ values:", values.imageFiles);

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          id="imageFiles"
          className="w-full text-gray-700 font-normal"
          type="file"
          name="imageFiles"
          multiple
          accept="image/*"
          onChange={(event: any) => {
            console.log("ImagesSection ~ event", event);
            const files = event.target.files;
            setFieldValue("imageFiles", files);
          }}
          // disabled={values.imageFiles.length >= 6}
        />
      </div>
      <ErrorMessage
        className="text-red-500"
        name="imageFiles"
        component="div"
      />
    </>
  );
};

export default ImagesSection;
