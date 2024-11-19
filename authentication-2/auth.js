import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import {getUser, createUser} from './data/users.js'
dotenv.config();
const authRouter = express.Router();
const saltRounds = 12;



authRouter.post("/users", async (req, res) => {
    const {user, password} = req.body;

    const userRecord = await getUser(user);
    if (userRecord) {
        res.status(500).json({"error": "user already exists"});
        return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        await createUser(user, hashedPassword);
        res.status(200).json({"message": `created ${user}`});
    } catch (e) {
        res.status(500).json({"error": e.message});
    }
})


authRouter.post("/login", async (req, res) => {
    const {user, password} = req.body;

    try {
        const userRecord = await getUser(user);

        const match = await bcrypt.compare(password, userRecord.hashedpassword);
        if (match) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(500).json({"error": "error logging in"});
        }
    } catch (e) {
        res.status(500).json({"error": e.message});
        return;
    }


})



export {authRouter};