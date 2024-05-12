import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useGetMealPlanRecipeQuery } from "../suggestMealPlanApiSlice";
import { MealPlanCard } from "./";

const MealPlanContainer = ({ type, recipes, value }) => {
    const [mealPlanData, setMealPlanData] = useState("");

    useEffect(() => {
        const recipesUrls = Object.values(recipes);
        setMealPlanData(recipesUrls[value]);
    }, []);

    const {
        data: recipe,
        isLoading,
        isSuccess,
        isError
    } = useGetMealPlanRecipeQuery(mealPlanData, { skip: !mealPlanData });

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-5 py-2">
                <div className="flex gap-3 p-2">
                    <MealPlanCard recipe={recipe} type={type}/>
                </div>
            </div>
        )
    } else if (isLoading) {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex justify-center items-center p-10">
                    <Oval
                        height={60}
                        width={60}
                        visible={true}
                        color="#ED8936" // orange-500
                        secondaryColor="#ED8936" // orange-500
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex justify-center items-center p-10">
                    <p className="text-orange-700 font-bold">Ups... Se produjo un error...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-5 py-10">
                <div className="flex justify-center items-center p-10">
                    <p className="text-orange-700 font-bold">Ups... No se pudo cargar...</p>
                </div>
            </div>
        );
    }
    };

export default MealPlanContainer;
