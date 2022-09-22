import { Result } from '@badrap/result'
import { api } from '../api'

const getAll = async () => {
  try {
    const url = `/session/list`
    const {
      data: { data: sessions },
    } = await api.get(url)

    return Result.ok(sessions)
  } catch (error) {
    return Result.err(new Error('Erro ao buscar as Sessões.'))
  }
}

const create = async (sessionData) => {
  try {
    const url = `/session/register`
    const {
      data: { message },
    } = await api.post(url, sessionData)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao cadastrar uma Sessão.'))
  }
}

const update = async (sessionData) => {
  try {
    const url = `/session/${sessionData.id}`
    const {
      data: { message },
    } = await api.put(url, sessionData)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao editar uma Sessão.'))
  }
}

const remove = async (sessionId) => {
  try {
    const url = `/session/${sessionId}`
    const {
      data: { message },
    } = await api.delete(url)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao remover uma Sessão.'))
  }
}

export const sessionService = {
  getAll,
  create,
  update,
  remove,
}

export default sessionService
