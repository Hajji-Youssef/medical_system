import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
    const [data, setData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        try {
            await api.post('register/', data);
            alert("Compte créé avec succès !");
            navigate('/');
        } catch { alert("Erreur d'inscription"); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <form onSubmit={handle} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-black text-center text-green-600 mb-8 uppercase tracking-tighter">Inscription</h2>
                <div className="space-y-5">
                    <input type="text" placeholder="Username" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        onChange={e => setData({...data, username: e.target.value})} />
                    <input type="email" placeholder="Email" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        onChange={e => setData({...data, email: e.target.value})} />
                    <input type="password" placeholder="Password" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        onChange={e => setData({...data, password: e.target.value})} />
                    <button className="w-full bg-green-600 text-white p-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200">S'enregistrer</button>
                </div>
                <p className="mt-8 text-center text-sm text-slate-500 font-medium">Déjà inscrit ? <Link to="/" className="text-green-600 font-bold">Se connecter</Link></p>
            </form>
        </div>
    );
}