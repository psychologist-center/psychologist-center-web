import React from 'react'

import '@fullcalendar/react/dist/vdom'

import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import './style.css'

export const SchedulePage = () => {
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: 'Sessão 1', date: '2022-09-01' },
          { title: 'Sessão 2', date: '2022-09-02' },
          { title: 'Sessão 3', date: '2022-09-05' },
          { title: 'Sessão 4', date: '2022-09-06' },
          { title: 'Sessão 5', date: '2022-09-07' },
        ]}
        eventColor="#87A2FB"
        eventTextColor="#fff"
      />
    </div>
  )
}
