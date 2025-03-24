import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'

interface UpdateConfirmationProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const UpdateConfirmation = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}: UpdateConfirmationProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="blue.600" textAlign="center">
          {title}
        </ModalHeader>
        <ModalBody>
          <Text textAlign="center" color="gray.700">
            {message}
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="gray" mr={3} onClick={onCancel}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={onConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateConfirmation
