import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchData, getAllCurrencies } from "../../api";
import { Arguments } from "../../api";
import { Base } from "../../api";

export interface CurrencyState {
    convertedValue: number;
    status: "loading" | "success" | "failed";
    currencies: { key: string; value: number | unknown }[];
    base: string;
}

const initialState: CurrencyState = {
    convertedValue: 0,
    status: "loading",
    currencies: [],
    base: "EUR",
};

export const currencyAsync = createAsyncThunk("currency/fetchCovertedValue", async ({ to, from, amount }: Arguments) => {
    const response = await fetchData({ to, from, amount });

    return response;
});

export const latestCurrencies = createAsyncThunk("currency/latest", async ({ base }: Base) => {
    const response = await getAllCurrencies({ base });
    return response;
});

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(currencyAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currencyAsync.fulfilled, (state, action) => {
                state.status = "success";
                state.convertedValue = action.payload.result;
                console.log(state.convertedValue);
            })
            .addCase(currencyAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(latestCurrencies.fulfilled, (state, action) => {
                state.status = "success";
                console.log(action.payload.rates);
                state.currencies = Object.entries(action.payload.rates).map(([key, value]) => ({ key, value }));
            });
    },
});

export const {} = currencySlice.actions;

export const selectCurrencies = (state: RootState) => state.currency.currencies;

export default currencySlice.reducer;

// currencies= [{key:"EUR", value:480},{key:"EUR", value:480},{key:"EUR", value:480}]
