"use client"
import useStorage from "../hooks/useStoreg"
import fa from "../assets/locals/fa.json"
import en from "../assets/locals/en.json"
import { createContext } from "react";

interface CultureDTO {
    rtl: boolean;
    local : string;
    displayName: string;
}

export const defaultCulture : CultureDTO = {
    rtl: true,
    local: 'fa',
    displayName: 'فارسی'
}

interface CulturContectProps {
    culture:CultureDTO;
    setCulture: Function
}


export const CultureProviderContext = createContext<CulturContectProps>({
    culture: defaultCulture,
    setCulture: () => null
})

interface PropsDTO {
    children: React.ReactNode
}

export function CultureProvider(props:PropsDTO) {
    const [culture, setCulture] = useStorage<CultureDTO>('culture', defaultCulture)

    return (
        <CultureProviderContext.Provider value={{ culture, setCulture }}>
            {props.children}
        </CultureProviderContext.Provider>
    )
}


export const storedLocalizationState = (): CultureDTO => {
    try {
        const data = localStorage.getItem('culture')
        return data ? (JSON.parse(data) as CultureDTO) : defaultCulture

    } catch (err) {
        return defaultCulture

    }
}


const dictionaryList = {
    fa,
    en
}


export const Translate = (key:string): string => {
    const state = storedLocalizationState()
    // @ts-ignore
    const dict = JSON.parse(JSON.stringify(dictionaryList[state.local])) 

    if (dict) {
        return dict[key] || key
    }

    return key
}