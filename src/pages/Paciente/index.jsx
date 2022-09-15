import React, { useState, useEffect } from 'react'
import { CustomTable } from '../../components/CustomTable'
import { api } from '../../services/api'
import { Flex, useDisclosure, Button } from '@chakra-ui/react'
import { PlusCircle } from 'phosphor-react'
import { columns } from '../../utils/constants/patientsColumn'
import { ViewPatientModal } from '../../components/ViewPatientModal'
import { AddPatientModel } from '../../components/AddPatientModel'

export function PacientePage() {
  const [pacientes, setPacientes] = useState([])
  const addPatient = useDisclosure()
  const viewPatient = useDisclosure()
  const [selectedPatient, setSelectedPatient] = useState({})

  useEffect(() => {
    const getPacientes = async () => {
      const { data } = await api.get('/user/list/patient')

      setPacientes(data.data)
    }

    getPacientes()
  }, [])

  return (
    <Flex direction="column" alignItems="center" mt="8%">
      <Button
        bg="brand-purple"
        color="base-white"
        _hover={{
          background: 'brand-purple-hover',
          color: 'base-white',
        }}
        onClick={addPatient.onOpen}
      >
        <Flex justifyContent="center" align="center" gap="2">
          <PlusCircle size={23} weight="fill" /> Adicionar Paciente
        </Flex>
      </Button>

      <AddPatientModel setPacientes={setPacientes} addPatient={addPatient} />

      <ViewPatientModal
        setPacientes={setPacientes}
        viewPatient={viewPatient}
        data={selectedPatient}
      />

      <CustomTable
        setSelectedPatient={setSelectedPatient}
        columns={columns}
        data={pacientes}
        onOpen={viewPatient.onOpen}
      />
    </Flex>
  )
}
