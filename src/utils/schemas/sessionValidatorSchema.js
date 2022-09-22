import { enum as zodEnum, string, object, date, preprocess } from 'zod'

const sessionValidatorSchema = object({
  id: string(),
  patient_id: string().array().nonempty('O campo não pode ser vazio'),
  appointment_date: preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    },
    date({
      errorMap: (issue, ctx) => {
        return {
          message: 'Selecione uma data válida',
        }
      },
    }),
  ),
  status: preprocess(
    (arg) => (typeof arg === 'number' ? arg.toString() : arg),
    zodEnum(['0', '1', '2'], {
      errorMap: (issue, ctx) => {
        return {
          message:
            'O campo categoria deve possuir um dos seguintes valores: agendado, cancelado ou atendido',
        }
      },
    }),
  ),
  session_type: preprocess(
    (arg) => (typeof arg === 'number' ? arg.toString() : arg),
    zodEnum(['0', '1', '2'], {
      errorMap: (issue, ctx) => {
        return {
          message:
            'O campo categoria deve possuir um dos seguintes valores: individual, dupla ou grupo',
        }
      },
    }),
  ),
  topic: string().min(1, 'O campo não pode ser vazio'),
  resource_ids: string().array(),
  duration: preprocess(
    (arg) => (typeof arg === 'number' ? arg.toString() : arg),
    string(),
  ),
})

export { sessionValidatorSchema }
