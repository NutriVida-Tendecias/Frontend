import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { DropdownButton } from "../../../components";
import { useSignoutMutation } from "../authApiSlice";

const AuthButton = () => {
    const location = useLocation();

    const { username, isAuth } = useAuth();

    const [logout] = useSignoutMutation();

    if (isAuth) {
        return (
            <DropdownButton title={username} logout={logout} />
        );
    } else {
        return (
            <Link className="rounded-lg border-2 border-orange-500 bg-orange-500 text-white px-3 py-1 hover:bg-orange-400" to="/login" state={{ from: location }}>
                Iniciar sesión
            </Link>
        );
    }
};

export default AuthButton;