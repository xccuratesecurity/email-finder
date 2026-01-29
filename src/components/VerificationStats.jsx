import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Database, Shield } from 'lucide-react';

export default function VerificationStats({ stats, totalFound }) {
    if (!stats) return null;

    return (
        <div className="mb-6 animate-slideInUp">
            <div className="glass-strong rounded-3xl p-6 border-2 border-emerald-500/30 bg-black/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    Email Verification Results
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StatCard
                        icon={CheckCircle}
                        value={stats.deliverable}
                        label="Deliverable"
                        color="emerald"
                        bg="bg-emerald-950/30"
                        border="border-emerald-500/30"
                        textColor="text-emerald-400"
                        subTextColor="text-emerald-200"
                    />
                    <StatCard
                        icon={AlertCircle}
                        value={stats.risky}
                        label="Risky/Catch-All"
                        color="yellow"
                        bg="bg-yellow-950/30"
                        border="border-yellow-500/30"
                        textColor="text-yellow-400"
                        subTextColor="text-yellow-200"
                    />
                    <StatCard
                        icon={XCircle}
                        value={stats.undeliverable}
                        label="Undeliverable"
                        color="red"
                        bg="bg-red-950/30"
                        border="border-red-500/30"
                        textColor="text-red-400"
                        subTextColor="text-red-200"
                    />
                    <StatCard
                        icon={XCircle}
                        value={stats.invalid}
                        label="Invalid"
                        color="red"
                        bg="bg-red-950/40"
                        border="border-red-500/40"
                        textColor="text-red-500"
                        subTextColor="text-red-300"
                    />
                    <StatCard
                        icon={Database}
                        value={totalFound}
                        label="Total Found"
                        color="teal"
                        bg="bg-teal-950/30"
                        border="border-teal-500/30"
                        textColor="text-teal-400"
                        subTextColor="text-teal-200"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, value, label, bg, border, textColor, subTextColor }) {
    return (
        <div className={`text-center p-4 rounded-xl border ${bg} ${border} transition-transform hover:scale-105`}>
            <Icon className={`w-8 h-8 mx-auto mb-2 ${textColor}`} />
            <div className={`text-3xl font-black ${textColor}`}>{value}</div>
            <div className={`text-sm ${subTextColor}`}>{label}</div>
        </div>
    );
}
