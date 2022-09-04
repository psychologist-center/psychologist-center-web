import { Button, Text } from '@chakra-ui/react'

export function ModalFooter({
  handleDeletePatient,
  handleEditPatient,
  onClose,
}) {
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
        onClick={handleEditPatient}
      >
        <Text fontSize="lg">Editar</Text>
      </Button>
      <Button colorScheme="red" mr={3} onClick={handleDeletePatient}>
        <Text fontSize="lg">Deletar</Text>
      </Button>
      <Button onClick={onClose}>Cancelar</Button>
    </>
  )
}
