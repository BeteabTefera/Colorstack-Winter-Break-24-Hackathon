'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface PopupProps {
  message: string
  type: 'success' | 'error'
  isOpen: boolean
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ message, type, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      role="alert"
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md flex items-center justify-between ${
        type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      <p>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose()
        }}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Popup

