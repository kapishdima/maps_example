import { useLocation, useNavigate } from "react-router-dom";

export const useNavigateLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToLogin = () => {
        navigate("/login", {
            replace: true,
            state: { from: location },
        });
    };

    return navigateToLogin;
};
