export const APP_NAME = "CannaClear";
export const APP_TAGLINE = "Your guided path to cannabis-free living";
export const REHAB_NAME = "White River Manor";

export const SEVERITY_TIERS = {
  mild: {
    label: "Mild Use",
    description: "Using 1\u20133 times per week for less than 1 year",
    color: "hsl(var(--secondary))",
    weeks: 6,
  },
  moderate: {
    label: "Moderate Use",
    description: "Daily use for 1\u20133 years",
    color: "hsl(var(--accent))",
    weeks: 10,
  },
  heavy: {
    label: "Heavy Use",
    description: "Multiple times daily for 3+ years",
    color: "hsl(var(--destructive))",
    weeks: 16,
  },
} as const;

export const POPIA_CONSENT_VERSION = "1.0.0";
