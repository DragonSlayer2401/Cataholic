'use client';
import ReduxProvider from "../Provider/ReduxProvider";

const ReduxWrapper = ({children}) => {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}
 
export default ReduxWrapper;