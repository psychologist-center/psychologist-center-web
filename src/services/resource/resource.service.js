import { Result } from '@badrap/result'
import { api } from '../api'

const getAll = async () => {
  try {
    const url = `/resource/list`
    const {
      data: { data: resources },
    } = await api.get(url)

    return Result.ok(resources)
  } catch (error) {
    return Result.err(new Error('Erro ao buscar os Recursos.'))
  }
}

const create = async (resourceData) => {
  try {
    const url = `/resource/register`
    const {
      data: { message },
    } = await api.post(url, resourceData)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao cadastrar um Recurso.'))
  }
}

const update = async (resourceData) => {
  try {
    const url = `/resource/${resourceData.id}`
    const {
      data: { message },
    } = await api.put(url, resourceData)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao editar um Recurso.'))
  }
}

const remove = async (resourceId) => {
  try {
    const url = `/resource/${resourceId}`
    const {
      data: { message },
    } = await api.delete(url)

    return Result.ok(message)
  } catch (error) {
    return Result.err(new Error('Erro ao remover um Recurso.'))
  }
}

export const resourceService = {
  create,
  remove,
  getAll,
  update,
}

export default resourceService
