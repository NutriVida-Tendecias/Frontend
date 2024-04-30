import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCreateUserMutation } from "../usersApiSlice";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [createUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateUserMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);

        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword]);

    useEffect(() => {
        if (isSuccess) {
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        }
    }, [isSuccess, navigate]);

    const handleClickHome = () => navigate("/");

    const handleChangeUsername = e => setUsername(e.target.value);
    const handleFocusUsername = () => setUsernameFocus(true);
    const handleBlurUsername = () => setUsernameFocus(false);

    const handleChangePassword = e => setPassword(e.target.value);
    const handleFocusPassword = () => setPasswordFocus(true);
    const handleBlurPassword = () => setPasswordFocus(false);

    const handleChangeConfirmPassword = e => setConfirmPassword(e.target.value);
    const handleFocusConfirmPassword = () => setConfirmPasswordFocus(true);
    const handleBlurConfirmPassword = () => setConfirmPasswordFocus(false);

    const isSubmittable = validUsername && validPassword && validConfirmPassword && !isLoading;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmittable) {
            await createUser({ username, password });
        }
    };

    let registerInstruction = null;
    if (username && !validUsername) {
        registerInstruction = (
            <div
                id="username-note"
                className="text-sm rounded-lg bg-orange-300 text-slate-50 p-3 w-full h-32"
            >
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} /> Nombre de usuario no válido
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> De 4 a 24 caracteres.
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Debe comenzar con una letra.
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Se permiten letras, números, guiones bajos y guiones.
                </p>
            </div>
        );
    } else if (password && !validPassword) {
        registerInstruction = (
            <div
                id="password-note"
                className="text-sm rounded-lg bg-orange-300 text-slate-50 p-3 w-full h-32"
            >
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} /> Invalid Password
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> De 8 a 24 caracteres.
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.
                </p>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Caracteres especiales permitidos:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                </p>
            </div>
        );
    } else if (confirmPassword && !validConfirmPassword) {
        registerInstruction = (
            <div
                id="confirm-note"
                className="text-sm rounded-lg bg-orange-300 text-slate-50 p-3 w-full h-32"
            >
                <p><FontAwesomeIcon icon={faInfoCircle} /> La contraseña no coincide</p>
                <p><FontAwesomeIcon icon={faCheck} /> Debe coincidir con el primer campo de entrada de contraseña.</p>
            </div>
        );
    } else if (
        (username && validUsername) &&
        (password && validPassword) &&
        (confirmPassword && validConfirmPassword)
    ) {
        registerInstruction = null;
    } else {
        registerInstruction = (
            <div className="text-sm rounded-lg bg-orange-300 text-slate-50 p-3 w-full h-32">
                <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    {" Por favor ingrese nombre de usuario y contraseña para registrarse."}
                </p>
            </div>
        );
    }

    return (
        <main className="h-screen flex justify-center items-center bg-orange-50">
            <div className="bg-orange-100 shadow-lg p-5 flex flex-col gap-5 items-center rounded-lg w-80 md:w-96">
                <h1
                    onClick={handleClickHome}
                    className="font-black text-2xl text-orange-500 hover:cursor-pointer w-fit"
                >
                    NUTRIVIDA
                </h1>
                <h2 className="text-xl text-blue-500 font-medium">Registrarse</h2>
                <p
                    ref={errorRef}
                    aria-live="assertive"
                    className={isError ? "text-red-500 font-medium" : "hidden"}
                >
                    {error?.data?.message}
                </p>
                <p
                    className={isSuccess ? "text-green-500 font-medium" : "hidden"}
                >
                    Registrado exitosamente
                </p>
                {registerInstruction}
                <form
                    className="flex flex-col gap-5 w-full text-sm"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        id="username"
                        ref={usernameRef}
                        autoComplete="off"
                        required
                        value={username}
                        aria-invalid={!validUsername}
                        aria-describedby="username-note"
                        onChange={handleChangeUsername}
                        onFocus={handleFocusUsername}
                        onBlur={handleBlurUsername}
                        placeholder="Nombre de usuario"
                        className={`p-2 rounded-lg w-full border-2 font-medium ${(!validUsername && username) ? "border-orange-500" : "border-orange-300"}`}
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        aria-invalid={!validPassword}
                        aria-describedby="password-note"
                        onChange={handleChangePassword}
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}
                        required
                        placeholder="Contraseña"
                        className={`p-2 rounded-lg w-full border-2 font-medium ${(!validPassword && password) ? "border-orange-500" : "border-orange-300"}`}
                    />
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        onFocus={handleFocusConfirmPassword}
                        onBlur={handleBlurConfirmPassword}
                        placeholder="Confirmar Contraseña"
                        className={`p-2 rounded-lg w-full border-2 font-medium ${(!validConfirmPassword && confirmPassword) ? "border-orange-500" : "border-orange-300"}`}
                    />
                    <button
                        className="w-full bg-orange-500 text-slate-50 p-2 rounded-lg hover:bg-orange-400 hover:cursor-pointer"
                        disabled={!isSubmittable}
                    >
                        Registrarse
                    </button>
                </form>
                <p className="text-sm text-left w-full">
                ¿Ya tienes una cuenta?
                    <Link to="/login" className="font-medium text-blue-500 hover:text-orange-500"> Iniciar Sesión</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;