import React, { FC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

export interface MovieEditorModalProps {
  isOpen?: boolean;
  onClose: ModalProps["onClose"];
  title: string;
}

export const MovieEditorModal: FC<MovieEditorModalProps> = ({
  isOpen = false,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="background.dark" padding="16">
        <ModalHeader
          fontSize="4xl"
          fontWeight="light"
          marginBottom="10"
          padding="0"
          textTransform="uppercase"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton fontSize="xl" />
        <ModalBody padding="0">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
