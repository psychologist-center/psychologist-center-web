import { Stat, StatLabel, StatNumber, HStack, Box } from '@chakra-ui/react'

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
  return (
    <HStack flexWrap="wrap" gap={6}>
      <Card title="Sessões agendadas (dia)" number="0" />
      <Card title="Sessões agendadas (mês)" number="0" />
      <Card title="Sessões canceladas (mês)" number="0" />
      <Card title="Total de pacientes cadastrados" number="0" />
      <Card title="Total de sessões (individuais)" number="0" />
      <Card title="Total de sessões (dupla)" number="0" />
      <Card title="Total de sessões (grupo)" number="0" />
    </HStack>
  )
}
