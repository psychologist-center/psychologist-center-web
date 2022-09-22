import React, { useState, useEffect } from 'react'

import { Flex, Spinner, useToast } from '@chakra-ui/react'
import AddButton from '../../components/AddButton'
import SessionTable from './components/SessionTable'
import sessionService from '../../services/session/session.service'
import SessionModal from './components/SessionModal'

export function SessionPage() {
  const toast = useToast()
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const defaultSession = {
    id: '',
    patient_id: [],
    appointment_date: '',
    status: '',
    session_type: '',
    resource_ids: [],
    duration: '',
    topic: '',
  }
  const [selectedSession, setSelectedSession] = useState(defaultSession)
  const [refresh, setRefresh] = useState(Math.random())

  const handleOnAddSession = () => {
    setSelectedSession(defaultSession)
    setIsModalOpen(true)
  }
  const handleOnClickSession = (session) => {
    const {
      _id: id,
      patient,
      // eslint-disable-next-line camelcase
      appointment_date,
      status,
      // eslint-disable-next-line camelcase
      session_type,
      // eslint-disable-next-line camelcase
      resource_ids,
      duration,
      topic,
    } = session
    setSelectedSession({
      id,
      patient_id: patient.map((p) => p._id),
      // eslint-disable-next-line camelcase
      appointment_date,
      status,
      // eslint-disable-next-line camelcase
      session_type,
      // eslint-disable-next-line camelcase
      resource_ids,
      duration,
      topic,
    })
    setIsModalOpen(true)
  }
  const handleOnCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleOnDeleteModal = async (id) => {
    setIsLoading(true)
    const result = await sessionService.remove(id)
    const message = result.isErr ? result.error.message : result.value
    toast({
      title: message,
      status: result.isErr ? 'error' : 'success',
      isClosable: true,
      position: 'top-right',
    })
    setIsLoading(false)
    setRefresh(Math.random())
    handleOnCloseModal()
  }
  const handleOnSubmitModal = async (sessionData) => {
    setIsLoading(true)
    const result = sessionData.id.length
      ? await sessionService.update(sessionData)
      : await sessionService.create(sessionData)
    const message = result.isErr ? result.error.message : result.value
    toast({
      title: message,
      status: result.isErr ? 'error' : 'success',
      isClosable: true,
      position: 'top-right',
    })
    setIsLoading(false)
    setRefresh(Math.random())
    handleOnCloseModal()
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await sessionService.getAll()
      if (result.isErr) {
        toast({
          title: result.error.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
        })
      }

      setSessions(result.value)
    }
    fetchData().then(() => {
      setIsLoading(false)
    })
  }, [toast, refresh])

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand-purple"
          size="xl"
        />
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center">
      <AddButton
        label="Adicionar sessão"
        onClick={handleOnAddSession}
        disabled={isLoading}
      />
      <SessionTable onClick={handleOnClickSession} sessions={sessions} />
      <SessionModal
        isOpen={isModalOpen}
        onClose={handleOnCloseModal}
        session={selectedSession}
        onDelete={handleOnDeleteModal}
        onSubmit={handleOnSubmitModal}
      />
    </Flex>
  )
}
