/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { notification } from 'antd';

import { useAppDispatch } from '../store';
import { signOutWithDelay } from '../reducers/thunks/auth.thunk';
import { HttpConfig } from '../config';


export function configure(contextConfig, accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';

    const instance = axios.create(contextConfig);

    return instance
}

export async function configureWith(request) {
    const config = Object.assign({}, HttpConfig, request);
    const { accessToken } = request;

    const instance = configure(config, accessToken);

    const response = await instance.request(config);

    if (isInstanceOfWrappedResponse(response.data)) {
        let schemedData = response.data;
        return schemedData.data;
    }
    else {
        throw new Error('Response format is malformed. it must be schemed as <WrappedResponse>')
    }
}

export function isInstanceOfWrappedResponse(arg) {
    let value = (arg);
    return value.status !== undefined;
}

export function useApi(
    defaultResponseData
) {
    const dispatch = useAppDispatch();
    const { accessToken } = useSelector((state) => state.auth);

    const [isMounted, setIsMounted] = useState(false)

    const [responseData, setResponseData] = useState();

    const [initialLoad, setInitialLoad] = useState(true);
    const [isSuccess, setIsSuccess] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [status, setStatus] = useState();

    const sendRequest = (req) => {
        return new Promise((resolve, reject) => {
            (async () => {
                setLoading(true);
                setIsSuccess(undefined);
                if (error) {
                    setError(undefined);
                }
                try {
                    let headers = {
                        ...HttpConfig.headers,
                        ...req.headers
                    }
                    let extras = {};

                    const config = Object.assign({}, HttpConfig, req, { headers }, extras);
                    const instance = configure(config, accessToken);

                    const response = await instance.request(config);

                    let successStatuses = [200, 201, 202];
                    if (successStatuses.includes(response.status)) {
                        if (isInstanceOfWrappedResponse(response.data)) {
                            let schemedData = response.data;

                            setStatus((_) => response.status);
                            setResponseData((_) => schemedData.data);
                            resolve(schemedData);
                            setIsSuccess(() => true);
                            setLoading((_) => false);
                        }
                        else {
                            let messages = response?.data?.messages
                            let message = Array.isArray(messages) ? messages.join(", ") : messages;

                            throw new Error(message)
                        }
                    }
                    else {
                        let messages = response?.data?.messages;
                        let message = Array.isArray(messages) ? messages.join(", ") : messages;

                        throw new Error(message)
                    }
                } catch (err) {
                    let code = err?.response?.status;
                    if (accessToken && code === 401) {
                        dispatch(signOutWithDelay(undefined));
                    }
                    else {
                        let message = err?.response?.data?.message || err.message


                        if (!(typeof message === 'string' || message instanceof String)) {
                            message = 'Network Error';
                        }
                        setError(message);
                        reject(message);

                        setIsSuccess(false);
                        setLoading(false);

                        if (code === 500) {
                            let description = message || 'Contact your administrator for more information';
                            notification.open({
                                type: 'error',
                                message: 'Something has been gone wrong!',
                                description,
                                duration: 3
                            });
                        }
                    }
                }
                finally {
                    if (isMounted) {
                        setLoading(false);
                        if (initialLoad) {
                            setInitialLoad(false);
                        }
                    }
                }
            })();
        });
    };

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

    return [
        {
            loading,
            isSuccess,
            error: (loading === true) ? '' : error,
            data: responseData || defaultResponseData,
            status,
            initialLoad,
            pendingOrLoading: initialLoad || loading,
        },
        sendRequest,
    ];
};

export default useApi;