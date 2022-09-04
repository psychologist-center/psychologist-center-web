import { validate } from 'gerador-validador-cpf'
import * as zod from 'zod'

export const patientValidatorSchema = zod.object({
  name: zod.string().min(1, 'O campo nome não pode ser vazio'),
  email: zod.string().email('Digite um e-mail válido'),
  cpf: zod.custom(validate, { message: 'Digite um CPF válido' }),
  genre: zod.enum(['M', 'F', 'NB', 'NI'], ' Selecione um gênero válido'),
  birth_date: zod.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    },
    zod.date({
      required_error: 'Selecione uma data válida',
      invalid_type_error: 'Selecione uma data válida',
    }),
  ),
  address: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  city: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  state: zod
    .string()
    .min(2, 'O estado deve ter dois caracteres')
    .max(2, 'O estado deve ter dois caracteres'),
})

export const patientEditValidatorSchema = zod.object({
  name: zod.string().min(1, 'O campo nome não pode ser vazio'),
  email: zod.string().email('Digite um e-mail válido'),
  address: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  city: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  state: zod
    .string()
    .min(2, 'O estado deve ter dois caracteres')
    .max(2, 'O estado deve ter dois caracteres'),
})
