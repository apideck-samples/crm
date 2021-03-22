import VaultSessionButton from './VaultSessionButton'

interface Props {
  error: string
  message: string
}

const ErrorMessage = ({ error, message }: Props) => {
  return (
    <div className="bg-white shadow-xl sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{error}</h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>{message}</p>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <VaultSessionButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
