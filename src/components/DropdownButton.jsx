import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSignoutMutation } from "../features/auth/authApiSlice";

const DropdownButton = ({ title }) => {
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);

    const [logout, { isSuccess }] = useSignoutMutation();

    useEffect(() => {
        const onClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", onClickOutside);

        return () => document.removeEventListener("click", onClickOutside);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const onClickButton = () => setOpen(prev => !prev);
    const onClickHome = () => navigate("/");
    const onClickSignOut = () => logout();
    const onClickProfile = () => navigate("/profile");
    const onClickSearch = () => navigate("/recipes");
    const onClickSuggest = () => navigate("/suggest");

    return (
        <div
            className="bg-orange-500 text-sm hover:bg-orange-400 border-2 border-orange-500 text-white flex justify-center items-center relative px-3 py-1 rounded-lg hover:cursor-pointer"
            onClick={onClickButton}
            onBlur={onClickButton}
            ref={dropdownRef}
        >
            <div className="flex justify-center items-center gap-2">
                <h6>{title}</h6>
                {!open ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className={`transition-transform transition-opacity duration-100 ${open ? "transform scale-y-100 opacity-100" : "transform scale-y-0 opacity-0"} absolute top-10 bg-orange-400 flex flex-col justify-center items-center rounded-lg w-full text-bold`}
            >
                <div
                    className="rounded-t-lg w-full py-2 flex justify-center hover:bg-orange-300"
                    onClick={onClickHome}
                >
                    Home
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-orange-300"
                    onClick={onClickSearch}
                >
                    Buscar
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-orange-300"
                    onClick={onClickSuggest}
                >
                    Sugerecias
                </div>
                <div
                    className="w-full py-2 flex justify-center hover:bg-orange-300"
                    onClick={onClickProfile}
                >
                    Perfil
                </div>
                <div
                    className="rounded-b-lg w-full py-2 flex justify-center text-blue-700 hover:bg-orange-300"
                    onClick={onClickSignOut}
                >
                    Cerrar sesión
                </div>
            </div>
        </div>
    );
};

export default DropdownButton;