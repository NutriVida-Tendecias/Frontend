import { useEffect, useState, useRef } from "react";
import { useUpdateUserMutation } from "../usersApiSlice";

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AccountSettingForm = ({ user }) => {
    const usernameRef = useRef();

    const [isEditable, setIsEditable] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(true);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [updateUser, {
        isLoading: isUpdateLoading,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateUserMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, [isEditable]);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isUpdateSuccess) {
            setPassword("");
            setIsEditable(false);
        }
    }, [isUpdateSuccess]);

    const isValid = password
        ? (validUsername && validPassword && !isUpdateLoading)
        : (validUsername && !isUpdateLoading);

    const onChangeUsername = e => setUsername(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onClickEdit = e => {
        e.preventDefault();
        setIsEditable(true);
    };
    const onClickCancel = e => {
        e.preventDefault();
        setUsername(user.username);
        setPassword("");
        setIsEditable(false);
    };
    const onClickSave = async (e) => {
        e.preventDefault();
        if (password) {
            await updateUser({ id: user.id, username, password });
        } else {
            await updateUser({ id: user.id, username });
        }
    };

    return (
        <form className="flex flex-col gap-5">
            <p className={(isUpdateError) ? "text-orange-700" : "hidden"}>
                {updateError?.data?.message}
            </p>
            <div className="max-w-lg flex gap-5 justify-between items-center">
                <label className="font-bold" htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={onChangeUsername}
                    disabled={!isEditable}
                    ref={usernameRef}
                    className="bg-orange-100 flex-1 px-4 py-2 border-2 border-orange-300 rounded-lg text-sm"
                />
            </div>
            <div className="max-w-lg flex gap-5 justify-between items-center">
                <label className="font-bold" htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Contraseña [Vacía = Sin cambios]"
                    disabled={!isEditable}
                    className="bg-orange-100 flex-1 px-4 py-2 border-2 border-orange-300 rounded-lg text-sm"
                />
            </div>
            {!isEditable ? (
                <div className="flex">
                    <button
                        className="bg-orange-500 text-slate-50 px-4 py-2 rounded-lg hover:bg-orange-400"
                        onClick={onClickEdit}
                    >
                        Editar
                    </button>
                </div>
            ) : (
                <div className="flex gap-5">
                    <button
                        className="bg-green-500 text-slate-50 px-4 py-2 rounded-lg hover:bg-green-400"
                        onClick={onClickSave}
                        disabled={!isValid}
                    >
                        Guardar
                    </button>
                    <button
                        className="bg-red-500 text-slate-50 px-4 py-2 rounded-lg hover:bg-red-400"
                        onClick={onClickCancel}
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </form>
    );
};

export default AccountSettingForm;