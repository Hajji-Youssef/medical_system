import React, { useEffect, useState } from 'react';
import api from '../api';
import Layout from '../components/Layout';
import { Calendar, User, Plus, Clock } from 'lucide-react';

export default function Dashboard() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [form, setForm] = useState({ doctor: '', date: '', reason: '' });

    const load = async () => {
        try {
            const d = await api.get('doctors/');
            const a = await api.get('appointments/');
            setDoctors(d.data);
            setAppointments(a.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { load(); }, []);

    const book = async (e) => {
        e.preventDefault();
        try {
            await api.post('appointments/', form);
            setForm({ doctor: '', date: '', reason: '' });
            load();
        } catch { alert("Erreur de réservation"); }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800 uppercase tracking-tight">
                        <Plus className="text-indigo-600" /> Réserver un RDV
                    </h2>
                    <form onSubmit={book} className="space-y-6">
                        <select className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                            value={form.doctor} onChange={e => setForm({...form, doctor: e.target.value})} required>
                            <option value="">Choisir un Docteur</option>
                            {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.name} ({d.specialty})</option>)}
                        </select>
                        <input type="datetime-local" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                            value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
                        <textarea placeholder="Motif de la visite" className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 h-32"
                            value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required />
                        <button className="w-full bg-indigo-600 text-white p-4 rounded-xl font-black hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">CONFIRMER</button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Vos Rendez-vous</h2>
                    {appointments.length === 0 ? (
                        <div className="bg-white p-10 rounded-3xl text-center text-slate-400 border border-dashed border-slate-300">Aucun rendez-vous à venir.</div>
                    ) : (
                        appointments.map(a => (
                            <div key={a.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-lg transition">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"><User size={30} /></div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-lg">Dr. {a.doctor_name}</h4>
                                        <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">{a.specialty}</p>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest italic">
                                            <Calendar size={14} /> {new Date(a.date).toLocaleDateString()} <Clock size={14} className="ml-2" /> {new Date(a.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>
                                </div>
                                <span className="px-5 py-2 bg-green-100 text-green-700 rounded-full text-xs font-black tracking-widest uppercase">{a.status}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}