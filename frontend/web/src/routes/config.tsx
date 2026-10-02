import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import HomePage from "~pages/home";

const RoutesConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesConfig;
