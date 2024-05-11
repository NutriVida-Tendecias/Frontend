import { Oval } from "react-loader-spinner";
import { BiSolidError } from "react-icons/bi";
import { useGetPreferenceQuery } from "../preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";
import { NewPreference, PreferenceSettingForm } from "./";

const PreferenceSetting = () => {
    const { id } = useAuth();

    const {
        data: preference,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPreferenceQuery(id);

    if (isSuccess) {
        const { entities, ids } = preference;
        const currentPreference = entities[ids[0]];
        const diets = currentPreference?.diets;
        const allergies = currentPreference?.allergies;
        const favorites = currentPreference?.favorites;
        const ingredients = currentPreference?.ingredients;

        return <PreferenceSettingForm id={ids[0]} diets={diets} allergies={allergies} favorites={favorites} ingredients={ingredients} />;
    } else if (isLoading) {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">
                    Configuración de preferencias
                </h2>
                <div className="p-20 flex justify-center items-center">
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
            </div>
        );
    } else if (isError) {
        if (error?.status === 404) {
            return <NewPreference />;
        }

        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">Configuración de preferencias</h2>
                <div className="p-20 flex flex-col gap-1 justify-center items-center text-orange-700">
                    <BiSolidError className="text-5xl" />
                    <p className="font-bold">Ups... Se produjo un error...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">Configuración de preferencias</h2>
                <div className="p-20 flex flex-col gap-1 justify-center items-center text-orange-700">
                    <BiSolidError className="text-5xl" />
                    <p className="font-bold">Ups... Se produjo un error...</p>
                </div>
            </div>
        );
    }
};

export default PreferenceSetting;