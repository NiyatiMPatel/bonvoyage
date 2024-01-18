// USER REGISTRATION FORM DATA
type RegisterFormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// USER LOGIN FORM DATA
type SignInFromValueType = {
  email: string;
  password: string;
};

// CREATE HOTEL FORM DATA
type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageFiles: FileList;
  imageUrls: string[];
};

// HOTEL DATA
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

// PAGINATED HOTEL SEARCH RESPONSE
type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
};

// Define a type for the search variable - search slice state and searchbar variables
type SearchVariables = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
};

//Define a type for search query parameters to send to backend
type SearchQueryParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

// MANAGE HOTEL FORM PROPS DATA
type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isPending: boolean;
  hotel?: HotelType;
};

// SEARCH RESULTS CARD PROPS
type SearchResultsCardProps = {
  hotel: HotelType;
};

// PAGINATION PROPS
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
