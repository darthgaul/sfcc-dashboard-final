import { User, UserRole } from '../types';

export function hydrateUserPermissions(user: User): User {
    // Placeholder logic to assign permissions based on role
    // In a real app, this might fetch from an API or look up a static map
    const permissions: string[] = [];

    // Basic mock permissions
    if (user.role === UserRole.EXECUTIVE_STAFF) {
        permissions.push('view:all', 'edit:all');
    } else {
        permissions.push('view:dashboard');
    }

    return {
        ...user,
        permissions
    };
}
