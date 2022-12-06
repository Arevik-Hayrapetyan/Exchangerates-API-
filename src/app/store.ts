import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import currencySlice from "./slices/currencySlice";
export const store = configureStore({
    reducer: {
        currency: currencySlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
