import React, { useState, useEffect } from 'react'

import { api } from '../../services/api'
import moment from 'moment/moment'
import { CustomTable } from '../../components/CustomTable'

export function SessionPage() {
  const [sessoes, setSessoes] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Minhas Sessões',
        columns: [
          {
            Header: 'Paciente',
            accessor: 'pacients',
          },
          {
            Header: 'Data de agendamento',
            accessor: 'appointment_date',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Tema abordado',
            accessor: 'topic',
          },

          {
            Header: 'Duração',
            accessor: 'duration',
          },
          {
            Header: 'Tipo de sessão',
            accessor: 'session_type',
          },
        ],
      },
    ],
    [],
  )

  useEffect(() => {
    const statusInterface = ['Agendado', 'Cancelado', 'Atendido']
    const sessionTypeInterface = ['Individual', 'Dupla', 'Grupo']
    const getSessoes = async () => {
      const { data } = await api.get('/session/list')

      const newData = data.data.map((session) => {
        const pacientList = []

        for (const i in session.patient) {
          pacientList.push(session.patient[i].name)
        }

        return {
          pacients: pacientList.join(', '),
          status: statusInterface[session.status],
          topic: session.topic,
          duration: `${session.duration} min`,
          appointment_date: moment(session.appointment_date)
            .subtract(10, 'days')
            .calendar(),
          session_type: sessionTypeInterface[session.session_type],
        }
      })

      setSessoes(newData)
    }

    getSessoes()
  }, [])

  return (
    <>
      <CustomTable columns={columns} data={sessoes} />
    </>
  )
}
