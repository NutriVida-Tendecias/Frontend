import { createEntityAdapter } from "@reduxjs/toolkit";
import edamamApiSlice from "../../app/api/edamamApiSlice";
import { createQueryStringVersionByUri } from "../../utils/recipeApiUtils";

const suggestAdapter = createEntityAdapter({
    selectId: recipe => recipe.uri
});

const initialState = suggestAdapter.getInitialState();

const suggestMealPlanApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMealPlanRecipe: builder.query({
            query: (urls) => {
                console.log("urls: ", urls);
                const queryString = createQueryStringVersionByUri(urls);
                const validateStatus = (response, result) => response.status === 200 && !result.isError;

                return {
                    url: `/api/recipes/v2/by-uri${queryString}`,
                    validateStatus
                };
            },
            transformResponse: response => {
                const loadedRecipes = response?.hits?.map(hit => {
                    const recipeId = hit.recipe.url.split("#recipe_")[1];
                    hit.recipe.id = recipeId;

                    return hit.recipe;
                });

                return suggestAdapter.setAll(initialState, loadedRecipes);
            }
        })
    })
});

export const { useGetMealPlanRecipeQuery } = suggestMealPlanApiSlice;

export default suggestMealPlanApiSlice;
