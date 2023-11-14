"use client"

import { serverLogout } from '@/actions/auth';
import { useRouter } from 'next/navigation';


export default function NavBar(){
    const { push } = useRouter()
    
    function logout(){
        serverLogout()
        push("/login")
    }

    return (
        <nav>
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-indigo-600 text-3xl font-bold">Cadastro de Pacientes</div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>
      );
    };
    