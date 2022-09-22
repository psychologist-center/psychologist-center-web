/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import '@fullcalendar/react/dist/vdom'

import FullCalendar, { EventClickArg } from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { Button, ModalFooter, Text, useDisclosure } from '@chakra-ui/react'

import { api } from '../../services/api'
import { format } from 'date-fns'

import './style.css'
import { TemplateModal } from '../../components/TemplateModal'

interface Session {
  _id: string
  appointment_date: Date
  patient: {
    name: string
    email: string
  }
  topic: string
  duration: string
}
interface FormattedSession {
  title: string
  date: string
  id: string
}

export const SchedulePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [sessions, setSessions] = useState(Array<Session>)
  const [session, setSession] = useState({} as Session)

  const [formattedSessions, setFormattedSessions] = useState(
    Array<FormattedSession>,
  )

  function openSessionDetailsModal({ event }: EventClickArg) {
    const eventId = event._def.publicId
    const session = sessions.filter((session) => session._id === eventId)[0]

    setSession(session)
    onOpen()
  }

  useEffect(() => {
    api.get('/session/list').then((response) => {
      const sessions = response.data.data
      setSessions(sessions)

      const newFormattedSessions = sessions.map((session) => {
        return {
          title: `Sessão com ${session.patient[0].name}`,
          date: format(new Date(session.appointment_date), 'yyyy-MM-dd'),
          id: session._id,
        }
      })

      setFormattedSessions([...newFormattedSessions])
    })
  }, [])

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[...formattedSessions.map((session) => session)]}
        eventColor="#87A2FB"
        eventTextColor="#fff"
        eventClick={openSessionDetailsModal}
      />

      {Object.keys(session).length && (
        <TemplateModal
          isOpen={isOpen}
          onClose={onClose}
          title="Detalhes do agendamento"
          modalFooter={
            <ModalFooter>
              <Button onClick={onClose}>Fechar</Button>
            </ModalFooter>
          }
        >
          <Text>
            {`Data do agendamento: ${format(
              new Date(session.appointment_date),
              'dd-MM-yyyy',
            )}`}
          </Text>
          <Text>{`Nome do paciente: ${session.patient[0].name}`}</Text>
          <Text>{`E-mail: ${session.patient[0].email}`}</Text>
          <Text>{`Tópico: ${session.topic}`}</Text>
          <Text>{`Duraçāo: ${session.duration} minutos`}</Text>
        </TemplateModal>
      )}
    </div>
  )
}
