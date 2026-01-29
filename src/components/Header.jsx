import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

export default function Header() {
    return (
        <div className="border-b border-white/10 glass-strong sticky top-0 z-50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black font-title tracking-tight text-white leading-none">
                                <span className="gradient-text">Verified India Investor</span> Finder
                            </h1>
                            <p className="text-sm text-emerald-300 font-semibold mt-1">🇮🇳 100% Verified & Deliverable Email Addresses</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                            <Shield className="w-4 h-4" />
                            <span>Email Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-teal-400 font-bold bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Deliverability Checked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
