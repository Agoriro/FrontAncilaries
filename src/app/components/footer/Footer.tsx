import React from "react"
import { AviaturLogo } from "../icons/Icons"

export const Footer = () => {
    return (
        <footer className="bg-[#F2F2F2] w-full flex justify-center items-center flex-col h-[18vh] text-xs">
            <>
                <AviaturLogo />
                <span className="mt-4">Aviatur - 2024© | Todos los derechos reservados</span>
            </>
        </footer>
    )
}
