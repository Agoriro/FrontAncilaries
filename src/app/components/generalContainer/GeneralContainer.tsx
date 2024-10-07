import React from "react"
interface generalConatinerI {
    width: string,
    height: string,
    styleAditionals?: string,
    styleAditionalsSecond?: string,
    children: React.ReactNode
}
export const GeneralContainer: React.FC<generalConatinerI> = ({ width, height, children, styleAditionals, styleAditionalsSecond }) => {
    return (
        <div className={`shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg p-8 my-10 ${width} ${height} ${styleAditionals}`}>
            <div className={styleAditionalsSecond}>
                {children}
            </div>
        </div>

    )
}
