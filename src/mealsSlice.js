import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    { name: 'Breakfast', cost: 50, quantity: 0 },
    { name: 'High Tea', cost: 25, quantity: 0 },
    { name: 'Lunch', cost: 65, quantity: 0 },
    { name: 'Dinner', cost: 70, quantity: 0 },
  ],
  reducers: {
    incrementMeal: (state, action) => {
      state[action.payload].quantity += 1;
    },
    decrementMeal: (state, action) => {
      if (state[action.payload].quantity > 0) {
        state[action.payload].quantity -= 1;
      }
    },
    resetMeals: (state) => {
      state.forEach((meal) => {
        meal.quantity = 0;
      });
    },
  },
});

export const { incrementMeal, decrementMeal, resetMeals } = mealsSlice.actions;
export default mealsSlice.reducer;
