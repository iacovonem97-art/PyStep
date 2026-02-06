import { Link } from 'react-router-dom'
import { AuthForm } from '../components/auth/AuthForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Crée ton compte
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Rejoins 127 apprenants qui codent déjà !
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm mode="register" />

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Se connecter
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-center text-xs text-gray-500">
              En t'inscrivant, tu acceptes nos{' '}
              <Link to="/terms" className="underline hover:text-gray-700">
                Conditions d'utilisation
              </Link>{' '}
              et{' '}
              <Link to="/privacy" className="underline hover:text-gray-700">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
