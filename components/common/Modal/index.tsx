"use client";

import { ModalType, useModalStore } from "@/features/modal";
import { ModalPortal } from "../ModalPortal";
import ModalBookDetail from "./ModalBookDetail";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import ModalAddVariant from "./ModalAddVariant";
import ModalAddTranslateBook from "./ModalAddTranslateBook";
import ModalAddSupplier from "./ModalAddSupplier";

export function ModalHost() {
  const { getIsOpen, onClose, getType } = useModalStore();
  const isOpen = getIsOpen();
  const type = getType();

  return (
    <ModalPortal>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 custom-scrollbar"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 p-2 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100" />
              </button>

              <div className="p-6 md:p-8">
                {type === ModalType.BOOK_DETAIL && (
                  <ModalBookDetail onClose={onClose} />
                )}
                {type === ModalType.BOOK_ADD_VARIANT && (
                  <ModalAddVariant onClose={onClose} />
                )}
                {type === ModalType.BOOK_TRANSLATION && (
                  <ModalAddTranslateBook onClose={onClose} />
                )}
                {type === ModalType.ADD_SUPPLIER && (
                  <ModalAddSupplier onClose={onClose} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
