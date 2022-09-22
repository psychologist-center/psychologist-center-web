import { Button, Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TemplateModal } from '../../../../components/TemplateModal'
import { sessionValidatorSchema } from '../../../../utils/schemas/sessionValidatorSchema'
import SessionFrom from '../SessionFrom'

const SessionModal = ({
  session,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isLoading,
}) => {
  const isNew = !session.id?.length
  const title = `${isNew ? 'Adicionar' : 'Editar'} sessão`
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: session,
    resolver: zodResolver(sessionValidatorSchema),
  })

  const handleOnSubmit = () => {
    if (isLoading) return
    handleSubmit(onSubmit)()
  }

  const handleOnDelete = () => {
    if (isLoading) return
    const sessionData = getValues()
    onDelete(sessionData.id)
  }

  const handleOnClose = () => {
    if (isLoading) return
    reset()
    onClose()
  }

  useEffect(() => {
    for (const key in session) {
      setValue(key, session[key])
    }
  }, [session, setValue])

  const renderModalActions = () => {
    const confirmButtonText = isNew ? 'Adicionar' : 'Editar'

    return (
      <Flex>
        <Button
          bg="brand-purple"
          color="base-white"
          _hover={{
            background: 'brand-purple-hover',
            color: 'base-white',
          }}
          mr={4}
          onClick={handleOnSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {confirmButtonText}
        </Button>
        {!isNew && (
          <Button
            colorScheme="red"
            mr={4}
            onClick={handleOnDelete}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Remover
          </Button>
        )}
        <Button onClick={handleOnClose}>Cancelar</Button>
      </Flex>
    )
  }

  return (
    <TemplateModal
      isOpen={isOpen}
      onClose={handleOnClose}
      title={title}
      modalFooter={renderModalActions()}
    >
      <SessionFrom
        errors={errors}
        control={control}
        register={register}
        isLoading={isLoading}
      />
    </TemplateModal>
  )
}

export default SessionModal
