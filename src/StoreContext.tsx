import React from 'react';
import {StoreType} from './redux/store';


export const StoreContext = React.createContext<StoreType>({} as StoreType)

export const Provider = (props: {store: StoreType, children: React.ReactNode}) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

