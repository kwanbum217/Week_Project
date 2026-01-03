import { toaster } from "../utils/chakra-toaster";

export const useToast = () => {
    return (options) => {
        toaster.create({
            title: options.title,
            description: options.description,
            type: options.status || "info", // Map 'status' (v2) to 'type' (v3)
            duration: options.duration || 3000,
        });
    };
};
