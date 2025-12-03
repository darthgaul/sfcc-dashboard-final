import React from 'react';

export enum ViewRole {
  HQ = 'HQ View',
  REGIONAL = 'Regional View',
  SQUADRON = 'Squadron View',
  CADET = 'Cadet View',
  PARENT = 'Parent View',
}

export enum UserRole {
  BOARD_OF_DIRECTORS = 'Board of Directors',
  EXTERNAL_AUDITOR = 'External Auditor',
  EXECUTIVE_STAFF = 'Executive Staff (HQ)',
  CFO_TREASURER = 'CFO / Treasurer',
  SUPPORT_STAFF = 'Support Staff (DTE/Risk)',
  REGIONAL_COMMANDER = 'Regional Commander',
  SQUADRON_COMMANDER = 'Squadron Commander',
  REVIEWER_INSTRUCTOR = 'Reviewer / Instructor',
  CADET_MEMBER = 'Cadet Member',
  PARENT_GUARDIAN = 'Parent / Guardian',
}

export enum Permission {
  // Data Views (Read)
  VIEW_HQ_DASHBOARD = 'view:hq_dashboard',
  VIEW_REGIONAL_DASHBOARD = 'view:regional_dashboard',
  VIEW_SQUADRON_DASHBOARD = 'view:squadron_dashboard',
  VIEW_CADET_DASHBOARD = 'view:cadet_dashboard',
  VIEW_PARENT_DASHBOARD = 'view:parent_dashboard',
  
  VIEW_ALL_FINANCIALS = 'read:financials_all',
  VIEW_AUDITED_FINANCIALS = 'read:financials_audited',
  VIEW_PII_SENSITIVE = 'read:pii_sensitive',
  VIEW_OWN_PORTFOLIO = 'read:own_portfolio',
  VIEW_LOCAL_SQUADRON_DATA = 'read:local_squadron_data',
  
  // Write / Execute (Transactional)
  EXECUTE_FINANCIAL_DISBURSEMENT = 'write:financial_disbursement',
  SCORE_ARTIFACT = 'write:artifact_score',
  ATTEST_SAFETY_OPSEC = 'write:safety_opsec',
  UPDATE_OWN_PORTFOLIO = 'write:own_portfolio',
  APPROVE_LOCAL_WAIVER = 'write:approve_waiver',
  ISSUE_CORRECTIVE_ORDER = 'write:corrective_order',
  APPROVE_POLICY_AMENDMENT = 'write:approve_policy',
  APPROVE_ARCHIVAL = 'write:approve_archival',
  
  // System Control
  MANAGE_RUBRIC_SCHEMA = 'system:manage_schema',
  MANAGE_WORKFLOWS = 'system:manage_workflows',
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  accessLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5'; // Security clearance levels
  
  // Data Scoping
  assignedRegionId?: string;   // e.g., 'REG-NE'
  assignedSquadronId?: string; // e.g., 'SQ-101'
  linkedCadetId?: string;      // e.g., 'u-009'
  
  // Computed Permissions
  permissions?: Permission[];
}

export interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'default' | 'red' | 'green' | 'blue';
}

export interface TableRow {
  id: string;
  col1: string | React.ReactNode;
  col2: string | React.ReactNode;
  col3: string | React.ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}