import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ExpenseSort = "date" | "amount";
export type ExpenseFilters = {
  search: string;
  filterCategory: string;
  filterMethod: string;
  filterFrom: string;
  filterTo: string;
  filterMinAmount: string;
  filterMaxAmount: string;
  sort: ExpenseSort;
};

const initialState: ExpenseFilters = {
  search: "",
  filterCategory: "",
  filterMethod: "",
  filterFrom: "",
  filterTo: "",
  filterMinAmount: "",
  filterMaxAmount: "",
  sort: "date"
};

// Redux keeps search, filter, and sort choices together for consistent UI controls and API queries.
const expenseFiltersSlice = createSlice({
  name: "expenseFilters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
    setFilterCategory: (state, action: PayloadAction<string>) => { state.filterCategory = action.payload; },
    setFilterMethod: (state, action: PayloadAction<string>) => { state.filterMethod = action.payload; },
    setFilterFrom: (state, action: PayloadAction<string>) => { state.filterFrom = action.payload; },
    setFilterTo: (state, action: PayloadAction<string>) => { state.filterTo = action.payload; },
    setFilterMinAmount: (state, action: PayloadAction<string>) => { state.filterMinAmount = action.payload; },
    setFilterMaxAmount: (state, action: PayloadAction<string>) => { state.filterMaxAmount = action.payload; },
    setSort: (state, action: PayloadAction<ExpenseSort>) => { state.sort = action.payload; },
    resetExpenseFilters: () => initialState
  }
});

export const {
  setSearch,
  setFilterCategory,
  setFilterMethod,
  setFilterFrom,
  setFilterTo,
  setFilterMinAmount,
  setFilterMaxAmount,
  setSort,
  resetExpenseFilters
} = expenseFiltersSlice.actions;

export const store = configureStore({
  reducer: { expenseFilters: expenseFiltersSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
