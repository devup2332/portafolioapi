import { Request, Response } from "express";
import pool from "../../database";
import { comparePassword } from "../../lib/comparePasswords";
import { generateToken } from "../../lib/generateToken";
import { User } from "../../models/users";

export const LoginUserController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const response = (await pool.query("SELECT * FROM users WHERE username=?", [username])) as any;
    const user = response[0][0] as User;

    if (!user)
        return res.status(200).json({
            message: "User dosent exist",
            status: 401,
        });
    const match = await comparePassword(password, user.password);
    if (!match)
        return res.status(200).json({
            message: "Password is incorrect",
            status: 401,
        });
    const token = generateToken(user);

    if (user.role === "superadmin") {
        return res.status(200).json({
            message: "Login superadmin successfully",
            status: 200,
            token,
            role: user.role,
        });
    }
    return res.status(200).json({
        message: "Loggin Successfully",
        status: 200,
        token,
        role: user.role,
    });
};
