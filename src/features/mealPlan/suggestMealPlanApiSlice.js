import { createEntityAdapter } from "@reduxjs/toolkit";
import edamamApiSlice from "../../app/api/edamamApiSlice";
import { createQueryStringVersionByUri } from "../../utils/recipeApiUtils";

const suggestAdapter = createEntityAdapter({
    selectId: recipe => recipe.id
});

const initialState = suggestAdapter.getInitialState();

const suggestMealPlanApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRandomRecipes: builder.query({
            query: (uri) => {
                const queryString = createQueryStringVersionByUri(uri);
                const validateStatus = (response, result) => response.status === 200 && !result.isError;

                return {
                    url: `/api/recipes/v2/by-uri${queryString}`,
                    validateStatus
                };
            },
            transformResponse: response => {
                const loadedRecipes = response?.hits?.map(hit => {
                    const recipeId = hit.recipe.uri.split("#recipe_")[1];
                    hit.recipe.id = recipeId;

                    return hit.recipe;
                });

                return suggestAdapter.setAll(initialState, loadedRecipes);
            }
        })
    })
});

export const { useGetRecipesMealPlanQuery } = suggestMealPlanApiSlice;

export default suggestMealPlanApiSlice;
