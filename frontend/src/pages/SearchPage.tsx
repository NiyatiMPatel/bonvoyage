import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import * as apiClient from "../axios/api-client";
import { useQuery } from "@tanstack/react-query";
import SearchResultsCard from "../components/search/SearchResultsCard";
import Pagination from "../components/search/Pagination";
const SearchPage = () => {
  const [page, setPage] = useState<number>(1);

  const destination = useAppSelector((state) => state?.search.destination);
  const checkIn = useAppSelector((state) => state?.search.checkIn);
  const checkOut = useAppSelector((state) => state?.search.checkOut);
  const adultCount = useAppSelector((state) => state?.search.adultCount);
  const childCount = useAppSelector((state) => state?.search.childCount);

  const searchParams = {
    destination: destination,
    checkIn: new Date(checkIn).toISOString(),
    checkOut: new Date(checkOut).toISOString(),
    adultCount: adultCount.toString(),
    childCount: childCount.toString(),
    page: page?.toString(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSearchedHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });
  console.log("SearchResults ~ data:", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      {/* LEFT SIDE FILTER COLUMN */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* TODO FILTERS */}
        </div>
      </div>
      {/* RIGHT SIDE HOTELS SECTION */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          {isLoading && <span className="text-xl font-bold">Loading....</span>}
          {!isLoading && (
            <span className="text-xl font-bold">
              {data?.pagination.total} Hotels found
              {destination ? ` in ${destination}` : ""}
            </span>
          )}
          {/* <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select> */}
        </div>
        {data?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} key={hotel._id} />
        ))}
        <div>
          <Pagination
            currentPage={data?.pagination.currentPage || 1}
            totalPages={data?.pagination.totalPages || 1}
            onPageChange={(page: number) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
