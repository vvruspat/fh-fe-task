import { configureStore } from "@reduxjs/toolkit";

import roomsReducer, { RoomsReducer } from "./rooms/roomsSlice";

export type GlobalState = {
  rooms: RoomsReducer;
};

export default configureStore<GlobalState>({
  reducer: {
    rooms: roomsReducer,
  },
});
