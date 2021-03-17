import { ReactNode, createContext, useCallback, useContext, useState } from 'react'

import Modal from 'components/Modal'

interface ContextProps {
  addModal: (
    content: any,
    options?: { className?: string; style?: { [key: string]: string | number } }
  ) => void
  removeModal: () => void
}

const ModalContext = createContext<Partial<ContextProps>>({})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<boolean | any>(false)
  const [options, setOptions] = useState({})

  const addModal = useCallback(
    (content, options) => {
      setModalContent(content)
      setOptions(options)
      setTimeout(() => setIsOpen(true))
    },
    [setModalContent, setIsOpen]
  )

  const removeModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setModalContent(false), 300)
  }, [setModalContent])

  return (
    <ModalContext.Provider value={{ addModal, removeModal }}>
      {modalContent && (
        <Modal isOpen={isOpen} onClose={() => removeModal()} {...options}>
          {modalContent}
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext) as ContextProps
}
