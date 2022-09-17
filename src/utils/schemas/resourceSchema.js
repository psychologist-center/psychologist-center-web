import { enum as zodEnum, string, object } from 'zod'

const resourceValidatorSchema = object({
  id: string(),
  title: string().min(1, 'O campo não pode ser vazio'),
  description: string(),
  category: zodEnum(['metáfora', 'transe', 'ferramenta'], {
    errorMap: (issue, ctx) => {
      return {
        message:
          'O campo categoria deve possuir um dos seguintes valores: metáfora, transe ou ferramenta',
      }
    },
  }),
})

export { resourceValidatorSchema }
