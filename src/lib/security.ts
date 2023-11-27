import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getSessionUser = (req: NextRequest) => {
    const cookies = req.cookies;
    const auth = cookies.get("auth")
    if (!auth) {
        throw new Error("no token");
    }
    const user: any = verify(`${auth?.value}`, "secret")
    return user
}

class PermissionError extends Error {
    permission: string;
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
        this.permission = 'admin'
    }
}

export const validateAdminPermission = (user: any) => {
    if ( !(user.isAdmin || user.isBankAdmin) ) {
        throw new PermissionError("El usuario no tiene los permisos necesarios")
    }
}
