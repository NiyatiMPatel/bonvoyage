import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// // Define a type for the slice state
// interface SearchVariables {
//   destination: string;
//   checkIn: Date;
//   checkOut: Date;
//   adultCount: number;
//   childCount: number;
//   hotelId?: string;
// }

// Define the initial state using that type
const initialState: SearchVariables = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  hotelId: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => ({
      ...state,
      destination: action.payload,
    }),
    setCheckIn: (state, action: PayloadAction<Date>) => ({
      ...state,
      checkIn: action.payload,
    }),
    setCheckOut: (state, action: PayloadAction<Date>) => ({
      ...state,
      checkOut: action.payload,
    }),
    setAdultCount: (state, action: PayloadAction<number>) => ({
      ...state,
      adultCount: action.payload,
    }),
    setChildCount: (state, action: PayloadAction<number>) => ({
      ...state,
      childCount: action.payload,
    }),
    sethotelId: (state, action: PayloadAction<string>) => ({
      ...state,
      hotelId: action.payload,
    }),
  },
});

// ACTION FUNCTION TO UPDATE THE STATE
export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdultCount,
  setChildCount,
  sethotelId,
} = searchSlice.actions;
// REDUCERS TO ACCESS
export default searchSlice.reducer;