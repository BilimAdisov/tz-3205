import { ReactNode } from "react";
import { Modal } from "antd";

interface ModalProps {
  active: boolean;
  handleClose: any;
  children?: ReactNode;
  title?: string;
  footer?: any;
  width?: number | string;
  style?: any;
  handleOk?: any;
}

export const ModalComponent = ({
  active,
  handleClose,
  children,
  title,
  footer,
  width,
  style,
  handleOk,
}: ModalProps) => {
  return (
    <Modal
      open={active}
      onCancel={handleClose}
      onOk={handleOk ? handleOk : undefined}
      title={title}
      footer={footer}
      width={width}
      style={{ ...style }}
    >
      {children}
    </Modal>
  );
};
ModalComponent.displayName = "ModalComponent";
