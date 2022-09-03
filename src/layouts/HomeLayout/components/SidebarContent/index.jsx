import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'
import { FiHome, FiTrendingUp, FiCompass } from 'react-icons/fi'

import menteSaLogo from '../../../../assets/mentesa-light.svg'
import { NavItem } from '../NavItem'

const LinkItems = [
  { name: 'Home', icon: FiHome, path: '/dashboard' },
  { name: 'Pacientes', icon: FiTrendingUp, path: '/dashboard/paciente' },
  { name: 'Sessões', icon: FiCompass, path: '/dashboard/sessao' },
]

export const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="0px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image boxSize="150px" src={menteSaLogo} alt="Dan Abramov" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
