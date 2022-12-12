import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchData, getAllCurrencies } from "../../api";
import { Arguments } from "../../api";
import { Base } from "../../api";

export interface CurrencyState {
    convertedValue: number | null;
    status: "loading" | "success" | "failed";
    currencies: { key: string; value: number | unknown }[];
    base: string;
    values: {
        from: string;
        to: string;
        amount: number;
    };
}

const initialState: CurrencyState = {
    convertedValue: null,
    status: "loading",
    currencies: [
        { key: "AMD", value: 500 },
        { key: "EUR", value: 400 },
        { key: "USD", value: 480 },
    ],
    base: "EUR",
    values: {
        from: "EUR",
        to: "AMD",
        amount: 1,
    },
};

export const currencyAsync = createAsyncThunk("currency/fetchCovertedValue", async ({ to, from, amount }: Arguments) => {
    const response = await fetchData({ to, from, amount });
    return response;
});

export const latestCurrenciesAsync = createAsyncThunk("currency/latest", async ({ base }: Base) => {
    const response = await getAllCurrencies({ base });
    return response;
});

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        handleInputChanges: (state, action) => {
            const { name, value } = action.payload;
            const inputName = name.toLowerCase();

            if (inputName === "amount") {
                state.values.amount = +value;
            }

            if (inputName === "from") {
                state.values.from = value;
            }

            if (inputName === "to") {
                state.values.to = value;
            }
        },
    },

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
            .addCase(latestCurrenciesAsync.fulfilled, (state, action) => {
                state.status = "success";
                console.log(action.payload.rates);
                state.currencies = Object.entries(action.payload.rates).map(([key, value]) => ({ key, value }));
            });
    },
});

export const { handleInputChanges } = currencySlice.actions;

export const selectCurrencies = (state: RootState) => state.currency.currencies;
export const selectConvertedValue = (state: RootState) => state.currency.convertedValue;
export const selectBaseCurrency = (state: RootState) => state.currency.base;
export const selectValues = (state: RootState) => state.currency.values;

export default currencySlice.reducer;
