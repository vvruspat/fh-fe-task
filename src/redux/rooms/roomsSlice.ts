import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRoom } from "../../types/room.type";

export type RoomsReducer = {
  rooms: TRoom[];
};

const searchParams = new URLSearchParams(window.location.search);
const serializedData = searchParams.get('data');
const rooms: TRoom[] = serializedData.split('|').map((serializedRoom) => {
  const roomData = serializedRoom.split(':');

  const adults = Number(roomData[0]) ?? 1;
  const children = roomData[1]?.split(',').map((child) => Number(child)) ?? [];

  return {
    id: (Date.now() + Math.random()).toString(),
    adults,
    children,
  }
});

const initialState: RoomsReducer = {
  rooms: rooms || [
    {
      id: Date.now().toString(),
      adults: 1,
      children: [],
    }
  ],
};

const RoomsSlice = createSlice({
  name: "Rooms",
  initialState,
  reducers: {
    removeRoom(state, action: PayloadAction<TRoom["id"]>) {
      const id = action.payload;
      const idx = state.rooms.findIndex((room) => room.id === id);

      state.rooms.splice(idx, 1);
    },

    updateRoom(state, action: PayloadAction<TRoom>) {
      const room = action.payload;
      const idx = state.rooms.findIndex((_room) => _room.id === room.id);

      state.rooms[idx] = room;
    },

    updateChild(state, action: PayloadAction<{roomId: TRoom["id"], childIndex: number, age: number}>) {
      const { roomId, childIndex, age } = action.payload;
      const roomIndex = state.rooms.findIndex((_room) => _room.id === roomId);

      state.rooms[roomIndex].children[childIndex] = age;
    },

    removeChild(state, action: PayloadAction<{roomId: TRoom["id"], childIndex: number}>) {
      const { roomId, childIndex } = action.payload;
      const roomIndex = state.rooms.findIndex((_room) => _room.id === roomId);

      state.rooms[roomIndex].children.splice(childIndex, 1);
    },

    addRoom(state, _action: PayloadAction<RoomsReducer["rooms"]>) {
      state.rooms = [...state.rooms, {
        id: Date.now().toString(),
        adults: 1,
        children: [],
      }];
    },
  },
});

export const { removeRoom, updateRoom, addRoom, updateChild, removeChild } = RoomsSlice.actions;
export default RoomsSlice.reducer;
