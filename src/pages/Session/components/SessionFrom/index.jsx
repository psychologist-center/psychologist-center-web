import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import SelectReact from 'react-select'
import patientService from '../../../../services/patient/patient.service'
import resourceService from '../../../../services/resource/resource.service'

const SessionFrom = ({ control, register, errors, isLoading }) => {
  const [resources, setResources] = useState([])
  const [patients, setPatients] = useState([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(false)
  const [isLoadingResources, setIsLoadingResources] = useState(false)

  const fetchPatients = async () => {
    setIsLoadingPatients(true)
    const result = await patientService.getAll()
    if (result.isErr) return

    const options = result.value.map((patient) => {
      return {
        label: patient.name,
        value: patient._id,
      }
    })
    setIsLoadingPatients(false)
    setPatients(options)
  }

  const fetchResources = async () => {
    setIsLoadingResources(true)
    const result = await resourceService.getAll()
    if (result.isErr) return

    const options = result.value.map((resource) => {
      return {
        label: resource.title,
        value: resource._id,
      }
    })
    setIsLoadingResources(false)
    setResources(options)
  }

  useEffect(() => {
    fetchPatients()
    fetchResources()
  }, [])

  if (isLoadingPatients || isLoadingResources) return null

  return (
    <form noValidate>
      <FormControl isInvalid={errors.session_type} isRequired mb={4}>
        <FormLabel>Tipo</FormLabel>
        <Select
          {...register('session_type')}
          placeholder="Selecione o tipo"
          disabled={isLoading}
        >
          <option value="0">Individual</option>
          <option value="1">Dupla</option>
          <option value="2">Grupo</option>
        </Select>
        {errors.session_type && (
          <FormErrorMessage>{errors.session_type.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.patient} isRequired mb={4}>
        <FormLabel>Pacientes</FormLabel>
        <Controller
          name="patient_id"
          control={control}
          render={({ field }) => (
            <SelectReact
              {...field}
              value={patients.filter((p) => field.value?.includes(p.value))}
              options={patients}
              getOptionValue={(value) => {
                return value.value
              }}
              onChange={(value) => {
                field.onChange(value.map((v) => v.value))
              }}
              isMulti
              placeholder="Selecione os pacientes"
            />
          )}
        />
        {errors.patient && (
          <FormErrorMessage>{errors.patient.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.appointment_date} isRequired mb={4}>
        <FormLabel>Data de agendamento</FormLabel>
        <Input
          {...register('appointment_date')}
          type="datetime-local"
          placeholder="Data de agendamento"
          disabled={isLoading}
        />
        {errors.appointment_date && (
          <FormErrorMessage>{errors.appointment_date.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.duration} isRequired mb={4}>
        <FormLabel>Duração</FormLabel>
        <InputGroup>
          <Input
            type="number"
            placeholder="Duração"
            {...register('duration')}
            disabled={isLoading}
          />
          <InputRightAddon>min</InputRightAddon>
        </InputGroup>
        {errors.duration && (
          <FormErrorMessage>{errors.duration.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.topic} isRequired mb={4}>
        <FormLabel>Tema abordado</FormLabel>
        <Input
          type="text"
          placeholder="Tema abordado"
          {...register('topic')}
          disabled={isLoading}
        />
        {errors.topic && (
          <FormErrorMessage>{errors.topic.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.status} mb={4}>
        <FormLabel>Status</FormLabel>
        <Select
          placeholder="Selecione o status"
          {...register('status')}
          disabled={isLoading}
        >
          <option value="0">Agendado</option>
          <option value="1">Cancelado</option>
          <option value="2">Atendido</option>
        </Select>
        {errors.status && (
          <FormErrorMessage>{errors.status.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={errors.resource_ids} mb={4}>
        <FormLabel>Recursos</FormLabel>
        <Controller
          name="resource_ids"
          control={control}
          render={({ field }) => (
            <SelectReact
              {...field}
              options={resources}
              value={resources.filter((r) => field.value?.includes(r.value))}
              getOptionValue={(value) => {
                return value.value
              }}
              onChange={(value) => {
                field.onChange(value.map((v) => v.value))
              }}
              isMulti
              placeholder="Selecione os recursos"
            />
          )}
        />
        {errors.resource_ids && (
          <FormErrorMessage>{errors.resource_ids.message}</FormErrorMessage>
        )}
      </FormControl>
    </form>
  )
}

export default SessionFrom
