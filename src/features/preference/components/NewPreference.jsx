import { useCreatePreferenceMutation } from "../preferenceApiSlice";
import useAuth from "../../../hooks/useAuth";

const NewPreference = () => {
    const { id } = useAuth();

    const [createPreference] = useCreatePreferenceMutation();

    const onClickNewPreference = () => createPreference(id);

    return (
        <div className="flex flex-col gap-10 py-10">
            <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">Configuración de preferencias</h2>
            <div className="bg-orange-100 p-5 rounded-lg flex flex-col gap-5 justify-center items-center">
                <p className="font-bold">La preferencia no existe.</p>
                <button
                    className="px-3 py-1 text-slate-50 bg-orange-500 hover:bg-orange-400 rounded-lg"
                    onClick={onClickNewPreference}
                >
                    Crear nueva preferencia
                </button>
            </div>
        </div>
    );
};

export default NewPreference;