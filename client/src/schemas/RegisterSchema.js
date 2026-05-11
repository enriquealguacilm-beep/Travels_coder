import {z} from 'zod';

const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/

export const RegisterSchema = z.object({
  name: z
    .string({message:"Campo obligatorio"})
    .min(3,{message:"Debe ser mayor de 3 caracteres"})
    .max(50, {message:"Debe ser menor de 50 caracteres"}),
  lastname: z.
    string({message:"Campo obligatorio"})
    .min(3,{message:"Debe ser mayor de 3 caracteres"})
    .max(100, {message:"Debe ser menor de 100 caracteres"}),
  email: z
    .string({message:"Campo obligatorio"})
    .email({message:"email no válido"}),
  password: z
    .string({message:"Campo obligatorio"})
    .max(20, {message:"Debe ser de menos de 20 caracteres"})
    .regex(passRegEx, {message:"contraseña poco segura"}),
  repPassword: z
  .string()

}).refine((data)=> data.password === data.repPassword,
          {
            message:"Las contraseñas no coinciden",
            path:["repPassword"]
          }
        )