import toast from "react-hot-toast";
import CoreRequest from "./core";

const { instance, apis } = new CoreRequest({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    config: {},
});

instance.interceptors.response.use(
    (response) => {
        if (
            response?.status.toString().startsWith("2") &&
            response?.data?.message
        ) {
            toast.success(response.data.message);
        }

        return response;
    },
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.data?.message ||
            "Could not reach the server";
        toast.error(message);
        return Promise.reject(error);
    },
);

export { apis, instance };
