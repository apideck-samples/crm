import { Button, useModal } from '@apideck/components'

import { FC } from 'react'
import LeadForm from './LeadForm'

interface Props {
  title: string
  showButton: boolean
}

const PageHeading: FC<Props> = ({ title, showButton }) => {
  const { addModal } = useModal()

  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold leading-7 uppercase text-dark sm:text-2xl sm:truncate">
          {title}
        </h2>
      </div>
      {showButton && (
        <div className="flex mt-4 md:mt-0 md:ml-4">
          <Button
            text="Create lead"
            className="inline-flex"
            onClick={() => addModal(<LeadForm />, { style: { maxWidth: 480 } })}
          />
        </div>
      )}
    </div>
  )
}

export default PageHeading
