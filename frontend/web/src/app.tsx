import { Toaster } from "react-hot-toast";
import MaterialThemeProvider from "~material/provider";
import RoutesConfig from "./routes/config";

const App = () => {
    return (
        <MaterialThemeProvider>
            <Toaster position="top-center" />
            <RoutesConfig />
        </MaterialThemeProvider>
    );
};

export default App;
