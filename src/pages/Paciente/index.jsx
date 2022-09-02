import React, { useState, useEffect } from 'react'
import { CustomTable } from '../../components/CustomTable'
import { api } from '../../services/api'

export function PacientePage() {
  const [pacientes, setPacientes] = useState([])
  const token = localStorage.getItem('@Auth:token')

  const columns = React.useMemo(
    () => [
      {
        Header: 'Meus Pacientes',
        columns: [
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'Endereço',
            accessor: 'address',
          },
          {
            Header: 'E-mail',
            accessor: 'email',
          },
          {
            Header: 'Gênero',
            accessor: 'genre',
          },

          {
            Header: 'Cidade',
            accessor: 'city',
          },
          {
            Header: 'Estado',
            accessor: 'state',
          },
        ],
      },
    ],
    [],
  )

  useEffect(() => {
    const getPacientes = async () => {
      const { data } = await api.get('/user/list/patient', {
        headers: { Authorization: 'Bearer ' + token },
      })

      setPacientes(data.data)
    }

    getPacientes()
  }, [])

  return <CustomTable columns={columns} data={pacientes} />
}
