/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import '@fullcalendar/react/dist/vdom'

import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { api } from '../../services/api'
import { format } from 'date-fns'

import './style.css'

export const SchedulePage = () => {
  const [sessions, setSessions] = useState([
    { title: 'Sessão com David', date: '2022-09-01' },
    { title: 'Sessão com Arthur', date: '2022-09-02' },
    { title: 'Sessão com Luiz', date: '2022-09-05' },
    { title: 'Sessão com Rafael', date: '2022-09-06' },
    { title: 'Sessão com Amanda', date: '2022-09-07' },
  ])

  useEffect(() => {
    api.get('/session/list').then((response) => {
      const fetchedSessions = response.data.data

      const formattedSessions = fetchedSessions.map((session) => {
        return {
          title: `Sessão com ${session.patient[0].name}`,
          date: format(new Date(session.appointment_date), 'yyyy-MM-dd'),
        }
      })

      setSessions([...sessions, ...formattedSessions])
    })
  }, [])

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[...sessions.map((session) => session)]}
        eventColor="#87A2FB"
        eventTextColor="#fff"
      />
    </div>
  )
}
