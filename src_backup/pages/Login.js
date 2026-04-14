import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const [data, setData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('login/', data);
            localStorage.setItem('token', res.data.access);
            navigate('/dashboard');
        } catch { alert("Erreur d'authentification"); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <form onSubmit={handle} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-black text-center text-indigo-600 mb-8 uppercase tracking-tighter">Bienvenue</h2>
                <div className="space-y-5">
                    <input type="text" placeholder="Username" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setData({...data, username: e.target.value})} />
                    <input type="password" placeholder="Password" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setData({...data, password: e.target.value})} />
                    <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Se connecter</button>
                </div>
                <p className="mt-8 text-center text-sm text-slate-500 font-medium">Pas de compte ? <Link to="/register" className="text-indigo-600 font-bold">Créer un compte</Link></p>
            </form>
        </div>
    );
}