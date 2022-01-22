import { Request, Response } from "express";
import pool from "../../database";
import { hashPassword } from "../../lib/hashPassword";

const roles = ["user", "superadmin"];
export const CreaterUserController = async (req: Request, res: Response) => {
    try {
        const { username, password, fullname, role, description, phone } = req.body;
        if (!username || !password || !fullname || !role || !description || !phone) {
            return res.status(400).json({
                message: "Please send complete data",
                status: 400,
            });
        }
        const user = (await pool.query("SELECT * FROM users WHERE username=?", [username])) as any;
        if (user[0][0]) {
            return res.status(200).json({
                status: 200,
                message: "Username already exist",
            });
        }
        const [rolUser] = roles.filter((rol) => {
            return rol === role;
        });
        if (!rolUser)
            return res.status(400).json({
                message: "Invalid Role",
                status: 400,
            });
        const superadmin = (await pool.query("SELECT * FROM users WHERE role='superadmin'")) as any;
        if (role === "superadmin" && superadmin[0][0]) {
            return res.status(200).json({
                status: 200,
                message: "There is a superadmin user already",
            });
        }
        const hash = await hashPassword(password);
        const newUser = {
            username,
            password: hash,
            fullname,
            role,
            description,
            phone,
        };
        await pool.query("INSERT INTO users set ?", [newUser]);
        return res.status(200).json({
            status: 200,
            message: "New User created Successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Bad Request",
            status: 500,
        });
    }
};
