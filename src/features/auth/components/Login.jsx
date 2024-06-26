import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useLocalStorage("username", "");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = useLocalStorage("persist", false);

    const [login] = useLoginMutation();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleClickHome = () => navigate("/");
    const handleChangeUsername = e => setUsername(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleChangePersist = () => setPersist(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername("");
            setPassword("");

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.status) {
                setErrMsg("No server response");
            } else if (err.status === 400) {
                setErrMsg("Username and password are required");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }

            errorRef.current.focus();
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-orange-50">
            <div className="bg-orange-100 shadow-lg p-5 flex flex-col gap-5 items-center rounded-lg w-80 md:w-96">
                <h1
                    onClick={handleClickHome}
                    className="font-black text-2xl text-orange-500 hover:cursor-pointer w-fit"
                >
                    NUTRIVIDA
                </h1>
                <h2 className="text-xl text-blue-500 font-medium">Iniciar sesión</h2>
                <p
                    ref={errorRef}
                    aria-live="assertive"
                    className={errMsg ? "text-orange-700 font-medium" : "hidden"}
                >
                    {errMsg}
                </p>
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
                        onChange={handleChangeUsername}
                        placeholder="Nombre de usuario"
                        className="p-2 rounded-lg w-full border-2 border-orange-300 font-medium"
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleChangePassword}
                        placeholder="Contraseña"
                        className="p-2 rounded-lg w-full border-2 border-orange-300 font-medium"
                    />
                    <button className="w-full bg-orange-500 text-slate-50 p-2 rounded-lg hover:bg-orange-400">Iniciar sesión</button>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="persist">¿Confiar en este dispositivo?</label>
                        <input
                            type="checkbox"
                            id="persist"
                            checked={persist}
                            onChange={handleChangePersist}
                        />
                    </div>
                </form>
                <p className="text-sm text-left w-full">
                    ¿Necesitas una cuenta?
                    <Link to="/register" className="font-medium text-blue-500 hover:text-orange-500"> Registrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;