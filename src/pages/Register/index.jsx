import {
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Link,
  Box,
  useToast,
} from '@chakra-ui/react'

import menteSaLogo from '../../assets/mentesa.svg'
import { InputForm } from '../../components/FormLabel'
import { SelectInput } from '../../components/SelectInput'
import { NavLink } from 'react-router-dom'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { validate } from 'gerador-validador-cpf'
import { api } from '../../Services/api'
import { AxiosError } from 'axios'

const formData = [
  {
    labelText: 'Nome',
    placeholder: 'David Augusto',
    inputType: 'text',
    name: 'name',
  },
  {
    labelText: 'E-mail',
    placeholder: 'davidaugusto@gmail.com',
    inputType: 'email',
    name: 'email',
  },
  {
    labelText: 'CPF',
    placeholder: '23232312334',
    inputType: 'number',
    name: 'cpf',
  },
  {
    labelText: 'CRP',
    placeholder: '23232312334',
    inputType: 'number',
    name: 'crp',
  },
  {
    labelText: 'Gênero',
    placeholder: 'São Paulo',
    inputType: 'select',
    name: 'genre',
    options: [
      {
        value: 'H',
        label: 'Homem',
      },
      {
        value: 'M',
        label: 'Mulher',
      },
      {
        value: 'NB',
        label: 'Não binário',
      },
      {
        value: 'NI',
        label: 'Prefiro não informar',
      },
    ],
  },
  {
    labelText: 'Data de Aniversário',
    placeholder: '10/08/2003',
    inputType: 'date',
    name: 'birth_date',
  },
  {
    labelText: 'Endereço',
    placeholder: 'Avenida Paulista, 1400',
    inputType: 'text',
    name: 'address',
  },
  {
    labelText: 'Cidade',
    placeholder: 'São Paulo',
    inputType: 'text',
    name: 'city',
  },
  {
    labelText: 'Estado',
    placeholder: 'SP',
    inputType: 'text',
    name: 'state',
  },
]

const RegisterValidatorSchema = zod.object({
  name: zod.string().min(1, 'O campo nome não pode ser vazio'),
  email: zod.string().email('Digite um e-mail válido'),
  password: zod.string().min(6, 'O senha deve pelo menos 6 caracteres'),
  cpf: zod.custom(validate, { message: 'Digite um CPF válido' }),
  genre: zod.enum(['H', 'M', 'NB', 'NI'], ' Selecione um gênero válido'),
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

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterValidatorSchema),
  })

  const toast = useToast()
  // const { setUser } = useContext(AuthContext)

  async function handleRegister(inputData) {
    try {
      const { data } = await api.post('/user/professional/register', inputData)

      // setUser(data.data)
      // setCookie(null, 'token', data.token)
      console.log(data)
    } catch (e) {
      toast({
        title:
          e instanceof AxiosError ? e.response.data.message : 'Erro Interno',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  return (
    <Flex h="100vh">
      <Flex
        direction="column"
        width="40%"
        bg="brand-purple"
        borderRightRadius="md"
        alignItems="center"
      >
        <Image boxSize="150px" src={menteSaLogo} alt="Dan Abramov" />
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        overflowY="scroll"
      >
        <Flex
          direction="column"
          alignSelf="start"
          mt="40rem"
          w="100%"
          px="20%"
          py="10rem"
        >
          <Box mb={5}>
            <Heading color="brand-purple">Bem Vindo!</Heading>
            <Text>
              Preencha corretamente as informações para realizar seu cadastro.
            </Text>
          </Box>

          <Box
            as="form"
            w="100%"
            onSubmit={handleSubmit(handleRegister)}
            noValidate
          >
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

            <Button
              color="base-white"
              colorScheme="purple"
              type="submit"
              width="full"
              size="lg"
              mt={4}
            >
              <Text fontSize="lg">Cadastrar</Text>
            </Button>
          </Box>

          <Flex w="100%" justifyContent="start" gap={2} mt={5}>
            <Text fontSize="lg">Já possui uma conta? </Text>
            <Link
              as={NavLink}
              to="/"
              fontSize="lg"
              color="brand-purple"
              fontWeight="medium"
            >
              Entre
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
