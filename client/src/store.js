import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};
export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = stateSlice.actions;
export default stateSlice.reducer;
