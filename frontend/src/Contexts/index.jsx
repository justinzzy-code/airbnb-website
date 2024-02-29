import {createContext} from 'react';

export const APIContext = createContext({
    token: 0,
    setToken : () => {},
    link: "http://127.0.0.1:8000",
    setLink : () => {}
})
