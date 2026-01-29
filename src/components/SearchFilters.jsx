import React from 'react';
import { Shield, Users, MapPin, DollarSign, Briefcase, TrendingUp, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { investorTypes, indiaLocations, fundSizes, indianSectors, stages } from '../lib/mockData';

export default function SearchFilters({ searchParams, setSearchParams, findInvestors, loading }) {
    return (
        <div className="mb-10 animate-slideInUp">
            <div className="glass-strong rounded-3xl p-8 shadow-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-white/5 to-transparent">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold font-title mb-3 text-white">Find Verified India Investors</h2>
                    <p className="text-xl text-emerald-200">Get 200-300 <span className="font-bold text-emerald-400">verified & deliverable</span> emails - No bounces, No invalid addresses!</p>
                </div>

                {/* Verification Level Selection */}
                <div className="mb-6 p-5 bg-emerald-950/30 rounded-2xl border border-emerald-500/30 hover:bg-emerald-950/40 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-500/20 p-2 rounded-full">
                            <Shield className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={searchParams.onlyDeliverable}
                                        onChange={(e) => setSearchParams({ ...searchParams, onlyDeliverable: e.target.checked })}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-emerald-100 group-hover:text-white transition-colors">Only Deliverable Emails (Recommended)</div>
                                    <div className="text-sm text-emerald-300">Filter out invalid, undeliverable, and risky email addresses</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Investor Type Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-bold mb-4 text-emerald-200 uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Select Investor Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {investorTypes.map(type => {
                            const Icon = type.icon;
                            const isSelected = searchParams.investorType === type.value;
                            return (
                                <button
                                    key={type.value}
                                    onClick={() => setSearchParams({ ...searchParams, investorType: type.value })}
                                    className={`p-4 rounded-xl font-semibold transition-all border-2 flex flex-col items-center justify-center text-center gap-2 h-full ${isSelected
                                            ? 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-500 shadow-lg scale-105'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/50'
                                        }`}
                                >
                                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                                    <div className="text-xs leading-tight">{type.label}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <FilterSelect
                        label="Location in India"
                        icon={MapPin}
                        value={searchParams.location}
                        onChange={(val) => setSearchParams({ ...searchParams, location: val })}
                        options={indiaLocations.map(l => ({ value: l, label: l }))}
                        defaultLabel="All India"
                        defaultValue="all"
                    />
                    <FilterSelect
                        label="Fund Size"
                        icon={DollarSign}
                        value={searchParams.fundSize}
                        onChange={(val) => setSearchParams({ ...searchParams, fundSize: val })}
                        options={fundSizes.map(s => ({ value: s, label: s }))}
                        defaultLabel="All Sizes"
                        defaultValue=""
                    />
                    <FilterSelect
                        label="Sector Focus"
                        icon={Briefcase}
                        value={searchParams.sector}
                        onChange={(val) => setSearchParams({ ...searchParams, sector: val })}
                        options={indianSectors.map(s => ({ value: s, label: s }))}
                        defaultLabel="All Sectors"
                        defaultValue=""
                    />
                    <FilterSelect
                        label="Investment Stage"
                        icon={TrendingUp}
                        value={searchParams.stage}
                        onChange={(val) => setSearchParams({ ...searchParams, stage: val })}
                        options={stages.map(s => ({ value: s, label: s }))}
                        defaultLabel="All Stages"
                        defaultValue=""
                    />
                </div>

                {/* Search Button */}
                <div className="flex items-end gap-4 flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-bold mb-2 text-emerald-200">
                            Number of Results
                        </label>
                        <div className="relative">
                            <select
                                value={searchParams.limit}
                                onChange={(e) => setSearchParams({ ...searchParams, limit: parseInt(e.target.value) })}
                                className="w-full px-4 py-4 bg-slate-900/50 border-2 border-white/10 rounded-xl text-white font-bold text-lg focus:border-emerald-500 focus:outline-none appearance-none"
                            >
                                <option value={100}>100 investors</option>
                                <option value={200}>200 investors</option>
                                <option value={300}>300 investors ⭐</option>
                                <option value={500}>500 investors</option>
                            </select>
                            <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                        </div>
                    </div>

                    <button
                        onClick={findInvestors}
                        disabled={loading}
                        className={`flex-1 w-full px-12 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 rounded-xl font-black text-xl text-white hover:from-emerald-500 hover:via-teal-500 hover:to-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] transform flex items-center justify-center gap-3`}
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="w-6 h-6 animate-spin" />
                                <span>Verifying Emails...</span>
                            </>
                        ) : (
                            <>
                                <Shield className="w-7 h-7" />
                                <span>Find & Verify {searchParams.limit} Emails</span>
                                <ArrowRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function FilterSelect({ label, icon: Icon, value, onChange, options, defaultLabel, defaultValue }) {
    return (
        <div>
            <label className="block text-sm font-bold mb-2 text-emerald-200">
                <Icon className="w-4 h-4 inline mr-1" />
                {label}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border-2 border-white/10 rounded-xl text-white font-medium focus:border-emerald-500 focus:outline-none appearance-none"
                >
                    <option value={defaultValue}>{defaultLabel}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
            </div>
        </div>
    );
}
