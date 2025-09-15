import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    { img: "", name: "Projectors", cost: 200, quantity: 0 },
    { img: "", name: "Speaker", cost: 35, quantity: 0 },
    { img: "", name: "Microphones", cost: 45, quantity: 0 },
    { img: "", name: "Whiteboards", cost: 80, quantity: 0 },
    { img: "", name: "Signage", cost: 80, quantity: 0 },
  ],
  reducers: {
    incrementAv: (state, action) => {
      state[action.payload].quantity += 1;
    },
    decrementAv: (state, action) => {
      if (state[action.payload].quantity > 0) {
        state[action.payload].quantity -= 1;
      }
    },
    resetAv: (state) => {
      state.forEach((item) => {
        item.quantity = 0;
      });
    },
  },
});

export const { incrementAv, decrementAv, resetAv } = avSlice.actions;
export default avSlice.reducer;
