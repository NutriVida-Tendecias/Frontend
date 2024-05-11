import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useGetMealPlanRecipesQuery } from "../mealPlanApiSlice";
import { MealPlanContainer } from "./";

const MealPlanService = ({ preference }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Construye la query para obtener el plan de comidas
        const constructedQuery = {
            user: preference.user,
            diets: preference.diets,
            allergies: preference.allergies
        };
        setQuery(constructedQuery);
    }, [preference]);

    const {
        data: recipes,
        isLoading,
        isSuccess,
        isError
    } = useGetMealPlanRecipesQuery(query, { skip: !query });

    const filterRecipesByDay = (dayIndex) => {
        return recipes?.selection.map((selection) => {
            const section = selection.sections;
            return {
                breakfast: section.Breakfast?.assigned,
                lunch: section.Lunch?.assigned,
                dinner: section.Dinner?.assigned
            };
        })[dayIndex];
    };

    if (isSuccess) {
        return (
            <div className="pt-[20px] pb-10 flex flex-col px-5 md:px-10 lg:px-20">
                <MealPlanContainer type={"Lunes"} recipes={filterRecipesByDay(0)} />
                <MealPlanContainer type={"Martes"} recipes={filterRecipesByDay(1)} />
                <MealPlanContainer type={"Miércoles"} recipes={filterRecipesByDay(2)} />
                <MealPlanContainer type={"Jueves"} recipes={filterRecipesByDay(3)} />
                <MealPlanContainer type={"Viernes"} recipes={filterRecipesByDay(4)} />
                <MealPlanContainer type={"Sábado"} recipes={filterRecipesByDay(5)} />
                <MealPlanContainer type={"Domingo"} recipes={filterRecipesByDay(6)} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="pt-[72px] min-h-[calc(100vh-72px)] flex justify-center items-center">
                <Oval
                    height={60}
                    width={60}
                    visible={true}
                    color="#ED8936"
                    secondaryColor="#ED8936"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        );
    } else if (isError) {
        return (
            <div className="pt-[64px] min-h-[calc(100vh-76px)] flex flex-col gap-1 justify-center items-center text-orange-700">
                <p className="font-bold">Ups... Se produjo un error...</p>
            </div>
        );
    } else {
        return (
            <div className="pt-[64px] min-h-[calc(100vh-76px)] flex flex-col gap-1 justify-center items-center text-orange-700">
                <p className="font-bold">Ups... No se pudo cargar...</p>
            </div>
        );
    }
};

export default MealPlanService;
