export interface ModalContainerProps {
  onClose?: ((success?: boolean | undefined) => void | undefined) | undefined;
  open: boolean;
  modalWidth: number;
}
