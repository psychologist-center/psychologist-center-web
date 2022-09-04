import { TemplateModal } from '../TemplateModal'
import { formData } from '../../utils/constants/formData'
import { InputForm } from '../FormLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { patientEditValidatorSchema } from '../../utils/schemas/patientSchema'
import { ModalFooter } from './ModalFooter'
import { useEffect } from 'react'
import { api } from '../../services/api'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

export function ViewPatientModal({ viewPatient, data, setPacientes }) {
  const toast = useToast()
  const token = localStorage.getItem('@Auth:token')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientEditValidatorSchema),
  })

  console.log(errors)

  useEffect(() => {
    if (Object.keys(data).length) {
      Object.entries(data).forEach(([key, value]) =>
        setValue(String(key), value),
      )
    }
  }, [data, setValue])

  async function handleDeletePatient() {
    try {
      await api.delete(`/user/${data.email}`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      setPacientes((oldValue) =>
        oldValue.filter((patient) => patient.email !== data.email),
      )
      toast({
        title: 'Usuário deletado com sucesso',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      })
      viewPatient.onClose()
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
    }
  }

  async function handleEditPatient(data) {
    try {
      await api.put(`/user/${data.email}`, data, {
        headers: { Authorization: 'Bearer ' + token },
      })
      setPacientes((oldValue) =>
        oldValue.map((patient) =>
          patient.email === data.email ? data : patient,
        ),
      )
      toast({
        title: 'Dados alterados com sucesso',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      })
      viewPatient.onClose()
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
    }
  }

  return (
    <TemplateModal
      title="Editar Paciente"
      formData={formData}
      isOpen={viewPatient.isOpen}
      onOpen={viewPatient.onOpen}
      onClose={viewPatient.onClose}
      modalFooter={
        <ModalFooter
          onClose={viewPatient.onClose}
          handleEditPatient={handleSubmit(handleEditPatient)}
          handleDeletePatient={handleDeletePatient}
        />
      }
    >
      <form noValidate>
        {formData.map((item, index) => {
          if (
            item.inputType === 'select' ||
            item.labelText === 'Data de Aniversário' ||
            item.labelText === 'CPF'
          ) {
            return null
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
      </form>
    </TemplateModal>
  )
}
