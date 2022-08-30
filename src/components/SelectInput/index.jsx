import {
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export function SelectBase({ options, labelText, error, ...props }, ref) {
  return (
    <FormControl isRequired isInvalid={!!error}>
      <FormLabel mt="5" fontSize="lg" htmlFor={props.name}>
        {labelText}
      </FormLabel>
      <Select ref={ref} {...props} placeholder="Selecione uma opção">
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </Select>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const SelectInput = forwardRef(SelectBase)
