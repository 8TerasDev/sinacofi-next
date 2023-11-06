import React from 'react'

const sizeStyles = {
    xxs: {
        fontSize: "10px",
        fontWeight: 400
    },
    xs: {
        fontSize: "14px",
        fontWeight: 400
    },
    xsWide: {
        fontSize: "14px",
        fontWeight: 600
    },
    sm: {
        fontSize: "18px",
        fontWeight: 400
    },
    mWide: {
        fontSize: "32px",
        fontWeight: 700
    },
    sl: {
        fontSize: "28px",
        fontWeight: 700
    },
    l: {
        fontSize: "35px",
        fontWeight: 500
    },
    xl: {
        fontSize: "60px",
        fontWeight: 700
    }
};


type SinaTextProps = {
    children: React.ReactNode
    color?: string;
    size?: Size;
    lineHeight?: "on" | "off";
    spacing?: "on" | "off";
    font?: "Montserrat" | "Gilbert" | "Roboto";
}
type Size = "xxs" | "xs" | "xsWide" | "sm" | "mWide" | "sl" | "l" | "xl";

const SinaText = ({
    children,
    color = "var(--main-color)",
    size = "sm",
    lineHeight = "on",
    spacing = "off",
    font = "Montserrat" }: SinaTextProps) => {

    const style: any = {
        ...sizeStyles[size],
        color: color,
        fontFamily: font,
        lineHeight: lineHeight === "on" && "133.4%",
        spacing: spacing === "on" && "0.17px"
    };

    return (
        <>
            <p style={style}>{children}</p>
        </>
    )
}

export default SinaText