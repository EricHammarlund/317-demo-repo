import dotenv from 'dotenv';
import express from 'express';
import {getUser, createUser} from './data/users.js'
dotenv.config();
const authRouter = express.Router();





export {authRouter};