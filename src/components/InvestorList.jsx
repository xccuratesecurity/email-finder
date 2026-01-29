import React from 'react';
import { Download, Copy, CheckCircle } from 'lucide-react';
import InvestorCard from './InvestorCard';

export default function InvestorList({
    results,
    selectedEmails,
    toggleEmail,
    selectAll,
    selectOnlyDeliverable,
    copyVerifiedEmails,
    downloadAllEmails
}) {
    if (!results) return null;

    return (
        <div className="space-y-6 animate-slideInUp">
            {/* Quick Action Bar */}
            <div className="glass-strong rounded-3xl p-6 shadow-2xl border-2 border-emerald-500/30 sticky top-24 z-40 backdrop-blur-xl transition-all duration-300">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
                    <div className="text-center xl:text-left">
                        <h3 className="text-2xl md:text-3xl font-black font-title mb-2">
                            <span className="gradient-text">{results.totalFound}</span> Verified Investors
                        </h3>
                        <p className="text-emerald-200 font-semibold">
                            Selected: <span className="text-white font-bold">{selectedEmails.size}</span> investors
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={selectAll}
                            className="px-4 md:px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border-2 border-white/20"
                        >
                            {selectedEmails.size === results.investors.length ? 'Deselect All' : 'Select All'}
                        </button>

                        <button
                            onClick={selectOnlyDeliverable}
                            className="px-4 md:px-6 py-3 bg-emerald-600/30 hover:bg-emerald-600/50 rounded-xl font-bold transition-all border-2 border-emerald-500/40 flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            <span className="hidden md:inline">Only Deliverable</span>
                            <span className="md:hidden">Deliverable</span>
                        </button>

                        <button
                            onClick={copyVerifiedEmails}
                            disabled={selectedEmails.size === 0}
                            className="px-4 md:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 shadow-lg flex items-center gap-2 disabled:cursor-not-allowed"
                        >
                            <Copy className="w-5 h-5" />
                            <span className="hidden md:inline">Copy {selectedEmails.size}</span>
                            <span className="md:hidden">Copy</span>
                        </button>

                        <button
                            onClick={downloadAllEmails}
                            disabled={selectedEmails.size === 0}
                            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-black text-lg disabled:opacity-50 shadow-2xl flex items-center gap-3 hover:scale-105 transform transition-transform disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <Download className="w-6 h-6" />
                            <span className="hidden md:inline">DOWNLOAD ({selectedEmails.size})</span>
                            <span className="md:hidden">Save</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Investor List */}
            <div className="space-y-3">
                {results.investors.map((investor) => (
                    <InvestorCard
                        key={investor.id}
                        investor={investor}
                        selected={selectedEmails.has(investor.id)}
                        onToggle={() => toggleEmail(investor.id)}
                    />
                ))}
            </div>

            {/* Bottom Action */}
            <div className="glass-strong rounded-3xl p-6 text-center border-2 border-emerald-500/30 mt-6">
                <p className="text-emerald-200 text-lg font-semibold mb-4">
                    Total: {results.totalFound} verified investors • Selected: {selectedEmails.size}
                </p>
                <button
                    onClick={downloadAllEmails}
                    disabled={selectedEmails.size === 0}
                    className="px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-black text-xl disabled:opacity-50 shadow-2xl inline-flex items-center gap-3 hover:scale-105 transform transition-transform disabled:cursor-not-allowed"
                >
                    <Download className="w-7 h-7" />
                    DOWNLOAD {selectedEmails.size} VERIFIED EMAILS
                </button>
            </div>
        </div>
    );
}
