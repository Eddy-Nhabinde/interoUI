import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const ToastNotification = () => {

    return (
        <div>
            <ToastContainer
                style={{zIndex: 10000}}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export const NetworkNotification = () => {

    return (
        <div>
            <ToastContainer
                style={{zIndex: 10000}}
                autoClose={false}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        </div>
    );
};

export const successMsg = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
    });
};

export const errorMsg = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
};
export const loginError = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.BOTTOM_CENTER
    });
};

export const offline = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const warnMsg = (msg) => {
    toast.warn(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
};

export const infoMsg = (msg) => {
    toast.info(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
};
