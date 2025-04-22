"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" />
      <div
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  )
}
