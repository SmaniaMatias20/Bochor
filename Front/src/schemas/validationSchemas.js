import { z } from 'zod';


export const schemaLogin = z.object({
  username: z.string()
    .min(2, {
      message: "El nombre de usuario debe tener por lo menos 2 caracteres.",
    })
    .max(15, {
      message: "El nombre de usuario debe tener como máximo 15 caracteres.",
    }),


  password: z.string()
    .min(2, {
      message: "La contraseña debe tener por lo menos 2 caracteres.",
    })
    .max(20, {
      message: "La contraseña debe tener como máximo 20 caracteres.",
    })

});

export const schemaPrueba = z.object({
  idequipo: z.string()
    .min(3, { message: "El ID del equipo debe tener un minimo 3 caracteres." })
    .max(20, { message: "El ID del equipo debe tener como máximo 20 caracteres." }),

  idestacion: z.string()
    .min(1, { message: "El ID de la estación debe tener un minimo 1 caracter." })
    .max(3, { message: "El ID de la estación debe tener como máximo 3 caracteres." })
    .regex(/^\d+$/, { message: "El ID de la estación debe ser un número." }) // Asegura que solo sean números
});


export const schemaUsuario = z.object({
  usuario: z.string()
    .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    .max(15, { message: 'El nombre de usuario no puede tener más de 15 caracteres' })
    .regex(/^[a-z0-9]+$/, { message: 'El nombre de usuario debe estar en minúsculas y sin espacios' }),

  password: z.string()
    .min(9, { message: 'La contraseña debe tener al menos 9 caracteres' })
    .max(15, { message: 'La contraseña no puede tener más de 15 caracteres' }),

  rol: z.string().nonempty({ message: 'El rol es obligatorio' }),
});