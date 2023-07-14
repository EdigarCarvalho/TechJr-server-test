import { Router, Request, Response } from 'express'
import registerService from '../services/users/register.service'
import loginService from '../services/users/login.service'

export async function registerController (req: Request, res: Response){
    const data = req.body as { email: string, password: string, name: string }; 
 
    const user = await registerService(data);
    
    res.status(201).json({ message: "Usuário criado com sucesso :) ", user});
}

export async function loginController (req: Request, res: Response) {
    const { email } = req.body as { email: string }

    const token = await loginService(email)

    res.status(200).json({ token})
}