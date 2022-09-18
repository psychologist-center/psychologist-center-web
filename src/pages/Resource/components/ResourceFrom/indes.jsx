import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
const ResourceFrom = ({ register, errors, isLoading }) => (
  <form noValidate>
    <FormControl isInvalid={errors.title} isRequired mb={4}>
      <FormLabel>Nome</FormLabel>
      <Input
        type="text"
        placeholder="Nome"
        {...register('title')}
        disabled={isLoading}
      />
      {errors.title && (
        <FormErrorMessage>{errors.title.message}</FormErrorMessage>
      )}
    </FormControl>
    <FormControl isInvalid={errors.description} mb={4}>
      <FormLabel>Descrição</FormLabel>
      <Input
        type="text"
        placeholder="Descrição"
        {...register('description')}
        disabled={isLoading}
      />
      {errors.description && (
        <FormErrorMessage>{errors.description.message}</FormErrorMessage>
      )}
    </FormControl>
    <FormControl isInvalid={errors.category} isRequired>
      <FormLabel>Categoria</FormLabel>
      <Select
        placeholder="Selecione uma categoria"
        {...register('category')}
        disabled={isLoading}
      >
        <option value="metáfora">Metáfora</option>
        <option value="transe">Transe</option>
        <option value="ferramenta">Ferramenta</option>
      </Select>
      {errors.category && (
        <FormErrorMessage>{errors.category.message}</FormErrorMessage>
      )}
    </FormControl>
  </form>
)

export default ResourceFrom
