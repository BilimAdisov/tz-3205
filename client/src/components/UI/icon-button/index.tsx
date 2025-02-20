import { JSX, MouseEventHandler, ReactNode } from "react";
import { Button } from "antd";

interface IconButtonComponentProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  name?: string;
}

const IconButtonComponent = ({
  children,
  className,
  onClick,
  name,
}: IconButtonComponentProps): JSX.Element => {
  return (
    <Button
      className={className}
      shape="circle"
      type="text"
      onClick={onClick}
      style={{
        width: "fit-content",
        height: "fit-content",
      }}
      name={name}
    >
      {children}
    </Button>
  );
};

IconButtonComponent.displayName = "IconButtonComponent";

export default IconButtonComponent;
