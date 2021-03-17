import React from 'react'
import { Transition } from '@headlessui/react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void
  isOpen: boolean
  className?: string
  style?: { [key: string]: string | number }
}

const Modal = React.forwardRef<HTMLDivElement, Props>(function Modal(props, ref) {
  const { children, onClose, isOpen, className = '', style = {}, ...other } = props

  return (
    <Transition show={isOpen}>
      <Transition.Child
        enter="transition ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-40 flex items-end bg-gray-400 bg-opacity-75 sm:items-center sm:justify-center"
          onClick={onClose}
        >
          <Transition.Child
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 transform translate-y-1/4 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0  transform translate-y-1/4 scale-95"
            className={`w-full p-5 overflow-y-scroll bg-white rounded-t-lg sm:p-6 no-scrollbar sm:rounded-lg sm:m-4 sm:max-w-xl ${className}`}
            style={{ maxHeight: '90%', ...style }}
          >
            <div role="dialog" onClick={(e) => e.stopPropagation()} ref={ref} {...other}>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Transition.Child>
    </Transition>
  )
})

export default Modal
