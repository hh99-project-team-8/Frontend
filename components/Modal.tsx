"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = () => {};
  const onDismiss = () => {};

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80"
      onClick={handleClick}
    >
      <div>{children}</div>
    </div>
  );
};

export default Modal;
