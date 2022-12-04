import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';
import { fetchData } from "../../api";
import { Arguments } from "../../api";

export interface CurrencyState {
  result: number;
  status: "loading" | "success" | "failed";
}

const initialState: CurrencyState = {
  result: 0,
  status: "loading",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const currencyAsync = createAsyncThunk(
  "counter/fetchCount",
  async ({ to, from, amount }: Arguments) => {
    const response = await fetchData({ to, from, amount });
    // The value we return becomes the `fulfilled` action payload
    return response.result;
  }
);

export const currencySlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(currencyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(currencyAsync.fulfilled, (state, action) => {
        state.status = "success";
        console.log(action.payload, "fetcheddtatatatatat");
      })
      .addCase(currencyAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = currencySlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default currencySlice.reducer;