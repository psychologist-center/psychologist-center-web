import { Result } from '@badrap/result'
import { api } from '../api'

const getAll = async () => {
  try {
    const url = `/user/list/patient`
    const {
      data: { data: patients },
    } = await api.get(url)

    return Result.ok(patients)
  } catch (error) {
    return Result.err(new Error('Erro ao buscar as Sessões.'))
  }
}

export const patientService = {
  getAll,
}

export default patientService
