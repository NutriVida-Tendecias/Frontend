import { useEffect, useState } from "react";
import { useUpdatePreferenceMutation } from "../preferenceApiSlice";
import { GiCancel } from "react-icons/gi";
import { dietLabels, allergiesLabels } from "../../../constants/labels"

const PreferenceSettingForm = ({ id, diets, allergies, favorites, ingredients }) => {
    const [diet, setDiet] = useState("");
    const [allergie, setAllergie] = useState("");
    const [favorite, setFavorite] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [updatePreference, { isError, error }] = useUpdatePreferenceMutation();

    useEffect(() => {
        setErrMsg(error?.data?.message);
    }, [isError]);

    const onChangeDiet = e => setDiet(e.target.value);
    const onChangeAllergie = e => setAllergie(e.target.value);
    const onChangeFavorite = e => setFavorite(e.target.value);
    const onChangeIngredient = e => setIngredient(e.target.value);
    const onClickAddDiet = async () => {
        if (diet) {
            await updatePreference({
                id,
                diets: [...diets, diet],
                allergies,
                favorites,
                ingredients
            });
            setDiet("");
        }
    };
    const onClickAddAllergie = async () => {
        if (allergie) {
            await updatePreference({
                id,
                diets,
                allergies: [...allergies, allergie],
                favorites,
                ingredients
            });
            setAllergie("");
        }
    };
    const onClickAddFavorite = async () => {
        if (favorite) {
            await updatePreference({
                id,
                diets,
                allergies,
                favorites: [...favorites, favorite],
                ingredients
            });
            setFavorite("");
        }
    };
    const onClickAddIngredient = async () => {
        if (ingredient) {
            await updatePreference({
                id,
                diets,
                allergies,
                favorites,
                ingredients: [...ingredients, ingredient]
            });
            setIngredient("");
        }
    };

    const onClickDietChip = async (indexToRemove) => {
        const updatedDiets = diets.filter((diet, index) => index !== indexToRemove);
        await updatePreference({
            id,
            diets: updatedDiets,
            allergies,
            favorites,
            ingredients
        });
    };
    const onClickAllergieChip = async (indexToRemove) => {
        const updatedAllergie = allergies.filter((allergie, index) => index !== indexToRemove);
        await updatePreference({
            id,
            diets,
            allergies: updatedAllergie,
            favorites,
            ingredients
        });
    };
    const onClickFavoriteChip = async (indexToRemove) => {
        const updatedFavorites = favorites.filter((favorite, index) => index !== indexToRemove);
        await updatePreference({
            id,
            diets,
            allergies,
            favorites: updatedFavorites,
            ingredients
        });
    };
    const onClickIngredientChip = async (indexToRemove) => {
        const updatedIngredients = ingredients.filter((ingredient, index) => index !== indexToRemove);
        await updatePreference({
            id,
            diets,
            allergies,
            favorites,
            ingredients: updatedIngredients
        });
    };
    
    return (
        <div className="flex flex-col gap-10 py-10">
            <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">Configuración de preferencias</h2>
            <p className={errMsg ? "text-orange-700 font-bold" : "hidden"}>{errMsg}</p>

            <div className="flex flex-col gap-5">
                <h4 className="text-xl font-bold">Preferencias de Dieta</h4>
                <div className="flex gap-5">
                    <select
                        className="px-4 py-2 text-sm bg-red-100 border-2 border-red-300 rounded-lg"
                        value={diet}
                        onChange={onChangeDiet}
                    >
                        <option value="">Selecciona una opción</option>
                        {dietLabels.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 text-sm bg-red-500 rounded-lg text-slate-50 hover:bg-red-400"
                        onClick={onClickAddDiet}
                    >
                        Añadir
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 bg-red-100 rounded-lg p-3">
                    {diets.map((diet, index) => (
                        <span
                            className="flex gap-1 justify-center items-center bg-red-500 px-3 py-1 rounded-full text-sm hover:cursor-pointer hover:bg-red-400 text-slate-50"
                            key={index}
                            onClick={() => onClickDietChip(index)}
                        >
                            {diet} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>


            <div className="flex flex-col gap-5">
                <h4 className="text-xl font-bold">Alergias</h4>
                <div className="flex gap-5">
                    <select
                        className="px-4 py-2 text-sm bg-green-100 border-2 border-green-300 rounded-lg"
                        value={allergie}
                        onChange={onChangeAllergie}
                    >
                        <option value="">Selecciona una opción</option>
                        {allergiesLabels.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 text-sm bg-green-500 rounded-lg text-slate-50 hover:bg-green-400"
                        onClick={onClickAddAllergie}
                    >
                        Añadir
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 bg-green-100 rounded-lg p-3">
                    {allergies.map((allergie, index) => (
                        <span
                            className="flex gap-1 justify-center items-center bg-green-500 px-3 py-1 rounded-full text-sm hover:cursor-pointer hover:bg-green-400 text-slate-50"
                            key={index}
                            onClick={() => onClickAllergieChip(index)}
                        >
                            {allergie} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h4 className="text-xl font-bold">Platos Favoritos</h4>
                <div className="flex gap-5">
                    <input
                        className="px-4 py-2 text-sm bg-orange-100 border-2 border-orange-300 rounded-lg"
                        type="text"
                        autoComplete="off"
                        value={favorite}
                        onChange={onChangeFavorite}
                        placeholder="ex) pasta, burger, salad"
                    />
                    <button
                        className="px-4 py-2 text-sm bg-orange-500 rounded-lg text-slate-50 hover:bg-orange-400"
                        onClick={onClickAddFavorite}
                    >
                        Añadir
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 bg-orange-100 rounded-lg p-3">
                    {favorites.map((favorite, index) => (
                        <span
                            className="flex gap-1 justify-center items-center bg-orange-500 px-3 py-1 rounded-full text-sm hover:cursor-pointer hover:bg-orange-400 text-slate-50"
                            key={index}
                            onClick={() => onClickFavoriteChip(index)}
                        >
                            {favorite} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h4 className="text-xl font-bold">Ingredientes</h4>
                <div className="flex gap-5">
                    <input
                        className="px-4 py-2 text-sm bg-blue-100 border-2 border-blue-300 rounded-lg"
                        type="text"
                        autoComplete="off"
                        value={ingredient}
                        onChange={onChangeIngredient}
                        placeholder="ex) egg, beef, pork"
                    />
                    <button
                        className="px-4 py-2 text-sm bg-blue-500 rounded-lg text-slate-50 hover:bg-blue-400"
                        onClick={onClickAddIngredient}
                    >
                        Añadir
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 bg-blue-100 rounded-lg p-3">
                    {ingredients.map((ingredient, index) => (
                        <span
                            className="flex gap-1 justify-center items-center bg-blue-500 px-3 py-1 rounded-full text-sm hover:cursor-pointer hover:bg-blue-400 text-slate-50"
                            key={index}
                            onClick={() => onClickIngredientChip(index)}
                        >
                            {ingredient} <GiCancel />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreferenceSettingForm;
