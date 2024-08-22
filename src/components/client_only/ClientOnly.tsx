import dynamic from "next/dynamic";
import React from "react";


interface PropsDTO {
    children: React.ReactNode 
}

function ClientOnly(props:PropsDTO) {
    const {children} = props;

    return children;
};

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false });