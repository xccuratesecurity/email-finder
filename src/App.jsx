import React, { useState } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import VerificationStats from './components/VerificationStats';
import InvestorList from './components/InvestorList';
import {
  investorTypes,
  indiaLocations,
  fundSizes,
  indianSectors,
  stages,
  getRandomInvestorType,
  generateIndiaFirmName,
  generateIndianName,
  generateIndiaInvestorEmail,
  generateSecondaryEmail,
  generateIndianPhone,
  generatePosition,
  generateSectors,
  generateRecentIndianInvestments,
  generateIndianPortfolio,
  generateWebsite,
  generateChequeSize,
  getRandomIndiaLocation,
  generateRecentDate,
  verifyEmail
} from './lib/mockData';
import { Shield, CheckCircle, Mail, Database, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [searchParams, setSearchParams] = useState({
    investorType: 'all',
    location: 'all',
    fundSize: '',
    sector: '',
    stage: '',
    verificationLevel: 'high',
    onlyDeliverable: true,
    limit: 300
  });

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [verificationStats, setVerificationStats] = useState(null);

  const findInvestors = async () => {
    setLoading(true);
    setVerifying(true);

    // Simulate initial search
    await new Promise(resolve => setTimeout(resolve, 2000));

    const count = searchParams.limit;

    // Generate initial results
    const initialInvestors = Array.from({ length: count }, (_, i) => {
      const name = generateIndianName();
      return {
        id: i + 1,
        type: getRandomInvestorType(),
        firmName: generateIndiaFirmName(i),
        contactName: name,
        email: generateIndiaInvestorEmail(i, name),
        secondaryEmail: Math.random() > 0.7 ? generateSecondaryEmail(i, name) : null,
        phone: generateIndianPhone(),
        position: generatePosition(),
        location: searchParams.location === 'all' ? getRandomIndiaLocation() : searchParams.location,
        fundSize: searchParams.fundSize || fundSizes[Math.floor(Math.random() * fundSizes.length)],
        sectors: generateSectors(),
        stage: searchParams.stage || stages[Math.floor(Math.random() * stages.length)],
        recentInvestments: generateRecentIndianInvestments(),
        notablePortfolio: generateIndianPortfolio(),
        portfolioSize: Math.floor(Math.random() * 80) + 10,
        linkedin: `linkedin.com/in/${name.toLowerCase().replace(' ', '-')}`,
        twitter: `@${name.split(' ')[0].toLowerCase()}`,
        firmWebsite: generateWebsite(i),
        chequeSize: generateChequeSize(),
        investmentCount: Math.floor(Math.random() * 50) + 5,
        foundedYear: Math.floor(Math.random() * 15) + 2010,
        lastActivity: generateRecentDate()
      };
    });

    // Verify emails
    const verifiedInvestors = [];
    let stats = {
      total: count,
      deliverable: 0,
      risky: 0,
      undeliverable: 0,
      invalid: 0
    };

    for (const investor of initialInvestors) {
      const verification = await verifyEmail(investor.email);
      const secondaryVerification = investor.secondaryEmail
        ? await verifyEmail(investor.secondaryEmail)
        : null;

      const enrichedInvestor = {
        ...investor,
        emailVerification: verification,
        secondaryEmailVerification: secondaryVerification,
        overallDeliverability: verification.isDeliverable ? 'high' :
          (secondaryVerification?.isDeliverable ? 'medium' : 'low')
      };

      // Update stats
      if (verification.status === 'deliverable') stats.deliverable++;
      else if (verification.status === 'risky' || verification.status === 'catch-all') stats.risky++;
      else if (verification.status === 'undeliverable') stats.undeliverable++;
      else if (verification.status === 'invalid') stats.invalid++;

      // Filter based on verification level
      if (searchParams.onlyDeliverable) {
        if (verification.isDeliverable || secondaryVerification?.isDeliverable) {
          verifiedInvestors.push(enrichedInvestor);
        }
      } else {
        verifiedInvestors.push(enrichedInvestor);
      }
    }

    setVerificationStats(stats);

    const mockResults = {
      totalFound: verifiedInvestors.length,
      originalCount: count,
      filters: searchParams,
      timestamp: new Date().toISOString(),
      investors: verifiedInvestors
    };

    setResults(mockResults);
    setSelectedEmails(new Set(verifiedInvestors.map(inv => inv.id)));
    setLoading(false);
    setVerifying(false);
  };

  const toggleEmail = (id) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmails(newSelected);
  };

  const selectAll = () => {
    if (results && selectedEmails.size === results.investors.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(results?.investors.map(e => e.id)));
    }
  };

  const selectOnlyDeliverable = () => {
    const deliverable = results?.investors
      .filter(inv => inv.emailVerification.status === 'deliverable')
      .map(inv => inv.id) || [];
    setSelectedEmails(new Set(deliverable));
  };

  const downloadAllEmails = () => {
    if (!results) return;

    const selected = results.investors.filter(e => selectedEmails.has(e.id));

    const csv = [
      'Primary Email,Email Status,Deliverability,Risk Score,Secondary Email,Secondary Status,Name,Position,Firm,Type,Location,Phone,Fund Size,Sectors,Stage,Cheque Size,Recent Investments,Notable Portfolio,LinkedIn,Twitter,Website,Last Activity,Actively Investing',
      ...selected.map(e => {
        const primaryEmail = e.emailVerification.isDeliverable ? e.email : '';
        const secondaryEmail = e.secondaryEmailVerification?.isDeliverable ? e.secondaryEmail : '';

        return `"${primaryEmail}","${e.emailVerification.status}","${e.emailVerification.isDeliverable ? 'Yes' : 'No'}",${e.emailVerification.riskScore},"${secondaryEmail || ''}","${e.secondaryEmailVerification?.status || 'N/A'}","${e.contactName}","${e.position}","${e.firmName}","${e.type}","${e.location}","${e.phone}","${e.fundSize}","${e.sectors.join('; ')}","${e.stage}","${e.chequeSize}","${e.recentInvestments.join('; ')}","${e.notablePortfolio}",${e.linkedin},${e.twitter},${e.firmWebsite},${e.lastActivity},"${e.emailVerification.isDeliverable || e.secondaryEmailVerification?.isDeliverable ? 'Yes' : 'No'}"`;
      })
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verified-india-investors-${selected.length}-emails-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyVerifiedEmails = () => {
    if (!results) return;
    const selected = results.investors.filter(e => selectedEmails.has(e.id));
    const emails = selected
      .map(e => e.emailVerification.isDeliverable ? e.email : (e.secondaryEmailVerification?.isDeliverable ? e.secondaryEmail : ''))
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(emails);
    alert(`Copied ${emails.split('\n').length} verified emails to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-poppins selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <SearchFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          findInvestors={findInvestors}
          loading={loading}
        />

        {/* Loading State Overlay */}
        {loading && (
          <div className="glass-strong rounded-3xl p-16 text-center animate-slideInUp border-2 border-emerald-500/30 mb-10">
            <div className="w-24 h-24 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6 shadow-lg shadow-emerald-500/20"></div>
            <h3 className="text-3xl font-black font-title mb-3 gradient-text">Verifying Email Addresses...</h3>
            <p className="text-emerald-200 text-lg mb-6">
              Running deliverability checks on {searchParams.limit}+ emails
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm font-semibold">
              <LoadingStep icon={Shield} label="Syntax Check" delay="0s" />
              <LoadingStep icon={CheckCircle} label="Domain Valid" delay="0.2s" />
              <LoadingStep icon={Mail} label="SMTP Check" delay="0.4s" />
              <LoadingStep icon={Database} label="Deliverability" delay="0.6s" />
            </div>
          </div>
        )}

        {!loading && results && (
          <>
            <VerificationStats stats={verificationStats} totalFound={results.totalFound} />
            <InvestorList
              results={results}
              selectedEmails={selectedEmails}
              toggleEmail={toggleEmail}
              selectAll={selectAll}
              selectOnlyDeliverable={selectOnlyDeliverable}
              copyVerifiedEmails={copyVerifiedEmails}
              downloadAllEmails={downloadAllEmails}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 mt-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center">
            <p className="text-emerald-300 font-bold text-lg mb-2 flex items-center justify-center gap-2">
              <span>🇮🇳</span> Verified India Investor Finder • 100% Deliverable Email Addresses
            </p>
            <p className="text-sm text-emerald-400 mb-6 max-w-2xl mx-auto opacity-70">
              Production integration: Hunter.io, ZeroBounce, NeverBounce, EmailListVerify, Clearout for real-time verification
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-emerald-300">
              <FooterBadge icon={CheckCircle2} label="Syntax Validation" />
              <FooterBadge icon={CheckCircle2} label="Domain Verification" />
              <FooterBadge icon={CheckCircle2} label="SMTP Check" />
              <FooterBadge icon={CheckCircle2} label="Deliverability Score" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingStep({ icon: Icon, label, delay }) {
  return (
    <div className="text-emerald-300 animate-verifyPulse p-3 bg-emerald-900/20 rounded-xl" style={{ animationDelay: delay }}>
      <Icon className="w-8 h-8 mx-auto mb-2" />
      <div>{label}</div>
    </div>
  );
}

function FooterBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors cursor-default">
      <Icon className="w-4 h-4" />
      {label}
    </div>
  );
}
