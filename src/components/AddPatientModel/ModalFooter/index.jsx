import { Button, Text } from '@chakra-ui/react'

export function ModalFooter({ onClose, handleAddPatient }) {
  return (
    <>
      <Button
        bg="brand-purple"
        color="base-white"
        _hover={{
          background: 'brand-purple-hover',
          color: 'base-white',
        }}
        mr={3}
        onClick={handleAddPatient}
      >
        <Text fontSize="lg">Entrar</Text>
      </Button>
      <Button onClick={onClose}>Cancelar</Button>
    </>
  )
}
