import { CustomTable } from '../../../../components/CustomTable'
import { dateFormat } from '../../../../utils/helpers/dateFormat'

const ResourceTable = ({ resources, onClick }) => {
  const columns = [
    {
      Header: 'Recursos',
      columns: [
        {
          Header: 'Nome',
          accessor: 'title',
        },
        {
          Header: 'Descrição',
          accessor: 'description',
        },
        {
          Header: 'Categoria',
          accessor: 'category',
        },
        {
          Header: 'Data de criação',
          accessor: 'create_date',
          Cell: (props) => <div> {dateFormat(props.value)}</div>,
        },
      ],
    },
  ]
  return (
    <CustomTable
      columns={columns}
      data={resources}
      setSelectedPatient={onClick}
      onOpen={() => {}}
    />
  )
}

export default ResourceTable
