import { Users, Star, TrendingUp, Briefcase, Building2, DollarSign } from 'lucide-react';

export const investorTypes = [
    { value: 'all', label: 'All Investors', icon: Users },
    { value: 'angel', label: 'Angel Investors', icon: Star },
    { value: 'vc', label: 'VC Firms', icon: TrendingUp },
    { value: 'vc_partners', label: 'VC Partners', icon: Briefcase },
    { value: 'family_office', label: 'Family Offices', icon: Building2 },
    { value: 'hni', label: 'HNI Investors', icon: DollarSign }
];

export const indiaLocations = [
    'All India',
    'Bangalore',
    'Mumbai',
    'Delhi NCR',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'International (Invests in India)'
];

export const fundSizes = [
    'Under ₹10 Cr', '₹10-50 Cr', '₹50-100 Cr', '₹100-500 Cr',
    '₹500 Cr - ₹1000 Cr', 'Over ₹1000 Cr'
];

export const indianSectors = [
    'AI/ML', 'SaaS', 'FinTech', 'EdTech', 'HealthTech', 'E-commerce',
    'Agritech', 'B2B', 'D2C', 'Enterprise', 'Logistics', 'CleanTech',
    'DeepTech', 'Gaming', 'Social Commerce', 'Quick Commerce'
];

export const stages = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth', 'Late Stage'
];

export const getRandomInvestorType = () => {
    const types = ['Angel', 'VC Partner', 'Managing Partner', 'Family Office', 'Principal', 'Investment Director'];
    return types[Math.floor(Math.random() * types.length)];
};

export const generateIndiaFirmName = (index) => {
    const indianFirms = [
        'Sequoia India', 'Accel India', 'Lightspeed India', 'Matrix Partners India',
        'Nexus Venture Partners', 'Kalaari Capital', 'Blume Ventures', 'Chiratae Ventures',
        'Elevation Capital', 'Fireside Ventures', 'Stellaris Venture Partners',
        'Prime Venture Partners', 'Inventus Capital', 'India Quotient', 'Arkam Ventures',
        '3one4 Capital', 'Orios Venture Partners', 'Unicorn India Ventures', 'Pi Ventures'
    ];

    return indianFirms[index % indianFirms.length];
};

export const generateIndianName = () => {
    const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Ananya', 'Rohan', 'Meera', 'Arjun', 'Kavya'];
    const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Agarwal', 'Reddy', 'Iyer', 'Mehta', 'Gupta', 'Nair'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
};

export const generateIndiaInvestorEmail = (index, name) => {
    const domains = [
        'sequoiacap.com', 'accel.com', 'lightspeedvp.com', 'matrixpartners.in',
        'nexusvp.com', 'kalaari.com', 'blume.vc', 'chiratae.com'
    ];

    const lowerName = name.toLowerCase();
    const [first, last] = lowerName.split(' ');

    const formats = [
        `${first}.${last}@${domains[index % domains.length]}`,
        `${first}@${domains[index % domains.length]}`,
        `${first[0]}${last}@${domains[index % domains.length]}`
    ];

    return formats[index % formats.length];
};

export const generateSecondaryEmail = (index, name) => {
    const personalDomains = ['gmail.com', 'outlook.com'];
    const lowerName = name.toLowerCase().replace(' ', '.');
    return `${lowerName}@${personalDomains[index % personalDomains.length]}`;
};

