import { Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
    const navigate = useNavigate();
    const logout = () => { localStorage.clear(); navigate('/'); };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-indigo-600 p-4 text-white shadow-md flex justify-between items-center px-10">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Activity /> <span>MediConnect</span>
                </div>
                <button onClick={logout} className="flex items-center gap-2 bg-indigo-700 px-4 py-2 rounded-lg hover:bg-red-500 transition">
                    <LogOut size={18} /> Déconnexion
                </button>
            </nav>
            <main className="flex-grow">{children}</main>
        </div>
    );
}