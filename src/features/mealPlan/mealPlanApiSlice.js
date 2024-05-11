import edamamApiSlice from "./../../app/api/edamamApiSlice"; 
import { createMealPlanQueryString } from "../../utils/recipeApiUtils";

const mealPlanApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMealPlanRecipes: builder.query({
            query: ({ user, diets, allergies }) => {
                const { queryString, requestBodyJson } = createMealPlanQueryString(diets, allergies);

                return {
                    url: `/api/meal-planner/v1/${queryString}`, // Cambiar la URL base y la ruta según sea necesario
                    method: "POST",
                    body: requestBodyJson,
                    headers: {
                        "accept": "application/json",
                        "Edamam-Account-User": user, 
                        "Authorization": "Basic YjNmNTY1ZWQ6Nzc4MzUxOGMxYmY3ZjM0MjAwNjI4NjVmYjlkOThkZDU=",
                        "Content-Type": "application/json"
                    },
                    validateStatus: (response, result) => response.status === 200 && !result.isError
                };
            },
            providesTags: (result, error, { user }) => [
                { type: "MealPlan", id: user }
            ],
        }),
    })
});

export const { useGetMealPlanRecipesQuery } = mealPlanApiSlice;

export default mealPlanApiSlice;
