import { Request, Response } from "express";
import pool from "../../database";
import { SuperadminProfile } from "../../lib/reducers/SuperadminProfile";
import { User } from "../../models/users";

export const GetMainProfile = async (req: Request, res: Response) => {
    try {
        const response = (await pool.query("SELECT * FROM users WHERE role='superadmin'")) as any;
        const superadmin = response[0][0] as User;
        const links = (await pool.query("SELECT * FROM social_links WHERE user_id=?", [superadmin.id])) as any;
        const user = new SuperadminProfile(superadmin, links[0][0]);
        return res.status(200).json({
            message: "Main profile got successfully",
            profile: user,
        });
    } catch (err: any) {
        return res.status(400).json({
            message: "Server is not responding",
            status: 401,
        });
    }
};
