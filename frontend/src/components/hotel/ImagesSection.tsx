const ImagesSection = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
        />
      </div>
    </>
  );
};

export default ImagesSection;
