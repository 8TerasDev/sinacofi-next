import React from 'react'
import localFont from 'next/font/local';
import "@fontsource/montserrat";

const sizeStyles = {
    xxxs: {
        fontSize: "10px",
        fontWeight: 400
    },
    xxs: {
        fontSize: "12px",
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
    fontWeight?: 400 | 500 | 700;
}
type Size = "xxxs" | "xxs" | "xs" | "xsWide" | "sm" | "mWide" | "sl" | "l" | "xl";
 
const SinaText = ({
    children,
    color = "var(--main-color)",
    size = "sm",
    lineHeight = "on",
    spacing = "off",
    font = "Montserrat",
    fontWeight,
  }: SinaTextProps) => {
    
    //const fontWithGilbert = font === 'Gilbert' ? gilbertFont.style.fontFamily : font;
    const fontWithGilbert = font === 'Gilbert' ? font : font;
    
    const style: any = {
        ...sizeStyles[size],
        fontWeight,
        color,
        fontFamily: fontWithGilbert,
        lineHeight: lineHeight === "on" && "133.4%",
        letterSpacing: spacing === "on" && "1.17px"
    };

    return <p style={style}>{children}</p>;
}

export default SinaText