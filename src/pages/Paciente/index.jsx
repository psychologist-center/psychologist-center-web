import React, { useState, useEffect } from 'react'
import { CustomTable } from '../../components/CustomTable'
import { InitialFocus } from '../../components/Modal'
import { api } from '../../services/api'
import { Flex } from '@chakra-ui/react'

const formData = [
  {
    labelText: 'Nome',
    placeholder: 'David Augusto',
    inputType: 'text',
    name: 'name',
  },
  {
    labelText: 'E-mail',
    placeholder: 'davidaugusto@gmail.com',
    inputType: 'email',
    name: 'email',
  },
  {
    labelText: 'CPF',
    placeholder: '23232312334',
    inputType: 'number',
    name: 'cpf',
  },
  {
    labelText: 'Gênero',
    placeholder: 'São Paulo',
    inputType: 'select',
    name: 'genre',
    options: [
      {
        value: 'M',
        label: 'Homem',
      },
      {
        value: 'F',
        label: 'Mulher',
      },
      {
        value: 'NB',
        label: 'Não binário',
      },
      {
        value: 'NI',
        label: 'Prefiro não informar',
      },
    ],
  },
  {
    labelText: 'Data de Aniversário',
    placeholder: '10/08/2003',
    inputType: 'date',
    name: 'birth_date',
  },
  {
    labelText: 'Endereço',
    placeholder: 'Avenida Paulista, 1400',
    inputType: 'text',
    name: 'address',
  },
  {
    labelText: 'Cidade',
    placeholder: 'São Paulo',
    inputType: 'text',
    name: 'city',
  },
  {
    labelText: 'Estado',
    placeholder: 'SP',
    inputType: 'text',
    name: 'state',
  },
]

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

  return (
    <Flex direction="column" alignItems="center" mt="8%">
      <InitialFocus title="Registrar Paciente" formData={formData} />
      <CustomTable columns={columns} data={pacientes} />
    </Flex>
  )
}
