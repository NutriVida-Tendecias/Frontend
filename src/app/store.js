import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import edamamApiSlice from "./api/edamamApiSlice";
import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import searchParamsReducer from "../features/recipe/searchParamsSlice";
import mealPlanApiSlice from "./../features/mealPlan/mealPlanApiSlice"; 

const store = configureStore({
    reducer: {
        [edamamApiSlice.reducerPath]: edamamApiSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [mealPlanApiSlice.reducerPath]: mealPlanApiSlice.reducer,
        auth: authReducer,
        searchParams: searchParamsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([edamamApiSlice.middleware, apiSlice.middleware,mealPlanApiSlice.middleware]),
    devTools: true
});

setupListeners(store.dispatch);

export default store;