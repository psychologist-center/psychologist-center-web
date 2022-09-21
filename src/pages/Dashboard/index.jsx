import { useCallback, useEffect, useState } from 'react'

import { Stat, StatLabel, StatNumber, HStack, Box } from '@chakra-ui/react'

import { api } from '../../services/api'

function Card({ title, number, ...rest }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      width="300px"
      height="150px"
      backgroundColor="#fff"
      borderRadius="5px"
      marginLeft={2}
      {...rest}
    >
      <Stat
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StatLabel fontSize="large">{title}</StatLabel>
        <StatNumber fontSize="4xl" textAlign="center">
          {number}
        </StatNumber>
      </Stat>
    </Box>
  )
}

export function DashboardPage() {
  const [data, setData] = useState({})

  const fetchData = useCallback(() => {
    const URLs = ['user/list/patient', 'session/list']
    const URLsToFetch = URLs.map((url) => api.get(url))

    Promise.all(URLsToFetch).then((resolved) => {
      setData({
        ...data,
        patients: resolved[0].data.total,
        sessions: resolved[1].data.total,
      })
    })
  }, [data])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <HStack flexWrap="wrap" gap={6}>
      <Card title="Sessões agendadas (dia)" number={data.sessions} />
      <Card title="Sessões agendadas (mês)" number={data.sessions} />
      <Card title="Sessões canceladas (mês)" number="0" />
      <Card title="Total de pacientes cadastrados" number={data.patients} />
      <Card title="Total de sessões (individuais)" number={data.sessions} />
      <Card title="Total de sessões (dupla)" number={data.sessions} />
      <Card title="Total de sessões (grupo)" number={data.sessions} />
    </HStack>
  )
}
