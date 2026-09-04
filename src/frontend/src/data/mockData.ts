export type VerificationStatus = "verified" | "suspicious" | "fake";

export type DocumentType =
  | "Aadhaar"
  | "PAN"
  | "Passport"
  | "Driving License"
  | "Voter ID";

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

export interface RiskIndicator {
  label: string;
  severity: "low" | "medium" | "high";
}

export interface VerificationRecord {
  id: string;
  documentType: DocumentType;
  documentNumber: string;
  holderName: string;
  status: VerificationStatus;
  confidence: number;
  submittedAt: string;
  verifiedAt: string;
  extractedFields: ExtractedField[];
  riskIndicators: RiskIndicator[];
}

export const STATUS_META: Record<
  VerificationStatus,
  { label: string; tone: "success" | "warning" | "danger" }
> = {
  verified: { label: "Verified", tone: "success" },
  suspicious: { label: "Suspicious", tone: "warning" },
  fake: { label: "Fake", tone: "danger" },
};

export const DOCUMENT_TYPES: DocumentType[] = [
  "Aadhaar",
  "PAN",
  "Passport",
  "Driving License",
  "Voter ID",
];

export const mockVerifications: VerificationRecord[] = [
  {
    id: "vs-1001",
    documentType: "Aadhaar",
    documentNumber: "XXXX-XXXX-4821",
    holderName: "Ananya Sharma",
    status: "verified",
    confidence: 98.4,
    submittedAt: "2026-09-03T09:12:00Z",
    verifiedAt: "2026-09-03T09:12:41Z",
    extractedFields: [
      { label: "Full Name", value: "Ananya Sharma", confidence: 99.1 },
      { label: "Date of Birth", value: "14 Mar 1992", confidence: 98.7 },
      { label: "Gender", value: "Female", confidence: 99.4 },
      {
        label: "Address",
        value: "42 Lakeview Road, Bengaluru",
        confidence: 96.8,
      },
    ],
    riskIndicators: [
      { label: "Hologram pattern", severity: "low" },
      { label: "Font consistency", severity: "low" },
    ],
  },
  {
    id: "vs-1002",
    documentType: "PAN",
    documentNumber: "ABCDE1234F",
    holderName: "Rohan Mehta",
    status: "verified",
    confidence: 96.9,
    submittedAt: "2026-09-03T08:45:00Z",
    verifiedAt: "2026-09-03T08:45:32Z",
    extractedFields: [
      { label: "Full Name", value: "Rohan Mehta", confidence: 98.2 },
      { label: "Father's Name", value: "Suresh Mehta", confidence: 95.6 },
      { label: "Date of Birth", value: "02 Jul 1988", confidence: 97.9 },
      { label: "PAN Number", value: "ABCDE1234F", confidence: 99.0 },
    ],
    riskIndicators: [{ label: "Watermark integrity", severity: "low" }],
  },
  {
    id: "vs-1003",
    documentType: "Passport",
    documentNumber: "K1234567",
    holderName: "Priya Nair",
    status: "suspicious",
    confidence: 71.2,
    submittedAt: "2026-09-03T07:58:00Z",
    verifiedAt: "2026-09-03T07:59:05Z",
    extractedFields: [
      { label: "Full Name", value: "Priya Nair", confidence: 92.4 },
      { label: "Date of Birth", value: "21 Nov 1990", confidence: 88.1 },
      { label: "Nationality", value: "Indian", confidence: 95.3 },
      { label: "Passport Number", value: "K1234567", confidence: 84.6 },
    ],
    riskIndicators: [
      { label: "MRZ checksum mismatch", severity: "high" },
      { label: "Photo tampering", severity: "medium" },
    ],
  },
  {
    id: "vs-1004",
    documentType: "Driving License",
    documentNumber: "DL-09-2020-88412",
    holderName: "Arjun Reddy",
    status: "fake",
    confidence: 22.8,
    submittedAt: "2026-09-02T18:20:00Z",
    verifiedAt: "2026-09-02T18:21:12Z",
    extractedFields: [
      { label: "Full Name", value: "Arjun Reddy", confidence: 78.9 },
      { label: "Date of Birth", value: "05 Jan 1985", confidence: 74.2 },
      { label: "License Class", value: "LMV", confidence: 61.5 },
      { label: "License Number", value: "DL-09-2020-88412", confidence: 55.3 },
    ],
    riskIndicators: [
      { label: "Serial number not in registry", severity: "high" },
      { label: "Hologram absent", severity: "high" },
      { label: "Font inconsistency", severity: "high" },
    ],
  },
  {
    id: "vs-1005",
    documentType: "Voter ID",
    documentNumber: "ABC1234567",
    holderName: "Kavita Joshi",
    status: "verified",
    confidence: 97.6,
    submittedAt: "2026-09-02T15:05:00Z",
    verifiedAt: "2026-09-02T15:05:44Z",
    extractedFields: [
      { label: "Full Name", value: "Kavita Joshi", confidence: 98.8 },
      { label: "Father's Name", value: "Mohan Joshi", confidence: 96.4 },
      { label: "Date of Birth", value: "30 Sep 1994", confidence: 97.1 },
      { label: "Constituency", value: "Pune North", confidence: 95.9 },
    ],
    riskIndicators: [{ label: "Ghost image alignment", severity: "low" }],
  },
  {
    id: "vs-1006",
    documentType: "Aadhaar",
    documentNumber: "XXXX-XXXX-9034",
    holderName: "Vikram Singh",
    status: "suspicious",
    confidence: 64.5,
    submittedAt: "2026-09-02T11:40:00Z",
    verifiedAt: "2026-09-02T11:41:18Z",
    extractedFields: [
      { label: "Full Name", value: "Vikram Singh", confidence: 90.2 },
      { label: "Date of Birth", value: "17 Apr 1979", confidence: 85.7 },
      { label: "Gender", value: "Male", confidence: 93.1 },
      { label: "Address", value: "8 MG Road, Delhi", confidence: 70.4 },
    ],
    riskIndicators: [
      { label: "QR code decode failure", severity: "high" },
      { label: "Background texture anomaly", severity: "medium" },
    ],
  },
  {
    id: "vs-1007",
    documentType: "Passport",
    documentNumber: "M7654321",
    holderName: "Sneha Kulkarni",
    status: "verified",
    confidence: 99.1,
    submittedAt: "2026-09-02T09:30:00Z",
    verifiedAt: "2026-09-02T09:30:57Z",
    extractedFields: [
      { label: "Full Name", value: "Sneha Kulkarni", confidence: 99.3 },
      { label: "Date of Birth", value: "08 Feb 1996", confidence: 98.9 },
      { label: "Nationality", value: "Indian", confidence: 99.5 },
      { label: "Passport Number", value: "M7654321", confidence: 99.0 },
    ],
    riskIndicators: [{ label: "MRZ checksum", severity: "low" }],
  },
  {
    id: "vs-1008",
    documentType: "PAN",
    documentNumber: "PQRSW9876X",
    holderName: "Manish Gupta",
    status: "fake",
    confidence: 18.3,
    submittedAt: "2026-09-01T16:55:00Z",
    verifiedAt: "2026-09-01T16:56:20Z",
    extractedFields: [
      { label: "Full Name", value: "Manish Gupta", confidence: 82.1 },
      { label: "Father's Name", value: "Rajesh Gupta", confidence: 71.8 },
      { label: "Date of Birth", value: "23 Jun 1983", confidence: 68.4 },
      { label: "PAN Number", value: "PQRSW9876X", confidence: 49.7 },
    ],
    riskIndicators: [
      { label: "PAN format invalid", severity: "high" },
      { label: "Signature mismatch", severity: "high" },
      { label: "Issuer logo altered", severity: "high" },
    ],
  },
];

export function getVerificationById(
  id: string,
): VerificationRecord | undefined {
  return mockVerifications.find((record) => record.id === id);
}

export function getDashboardStats() {
  const total = mockVerifications.length;
  const verified = mockVerifications.filter(
    (r) => r.status === "verified",
  ).length;
  const suspicious = mockVerifications.filter(
    (r) => r.status === "suspicious",
  ).length;
  const fake = mockVerifications.filter((r) => r.status === "fake").length;
  return { total, verified, suspicious, fake };
}
