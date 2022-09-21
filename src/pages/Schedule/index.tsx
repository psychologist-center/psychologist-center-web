/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import '@fullcalendar/react/dist/vdom'

import FullCalendar, { EventClickArg } from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { api } from '../../services/api'
import { format } from 'date-fns'

import './style.css'
import { TemplateModal } from '../../components/TemplateModal'

interface Session {
  _id: string
}
interface FormattedSession {
  title: string
  date: string
  id: string
}

export const SchedulePage = () => {
  const [sessions, setSessions] = useState(Array<Session>)

  const [formattedSessions, setFormattedSessions] = useState(
    Array<FormattedSession>,
  )

  function openSessionDetailsModal({ event }: EventClickArg) {
    const eventId = event._def.publicId

    const session = sessions.filter((session) => session._id === eventId)[0]
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

      setFormattedSessions([...formattedSessions, ...newFormattedSessions])
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

      <TemplateModal isOpen={true} title="Detalhes da sessão">
        Teste
      </TemplateModal>
    </div>
  )
}
