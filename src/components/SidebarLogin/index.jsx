import { Flex, Image } from '@chakra-ui/react'

import menteSaLogo from '../../assets/mentesa.svg'

export function SidebarLogin() {
  return (
    <Flex
      direction="column"
      width="40%"
      bg="brand-purple"
      borderRightRadius="md"
      alignItems="center"
    >
      <Image boxSize="30%" src={menteSaLogo} alt="Logo MenteSã" />
    </Flex>
  )
}
