import { TemplateModal } from '../TemplateModal'
import { formData } from '../../utils/constants/formData'
import { InputForm } from '../FormLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { patientValidatorSchema } from '../../utils/schemas/patientSchema'
import { ModalFooter } from './ModalFooter'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { SelectInput } from '../SelectInput'
import { api } from '../../services/api'

export function AddPatientModel({ addPatient, setPacientes }) {
  const toast = useToast()
  const token = localStorage.getItem('@Auth:token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientValidatorSchema),
  })

  async function handleAddPatient(data) {
    try {
      await api.post('/user/patient/register', data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPacientes((oldValue) => [data, ...oldValue])
      toast({
        title: 'Usuário adicionado com sucesso',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      })
      addPatient.onClose()
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
      isOpen={addPatient.isOpen}
      onOpen={addPatient.onOpen}
      onClose={addPatient.onClose}
      modalFooter={
        <ModalFooter
          onClose={addPatient.onClose}
          handleAddPatient={handleSubmit(handleAddPatient)}
        />
      }
    >
      <form noValidate>
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
      </form>
    </TemplateModal>
  )
}
