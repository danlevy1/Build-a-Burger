import { useState, useEffect } from "react";

const useHttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use((request) => {
        setError(null);
        return request;
    });
    const responseInterceptor = httpClient.interceptors.response.use(
        (response) => response,
        (err) => {
            setError(err);
        }
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    }, [
        requestInterceptor,
        responseInterceptor,
        httpClient.interceptors.request,
        httpClient.interceptors.response,
    ]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
};

export default useHttpErrorHandler;
