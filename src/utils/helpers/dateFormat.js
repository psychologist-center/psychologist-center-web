const dateFormat = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export { dateFormat }
