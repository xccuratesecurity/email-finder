import React from 'react';
import { Mail, MapPin, Phone, Globe, Linkedin, Twitter, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function InvestorCard({ investor, selected, onToggle }) {

    const getStatusIcon = (status) => {
        switch (status) {
            case 'deliverable': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'risky': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            case 'catch-all': return <Clock className="w-4 h-4 text-orange-400" />;
            case 'undeliverable': return <XCircle className="w-4 h-4 text-red-400" />;
            case 'invalid': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            deliverable: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
            risky: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
            'catch-all': 'bg-orange-500/20 text-orange-300 border-orange-500/40',
            undeliverable: 'bg-red-500/20 text-red-300 border-red-500/40',
            invalid: 'bg-red-500/30 text-red-200 border-red-500/50'
        };
        return badges[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    };

    return (
        <div className="glass investor-card rounded-2xl p-6 border-2 border-white/10 hover:border-emerald-500/30 transition-all duration-300 bg-white/5">
            <div className="flex items-start gap-4">
                <div className="pt-1">
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={onToggle}
                        className="w-6 h-6 rounded-lg border-2 border-emerald-500/50 checked:bg-emerald-600 cursor-pointer accent-emerald-500"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h4 className="text-xl font-bold text-emerald-100 font-title truncate">{investor.contactName}</h4>
                                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm font-bold border border-emerald-500/40 whitespace-nowrap">
                                    {investor.type}
                                </span>
                            </div>

                            <div className="text-sm text-emerald-200 mb-3 font-semibold truncate">
                                {investor.position} at <span className="text-white font-bold">{investor.firmName}</span>
                            </div>

                            {/* Email Verification Box */}
                            <div className={cn(
                                "rounded-xl p-4 mb-3 border-2 transition-colors",
                                investor.emailVerification.status === 'deliverable'
                                    ? 'bg-emerald-950/40 border-emerald-500/40'
                                    : investor.emailVerification.status === 'risky'
                                        ? 'bg-yellow-950/40 border-yellow-500/40'
                                        : 'bg-red-950/40 border-red-500/40'
                            )}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span className="font-bold font-mono text-lg text-white break-all">{investor.email}</span>
                                        {getStatusIcon(investor.emailVerification.status)}
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={cn("px-3 py-1 rounded-lg text-xs font-bold border uppercase", getStatusBadge(investor.emailVerification.status))}>
                                            {investor.emailVerification.status}
                                        </span>
                                        <span className="text-xs text-gray-300 hidden sm:inline">{investor.emailVerification.reason}</span>
                                        <span className={cn("text-xs font-bold ml-auto sm:ml-0",
                                            investor.emailVerification.riskScore < 20 ? 'text-emerald-400' :
                                                investor.emailVerification.riskScore < 50 ? 'text-yellow-400' :
                                                    'text-red-400'
                                        )}>
                                            Risk: {investor.emailVerification.riskScore}%
                                        </span>
                                    </div>
                                </div>

                                {investor.secondaryEmail && (
                                    <div className="mt-3 pt-3 border-t border-white/10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span className="font-mono text-sm text-emerald-200 break-all">{investor.secondaryEmail}</span>
                                            {getStatusIcon(investor.secondaryEmailVerification?.status)}
                                        </div>
                                        <span className={cn("px-2 py-1 rounded text-xs font-bold border uppercase inline-block mt-1", getStatusBadge(investor.secondaryEmailVerification?.status))}>
                                            Secondary: {investor.secondaryEmailVerification?.status}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-300 mb-3 font-medium">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-emerald-500" />
                                    {investor.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4 text-emerald-500" />
                                    {investor.phone}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {investor.sectors.map((sector, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-sm border border-blue-500/30 font-semibold hover:bg-blue-500/20 transition-colors cursor-default">
                                        {sector}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar info (cheque size, portfolio, etc) - Hidden on small screens or stacked */}
                        <div className="w-full md:w-64 bg-black/20 rounded-xl p-4 text-xs border border-white/5 space-y-3 shrink-0">
                            <div>
                                <div className="text-gray-400 mb-1">Cheque Size</div>
                                <div className="font-bold text-white text-sm">{investor.chequeSize}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">Fund Size</div>
                                <div className="font-bold text-white">{investor.fundSize}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">Notable Portfolio</div>
                                <div className="text-emerald-400 font-medium">{investor.notablePortfolio}, {investor.recentInvestments[0]}...</div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-white/10 mt-2">
                                {investor.linkedin && <a href={`https://${investor.linkedin}`} target="_blank" rel="noreferrer" className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/40 transition"><Linkedin className="w-4 h-4" /></a>}
                                {investor.twitter && <a href={`https://twitter.com/${investor.twitter.replace('@', '')}`} target="_blank" rel="noreferrer" className="p-2 bg-sky-500/20 text-sky-400 rounded hover:bg-sky-500/40 transition"><Twitter className="w-4 h-4" /></a>}
                                {investor.firmWebsite && <a href={`https://${investor.firmWebsite}`} target="_blank" rel="noreferrer" className="p-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/40 transition"><Globe className="w-4 h-4" /></a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
