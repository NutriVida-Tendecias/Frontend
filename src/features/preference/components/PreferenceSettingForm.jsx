import { useEffect, useState } from "react";
import { useUpdatePreferenceMutation } from "../preferenceApiSlice";
import { GiCancel } from "react-icons/gi";

const PreferenceSettingForm = ({ id, favorites, ingredients }) => {
    const [favorite, setFavorite] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [updatePreference, { isError, error }] = useUpdatePreferenceMutation();

    useEffect(() => {
        setErrMsg(error?.data?.message);
    }, [isError]);

    const onChangeFavorite = e => setFavorite(e.target.value);
    const onChangeIngredient = e => setIngredient(e.target.value);
    const onClickAddFavorite = async () => {
        if (favorite) {
            await updatePreference({
                id,
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
                favorites,
                ingredients: [...ingredients, ingredient]
            });
            setIngredient("");
        }
    };
    const onClickFavoriteChip = async (indexToRemove) => {
        const updatedFavorites = favorites.filter((favorite, index) => index !== indexToRemove);
        await updatePreference({
            id,
            favorites: updatedFavorites,
            ingredients
        });
    };
    const onClickIngredientChip = async (indexToRemove) => {
        const updatedIngredients = ingredients.filter((ingredient, index) => index !== indexToRemove);
        await updatePreference({
            id,
            favorites,
            ingredients: updatedIngredients
        });
    };
    
    return (
        <div className="flex flex-col gap-10 py-10">
            <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">Configuración de preferencias</h2>
            <p className={errMsg ? "text-orange-700 font-bold" : "hidden"}>{errMsg}</p>
            <div className="flex flex-col gap-5">
                <h4 className="text-xl font-bold">Favoritos</h4>
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