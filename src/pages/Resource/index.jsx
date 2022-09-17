import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import AddButton from '../../components/AddButton'
import resourceService from '../../services/resource/resource.service'
import ResourceModal from './components/ResourceModal'
import ResourceTable from './components/ResourceTable'

const ResourcePage = () => {
  const toast = useToast()
  const [resources, setResources] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const defaultResource = {
    id: '',
    title: '',
    description: '',
    category: '',
  }
  const [selectedResource, setSelectedResource] = useState(defaultResource)
  const [refresh, setRefresh] = useState(Math.random())
  const [isLoading, setIsLoading] = useState(false)

  const handleOnAddResource = () => {
    setSelectedResource(defaultResource)
    setIsModalOpen(true)
  }
  const handleOnClickResource = (resource) => {
    const { _id: id, title, description, category } = resource
    setSelectedResource({ id, title, description, category })
    setIsModalOpen(true)
  }
  const handleOnCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleOnDeleteModal = async (id) => {
    setIsLoading(true)
    const result = await resourceService.remove(id)
    const message = result.isErr ? result.error.message : result.value
    toast({
      title: message,
      status: result.isErr ? 'error' : 'success',
      isClosable: true,
      position: 'top-right',
    })
    setIsLoading(false)
    setRefresh(Math.random())
    handleOnCloseModal()
  }
  const handleOnSubmitModal = async (resourceData) => {
    setIsLoading(true)
    const result = resourceData.id.length
      ? await resourceService.update(resourceData)
      : await resourceService.create(resourceData)
    const message = result.isErr ? result.error.message : result.value
    toast({
      title: message,
      status: result.isErr ? 'error' : 'success',
      isClosable: true,
      position: 'top-right',
    })
    setIsLoading(false)
    setRefresh(Math.random())
    handleOnCloseModal()
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await resourceService.getAll()
      if (result.isErr) {
        toast({
          title: result.error.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
        })
      }

      setResources(result.value)
    }
    fetchData().then(() => {
      setIsLoading(false)
    })
  }, [toast, refresh])

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand-purple"
          size="xl"
        />
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center">
      <AddButton
        label="Adicionar recurso"
        onClick={handleOnAddResource}
        disabled={isLoading}
      />
      <ResourceTable onClick={handleOnClickResource} resources={resources} />
      <ResourceModal
        isOpen={isModalOpen}
        onClose={handleOnCloseModal}
        resource={selectedResource}
        onDelete={handleOnDeleteModal}
        onSubmit={handleOnSubmitModal}
      />
    </Flex>
  )
}

export default ResourcePage
