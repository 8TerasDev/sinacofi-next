import { NextResponse } from "next/server";

export const processError = (error: any) => {
    if (error.name && error.name === "TokenExpiredError") {
        return NextResponse.json({ "message": "token expired" }, {
            status: 401,
        });
    }
    if (error.name && error.name == "PermissionError") {
        return NextResponse.json({ "message": error.message }, {
            status: 403,
        });
    }
    return NextResponse.json({ message: error.toString() }, {
        status: 500,
    });
}
