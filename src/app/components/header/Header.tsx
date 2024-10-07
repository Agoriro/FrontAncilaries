import React from "react"
import { AviaturLogo } from "../icons/Icons"
import Link from "next/link"
export const Header = () => {
  return (
    <div className="shadow-md w-full sticky flex justify-center">
      <Link href={"/"} className="cursor-pointer">
        <AviaturLogo />
      </Link>

    </div>
  )
}
