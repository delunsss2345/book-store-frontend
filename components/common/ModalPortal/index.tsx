"use client";
import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-layer");
  if (!modalRoot) return null;
  return createPortal(children, modalRoot);
}
