import { Button, Flex } from '@chakra-ui/react'
import { PlusCircle } from 'phosphor-react'

const AddButton = ({ label, onClick, disabled }) => {
  return (
    <Button
      bg="brand-purple"
      color="base-white"
      _hover={{
        background: 'brand-purple-hover',
        color: 'base-white',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Flex align="center" gap="2">
        <PlusCircle size={23} weight="fill" /> {label}
      </Flex>
    </Button>
  )
}

export default AddButton
