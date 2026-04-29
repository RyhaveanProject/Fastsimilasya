import React, { useEffect, useState } from 'react';
import { Wallet, Zap, Trophy, Gift, MessageCircle, Home, User, Briefcase } from 'lucide-react';

function App() {
  const [user, setUser] = useState({ balance: 0, energy: 100, level: 1 });

  useEffect(() => {
    // Telegram SDK işə salınır
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Ekranı tam boyda aç
      tg.headerColor = '#050507';
    }
  }, []);

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Üst Profil Bölməsi */}
      <div className="crystal-glass rounded-[2.5rem] p-6 mb-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-700 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Premium Player</p>
              <h2 className="text-lg font-black tracking-tight italic uppercase">Grand Life</h2>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-amber-500">
              <Trophy className="w-4 h-4" />
              <span className="font-black text-xl">{user.level}</span>
            </div>
            <p className="text-[9px] uppercase text-zinc-600 font-bold">Level</p>
          </div>
        </div>

        {/* Balans və Enerji */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase">Balance</p>
              <p className="text-lg font-mono font-bold">${user.balance.toLocaleString()}</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400 fill-current" />
            <div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase">Energy</p>
              <p className="text-lg font-mono font-bold">{user.energy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Oyun Düymələri */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="glass p-6 rounded-3xl tap-scale flex flex-col items-center justify-center border border-white/5">
          <Briefcase className="w-8 h-8 mb-2 text-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-tighter">İşə Başla</span>
        </button>
        <button className="glass p-6 rounded-3xl tap-scale flex flex-col items-center justify-center border border-white/5">
          <div className="text-3xl mb-2">🏎️</div>
          <span className="text-[11px] font-black uppercase tracking-tighter">Mənim Qarajım</span>
        </button>
      </div>

      {/* Alt Naviqasiya Menyusu */}
      <div className="fixed bottom-6 left-4 right-4 h-20 glass rounded-[2.5rem] flex items-center justify-around px-6 border border-white/10 shadow-2xl">
        <button className="tap-scale"><Home className="w-6 h-6 text-zinc-500" /></button>
        <button className="tap-scale"><MessageCircle className="w-6 h-6 text-cyan-400" /></button>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center -mt-12 shadow-[0_0_30px_rgba(255,255,255,0.3)] tap-scale">
          <span className="text-black font-black text-xl">GO</span>
        </div>
        <button className="tap-scale"><Gift className="w-6 h-6 text-pink-400" /></button>
        <button className="tap-scale"><User className="w-6 h-6 text-zinc-500" /></button>
      </div>
    </div>
  );
}

export default App;
