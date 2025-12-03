import React from 'react';

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

export interface User {
    id: string;
    username: string;
    name: string;
    role: UserRole;
    accessLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
    assignedRegionId?: string;
    assignedSquadronId?: string;
    linkedCadetId?: string;
    permissions?: string[];
}

export interface DashboardItem {
    id: string;
    label: string;
    icon: React.ComponentType;
    path: string;
    permission?: string;
}