export const generateIndianPhone = () => {
    const prefixes = ['98', '99', '97', '96', '95', '94', '93', '92', '91', '90'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(Math.random() * 100000000);
    return `+91 ${prefix}${number.toString().padStart(8, '0')}`;
};

export const generatePosition = () => {
    const positions = [
        'Managing Partner', 'General Partner', 'Partner', 'Principal', 'Vice President',
        'Investment Director', 'Senior Associate', 'Investment Manager', 'Venture Partner'
    ];
    return positions[Math.floor(Math.random() * positions.length)];
};

export const generateSectors = () => {
    const count = Math.floor(Math.random() * 4) + 1;
    const selected = [];
    for (let i = 0; i < count; i++) {
        // use exported indianSectors
        const sector = indianSectors[Math.floor(Math.random() * indianSectors.length)];
        if (!selected.includes(sector)) selected.push(sector);
    }
    return selected;
};

export const generateRecentIndianInvestments = () => {
    const startups = ['Zepto', 'PhonePe', 'CRED', 'Razorpay', 'Meesho', 'ShareChat'];
    const count = Math.floor(Math.random() * 3) + 1;
    const selected = [];
    for (let i = 0; i < count; i++) {
        const startup = startups[Math.floor(Math.random() * startups.length)];
        if (!selected.includes(startup)) selected.push(startup);
    }
    return selected;
};

export const generateIndianPortfolio = () => {
    const companies = ['Flipkart', 'Swiggy', 'Ola', 'Zomato', 'Paytm', 'Razorpay', 'CRED'];
    return companies[Math.floor(Math.random() * companies.length)];
};

export const generateWebsite = (index) => {
    const domains = ['sequoiacap.com', 'accel.com', 'blume.vc', 'kalaari.com'];
    return domains[index % domains.length];
};

export const generateChequeSize = () => {
    const sizes = ['₹50L-₹2Cr', '₹2-5Cr', '₹5-10Cr', '₹10-25Cr', '₹25-50Cr', '₹50Cr+'];
    return sizes[Math.floor(Math.random() * sizes.length)];
};

export const getRandomIndiaLocation = () => {
    return indiaLocations[Math.floor(Math.random() * (indiaLocations.length - 1)) + 1];
};

export const generateRecentDate = () => {
    const days = Math.floor(Math.random() * 60);
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
};

export const verifyEmail = async (email) => {
    // Simulate verification API call
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate different verification results
    const random = Math.random();

    if (random > 0.95) {
        return {
            isValid: false,
            isDeliverable: false,
            status: 'invalid',
            reason: 'Invalid format',
            riskScore: 100
        };
    } else if (random > 0.90) {
        return {
            isValid: true,
            isDeliverable: false,
            status: 'undeliverable',
            reason: 'Mailbox does not exist',
            riskScore: 95
        };
    } else if (random > 0.85) {
        return {
            isValid: true,
            isDeliverable: false,
            status: 'catch-all',
            reason: 'Catch-all domain',
            riskScore: 60
        };
    } else if (random > 0.80) {
        return {
            isValid: true,
            isDeliverable: true,
            status: 'risky',
            reason: 'Accept-all server',
            riskScore: 40
        };
    } else {
        return {
            isValid: true,
            isDeliverable: true,
            status: 'deliverable',
            reason: 'Verified deliverable',
            riskScore: Math.floor(Math.random() * 10)
        };
    }
};

export const generateInvestorResults = (count, searchParams) => {
    return Array.from({ length: count }, (_, i) => {
        const name = generateIndianName();
        // Pass name to email generators to keep consistent if we want (though original didn't pass name index-wise, it generated name inside).
        // Original: const name = generateIndianName(); // new random name inside `generateIndiaInvestorEmail`?
        // Wait, original: `contactName: generateIndianName(), email: generateIndiaInvestorEmail(i)`
        // `generateIndiaInvestorEmail(i)` generated a NEW name inside it: `const name = generateIndianName().toLowerCase();`
        // So email name and contact name were mismatched in original code!
        // "Rahul Sharma" contacting as "vikram.patel@..." ?
        // Line 124: `contactName: generateIndianName()`
        // Line 125: `email: generateIndiaInvestorEmail(i)` -> invokes `generateIndianName()` inside.
        // Yes, they were mismatched. I should probably fix this 'bug' for polish, or keep it strict if 'strict logic preservation' means preserving bugs too.
        // The prompt says "Do not make any changes to the existing code logic or flow."
        // But mismatched names are pretty bad.
        // "UI polish" implies "Clean, professional". Mismatched names look unprofessional.
        // I will fix it by passing the name, if I can.
        // But for strict compliance, I'll stick to original behavior unless it's glaringly broken. 
        // Actually, let's look at `generateIndiaInvestorEmail` in original code (Line 224).
        // It calls `generateIndianName()`.
        // So yes, random name.
        // I'll keep it as is for safety, or better yet, I should check if I can fix it lightly.
        // I'll stick to original logic to be safe alongside the constraint.

        return {
            id: i + 1,
            type: getRandomInvestorType(),
            firmName: generateIndiaFirmName(i),
            contactName: generateIndianName(),
            email: generateIndiaInvestorEmail(i, generateIndianName()), // Passing a name to match signature I created above
            secondaryEmail: Math.random() > 0.7 ? generateSecondaryEmail(i, generateIndianName()) : null,
            phone: generateIndianPhone(),
            position: generatePosition(),
            location: searchParams.location === 'all' ? getRandomIndiaLocation() : searchParams.location,
            fundSize: searchParams.fundSize || fundSizes[Math.floor(Math.random() * fundSizes.length)],
            sectors: generateSectors(),
            stage: searchParams.stage || stages[Math.floor(Math.random() * stages.length)],
            recentInvestments: generateRecentIndianInvestments(),
            notablePortfolio: generateIndianPortfolio(),
            portfolioSize: Math.floor(Math.random() * 80) + 10,
            linkedin: `linkedin.com/in/${generateIndianName().toLowerCase().replace(' ', '-')}`,
            twitter: `@${generateIndianName().split(' ')[0].toLowerCase()}`,
            firmWebsite: generateWebsite(i),
            chequeSize: generateChequeSize(),
            investmentCount: Math.floor(Math.random() * 50) + 5,
            foundedYear: Math.floor(Math.random() * 15) + 2010,
            lastActivity: generateRecentDate()
        };
    });
};
