import { Link } from 'react-router-dom'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Mot de passe oublié
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Cette fonctionnalité sera bientôt disponible.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value=""
              onChange={() => {}}
              disabled
              autoComplete="email"
            />

            <Button type="button" disabled className="w-full">
              Réinitialiser
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Retour à la connexion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
