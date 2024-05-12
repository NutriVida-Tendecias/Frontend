import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useGetMealPlanRecipesQuery } from "../mealPlanApiSlice";
import { MealPlanContainer } from "./";

const MealPlanService = ({ preference }) => {
    const [query, setQuery] = useState("");
    const [mealType, setMealType] = useState(0); // 0: Desayuno, 1: Almuerzo, 2: Cena
    const [activeButton, setActiveButton] = useState(0); // Estado para el botón activo

    useEffect(() => {
        // Construye la query para obtener el plan de comidas
        const constructedQuery = {
            user: preference.user,
            diets: preference.diets,
            allergies: preference.allergies,
            mealType: mealType // Añadir el tipo de comida a la query
        };
        setQuery(constructedQuery);
    }, [preference, mealType]);

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

    const handleButtonClick = (type, index) => {
        setMealType(type);
        setActiveButton(index);
    };

    if (isSuccess) {
        return (
            <div className="pt-[20px] pb-10 flex flex-col px-5 md:px-10 lg:px-20">
                <div className="flex" >
                    <button type="button" className={`flex-1 ${activeButton === 0 ? 'bg-orange-400' : 'bg-orange-500'} text-slate-50 font-bold px-5 py-3 rounded-lg hover:bg-orange-400 mr-2`} onClick={() => handleButtonClick(0, 0)}>Desayuno</button>
                    <button type="button" className={`flex-1 ${activeButton === 1 ? 'bg-orange-400' : 'bg-orange-500'} text-slate-50 font-bold px-5 py-3 rounded-lg hover:bg-orange-400 mr-2`} onClick={() => handleButtonClick(1, 1)}>Almuerzo</button>
                    <button type="button" className={`flex-1 ${activeButton === 2 ? 'bg-orange-400' : 'bg-orange-500'} text-slate-50 font-bold px-5 py-3 rounded-lg hover:bg-orange-400`} onClick={() => handleButtonClick(2, 2)}>Cena</button>
                </div><br/>

                <MealPlanContainer key={`mealPlan_${mealType}_${0}`} type={"Lunes"} recipes={filterRecipesByDay(0)} value={mealType} />
                <MealPlanContainer key={`mealPlan_${mealType}_${1}`} type={"Martes"} recipes={filterRecipesByDay(1)} value={mealType}  />
                <MealPlanContainer key={`mealPlan_${mealType}_${2}`} type={"Miércoles"} recipes={filterRecipesByDay(2)} value={mealType} />
                <MealPlanContainer key={`mealPlan_${mealType}_${3}`} type={"Jueves"} recipes={filterRecipesByDay(3)} value={mealType} />
                <MealPlanContainer key={`mealPlan_${mealType}_${4}`} type={"Viernes"} recipes={filterRecipesByDay(4)} value={mealType} />
                <MealPlanContainer key={`mealPlan_${mealType}_${5}`} type={"Sábado"} recipes={filterRecipesByDay(5)} value={mealType} />
                <MealPlanContainer key={`mealPlan_${mealType}_${6}`} type={"Domingo"} recipes={filterRecipesByDay(6)} value={mealType} />
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
