import { Oval } from "react-loader-spinner";
import { BiSolidError } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
import { useGetPreferenceQuery } from "../../preference/preferenceApiSlice";
import { MealPlanService } from "./";

const MealPlan  = () => {
    const { id } = useAuth();

    const {
        data: preference,
        isLoading,
        isSuccess,
        isError
    } = useGetPreferenceQuery(id);

    if (isSuccess) {
        const { entities, ids  } = preference;
        const currentPreference = entities[ids[0]];
        const diets = currentPreference?.diets;
        const allergies = currentPreference?.allergies;
        const filteredPreference = {
            diets: diets || [],
            allergies: allergies || [],
            user: id
        };

        return (            
            <div className="pt-[72px] pb-10 flex flex-col px-5 md:px-10 lg:px-20">

                <MealPlanService  preference={filteredPreference} />
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
                <BiSolidError className="text-5xl" />
                <p className="font-bold">Ups... Se produjo un error...</p>
            </div>
        );
    } else {
        return (
            <div className="pt-[64px] min-h-[calc(100vh-76px)] flex flex-col gap-1 justify-center items-center text-orange-700">
                <BiSolidError className="text-5xl" />
                <p className="font-bold">Ups... No se pudo cargar...</p>
            </div>
        );
    }



}

export default MealPlan
