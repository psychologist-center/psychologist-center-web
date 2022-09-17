import { Button, Flex } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { TemplateModal } from '../../../../components/TemplateModal'
import ResourceFrom from '../ResourceFrom/indes'
import { zodResolver } from '@hookform/resolvers/zod'
import { resourceValidatorSchema } from '../../../../utils/schemas/resourceSchema'
import { useEffect } from 'react'

const ResourceModal = ({
  resource,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  isLoading,
}) => {
  const isNew = !resource.id?.length
  const title = `${isNew ? 'Adicionar' : 'Editar'} recurso`

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: resource,
    resolver: zodResolver(resourceValidatorSchema),
  })

  const handleOnSubmit = () => {
    if (isLoading) return
    handleSubmit(onSubmit)()
  }

  const handleOnDelete = () => {
    if (isLoading) return
    const resourceData = getValues()
    onDelete(resourceData.id)
  }

  const handleOnClose = () => {
    if (isLoading) return
    reset()
    onClose()
  }

  useEffect(() => {
    for (const key in resource) {
      setValue(key, resource[key])
    }
  }, [resource, setValue])

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
      <ResourceFrom errors={errors} register={register} isLoading={isLoading} />
    </TemplateModal>
  )
}

export default ResourceModal
