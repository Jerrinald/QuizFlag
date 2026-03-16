import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/contexts/AuthContext";

function Header() {
  const { username, role } = useAuth();
  const navigate = useNavigate();


  return (
    <header className='h-20 w-full bg-slate-500 flex justify-between items-center px-6'>
      <div className="flex items-center justify-center gap-3">
        <h1 className='text-white text-2xl font-bold cursor-pointer hover:text-gray-100' onClick={() => navigate('/')}>FlagQuiz</h1>

      </div>


      {/* <button
          className='ml-3 text-white font-semibold hover:text-gray-200 transition-colors duration-300'
          onClick={() => navigate('/ranking')}
        >
          Classement
        </button>
        {role.includes("ROLE_ADMIN") && (
          <button
          className='text-white font-semibold hover:text-gray-200 transition-colors duration-300'
          onClick={() => navigate('/admin')}
        >
          Panel
        </button>
        )}

      {username ? (
        <ProfileMenu username={username} />
        ) : (
      <button
        className='bg-white text-slate-500 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300'
        onClick={() => navigate('/login')}
      >
        Connexion
      </button>
        )} */}
    </header>
  );
}

export default Header;