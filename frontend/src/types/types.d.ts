type ChildrenProp = {
  children: ReactNode;
};

type RegisterFormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignInFromValueType = {
  email: string;
  password: string;
};

type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type ErrorTouchProps = {
  errors: any;
  touched: any;
};
