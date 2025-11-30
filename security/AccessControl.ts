import { User, UserRole, Permission } from '../types';

// Task 2: Implement Permissions Mapping (Access Control Logic)
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.BOARD_OF_DIRECTORS]: [
    Permission.VIEW_HQ_DASHBOARD,
    Permission.VIEW_AUDITED_FINANCIALS,
    Permission.APPROVE_POLICY_AMENDMENT,
  ],
  [UserRole.EXTERNAL_AUDITOR]: [
    Permission.VIEW_HQ_DASHBOARD,
    Permission.VIEW_ALL_FINANCIALS,
    Permission.VIEW_AUDITED_FINANCIALS,
  ],
  [UserRole.EXECUTIVE_STAFF]: [
    Permission.VIEW_HQ_DASHBOARD,
    Permission.VIEW_PII_SENSITIVE,
    Permission.MANAGE_WORKFLOWS,
    Permission.APPROVE_ARCHIVAL,
  ],
  [UserRole.CFO_TREASURER]: [
    Permission.VIEW_HQ_DASHBOARD,
    Permission.VIEW_ALL_FINANCIALS,
    Permission.VIEW_AUDITED_FINANCIALS,
    Permission.EXECUTE_FINANCIAL_DISBURSEMENT,
  ],
  [UserRole.SUPPORT_STAFF]: [
    Permission.VIEW_HQ_DASHBOARD,
    Permission.VIEW_PII_SENSITIVE,
    Permission.MANAGE_RUBRIC_SCHEMA,
    Permission.MANAGE_WORKFLOWS,
  ],
  [UserRole.REGIONAL_COMMANDER]: [
    Permission.VIEW_HQ_DASHBOARD, // Filtered view in practice
    Permission.VIEW_REGIONAL_DASHBOARD,
    Permission.ISSUE_CORRECTIVE_ORDER,
  ],
  [UserRole.SQUADRON_COMMANDER]: [
    Permission.VIEW_SQUADRON_DASHBOARD,
    Permission.VIEW_LOCAL_SQUADRON_DATA,
    Permission.APPROVE_LOCAL_WAIVER,
    Permission.ISSUE_CORRECTIVE_ORDER,
  ],
  [UserRole.REVIEWER_INSTRUCTOR]: [
    Permission.VIEW_SQUADRON_DASHBOARD,
    Permission.VIEW_LOCAL_SQUADRON_DATA,
    Permission.SCORE_ARTIFACT,
    Permission.ATTEST_SAFETY_OPSEC,
  ],
  [UserRole.CADET_MEMBER]: [
    Permission.VIEW_CADET_DASHBOARD,
    Permission.VIEW_OWN_PORTFOLIO,
    Permission.UPDATE_OWN_PORTFOLIO,
  ],
  [UserRole.PARENT_GUARDIAN]: [
    Permission.VIEW_PARENT_DASHBOARD,
    Permission.VIEW_OWN_PORTFOLIO,
  ],
};

/**
 * Central access control function.
 * Checks if a user has the required permission and meets the scope requirements.
 */
export function hasPermission(
  user: User, 
  permission: Permission, 
  resourceScope?: { regionId?: string; squadronId?: string; cadetId?: string }
): boolean {
  if (!user || !user.role) return false;

  // 1. Check Role-based Permissions
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  if (!userPermissions.includes(permission)) {
    return false;
  }

  // 2. Check Data Scope (Task 3)
  if (resourceScope) {
    // Regional Scope Check
    if (resourceScope.regionId && user.assignedRegionId) {
      if (user.assignedRegionId !== resourceScope.regionId) return false;
    }

    // Squadron Scope Check
    if (resourceScope.squadronId && user.assignedSquadronId) {
      if (user.assignedSquadronId !== resourceScope.squadronId) return false;
    }

    // Cadet Scope Check (Ownership)
    if (resourceScope.cadetId && user.linkedCadetId) {
       // Parents and Cadets can only view their own linked cadet data
       if (user.linkedCadetId !== resourceScope.cadetId) return false;
    }
  }

  return true;
}

/**
 * Helper to hydrate a user object with their permissions upon login
 */
export function hydrateUserPermissions(user: User): User {
  return {
    ...user,
    permissions: ROLE_PERMISSIONS[user.role] || []
  };
}