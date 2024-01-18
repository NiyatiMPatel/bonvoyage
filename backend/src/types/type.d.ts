// Define the UserType type, representing the structure of a user object.
type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Define the HotelType type, representing the structure of a hotel object.
type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

// Define the paginated Hote response type, representing the structure of paginated search result

type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
};
