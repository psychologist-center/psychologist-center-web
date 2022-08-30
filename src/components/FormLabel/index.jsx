import {
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export function InputBase(
  { labelText, placeholder, typeInput, error, ...props },
  ref,
) {
  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormLabel mt="5" fontSize="lg" htmlFor={props.name}>
        {labelText}
      </FormLabel>
      <Input
        ref={ref}
        {...props}
        fontSize="lg"
        type={typeInput}
        placeholder={placeholder}
        size="lg"
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputForm = forwardRef(InputBase)
