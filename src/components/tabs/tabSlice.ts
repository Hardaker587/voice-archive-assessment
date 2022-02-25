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
  total: number;
}
export interface Order {
  drink: Array<Drink>;
  table: number;
  guests: number;
  splitBill: boolean;
  total: number;
}

export interface State {
  Tabs: Array<Order>;
}

const initialState: State = {
  Tabs: [],
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    newOrder: (state, action: PayloadAction<Order>) => {
      console.log(action);
      const tableOccupied = state.Tabs.some(
        (order) => order.table === action.payload.table
      );
      const filterOutOrder = state.Tabs.filter(
        (order) => order.table !== action.payload.table
      );
      state.Tabs = [...filterOutOrder, action.payload];
    },
  },
});

export const { newOrder } = tabSlice.actions;

export const tabs = (state: AppState) => state.tab;

export default tabSlice.reducer;
