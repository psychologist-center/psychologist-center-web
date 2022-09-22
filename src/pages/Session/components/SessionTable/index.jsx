import { CustomTable } from '../../../../components/CustomTable'
import { dateFormat } from '../../../../utils/helpers/dateFormat'

const SessionTable = ({ sessions, onClick }) => {
  const statusInterface = ['Agendado', 'Cancelado', 'Atendido']
  const sessionTypeInterface = ['Individual', 'Dupla', 'Grupo']
  const columns = [
    {
      Header: 'Minhas Sessões',
      columns: [
        {
          Header: 'Paciente',
          accessor: 'patient',
          Cell: (props) => (
            <div>{props.value.map((p) => p.name).join(', ')}</div>
          ),
        },
        {
          Header: 'Data de agendamento',
          accessor: 'appointment_date',
          Cell: (props) => <div>{dateFormat(props.value)}</div>,
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: (props) => <div>{sessionTypeInterface[props.value]}</div>,
        },
        {
          Header: 'Tema abordado',
          accessor: 'topic',
        },

        {
          Header: 'Duração',
          accessor: 'duration',
          Cell: (props) => <div>{`${props.value} min`}</div>,
        },
        {
          Header: 'Tipo de sessão',
          accessor: 'session_type',
          Cell: (props) => <div>{statusInterface[props.value]}</div>,
        },
      ],
    },
  ]
  return (
    <CustomTable
      columns={columns}
      data={sessions}
      setSelectedPatient={onClick}
      onOpen={() => {}}
    />
  )
}

export default SessionTable
