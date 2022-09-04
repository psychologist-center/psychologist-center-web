import React, { useState } from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { InputForm } from '../FormLabel'
import { SelectInput } from '../SelectInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { validate } from 'gerador-validador-cpf'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { PlusCircle } from 'phosphor-react'

const PatientValidatorSchema = zod.object({
  name: zod.string().min(1, 'O campo nome não pode ser vazio'),
  email: zod.string().email('Digite um e-mail válido'),
  cpf: zod.custom(validate, { message: 'Digite um CPF válido' }),
  genre: zod.enum(['M', 'F', 'NB', 'NI'], ' Selecione um gênero válido'),
  birth_date: zod.preprocess(
    (arg) => {
      if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
    },
    zod.date({
      required_error: 'Selecione uma data válida',
      invalid_type_error: 'Selecione uma data válida',
    }),
  ),
  address: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  city: zod.string().min(1, 'O campo endereço não pode ser vazio'),
  state: zod
    .string()
    .min(2, 'O estado deve ter dois caracteres')
    .max(2, 'O estado deve ter dois caracteres'),
})

export function InitialFocus({ title, formData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PatientValidatorSchema),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const toast = useToast()
  const token = localStorage.getItem('@Auth:token')

  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(inputData) {
    try {
      setIsLoading(true)
      const { data } = await api.post('/user/patient/register', inputData, {
        headers: { Authorization: 'Bearer ' + token },
      })

      toast({
        title: data.message,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      })
      onClose()
    } catch (e) {
      toast({
        title:
          e instanceof AxiosError && e.response.data
            ? e.response.data.message
            : 'Erro Interno',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        bg="brand-purple"
        color="base-white"
        _hover={{
          background: 'brand-purple-hover',
          color: 'base-white',
        }}
        onClick={onOpen}
      >
        <Flex justifyContent="center" align="center" gap="2">
          <PlusCircle size={23} weight="fill" /> {title}
        </Flex>
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {formData.map((item, index) => {
              if (item.inputType === 'select') {
                return (
                  <SelectInput
                    error={errors[item.name]}
                    key={index}
                    labelText={item.labelText}
                    placeholder={item.placeholder2}
                    options={item.options}
                    {...register(item.name)}
                  />
                )
              } else {
                return (
                  <InputForm
                    error={errors[item.name]}
                    key={index}
                    labelText={item.labelText}
                    placeholder={item.placeholder}
                    typeInput={item.inputType}
                    {...register(item.name)}
                  />
                )
              }
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              bg="brand-purple"
              color="base-white"
              _hover={{
                background: 'brand-purple-hover',
                color: 'base-white',
              }}
              mr={3}
              type="submit"
            >
              {isLoading ? <Spinner /> : <Text fontSize="lg">Entrar</Text>}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
