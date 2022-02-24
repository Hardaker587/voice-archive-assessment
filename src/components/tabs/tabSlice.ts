import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../app/store";
import { beersEnum } from "../../enums/beers.enum";

export interface Drink {
  beer: beersEnum;
  quantity: number;
}
export interface Order {
  drink: Drink;
  table: number;
  guests: number;
  splitBill: boolean;
}

const initialState: Array<Order> = [];

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    newOrder: (state, action: PayloadAction<Order>) => {
      const tableOccupied = state.some(
        (order) => order.table === action.payload.table
      );
      const filterOutOrder = state.filter(
        (order) => order.table !== action.payload.table
      );

      state = [...filterOutOrder, action.payload];
    },
  },
});

export const { newOrder } = tabSlice.actions

export const tabs = (state: AppState) => state

export default tabSlice.reducer



