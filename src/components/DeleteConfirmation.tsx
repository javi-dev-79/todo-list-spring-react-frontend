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

interface DeleteConfirmationProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmation = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}: DeleteConfirmationProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="red.600" textAlign="center">
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
          <Button colorScheme="red" onClick={onConfirm}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteConfirmation
