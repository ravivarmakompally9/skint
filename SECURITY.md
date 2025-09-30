# 🔒 Role-Based Security System

## Overview
This document outlines the comprehensive role-based access control (RBAC) system implemented in the Skint application to ensure proper segregation of user roles and secure access to different dashboards.

## 🎯 Role Hierarchy

### 1. **Student** (Security Level: 1)
- **Access**: Student dashboard, profile, applications, recommendations
- **Permissions**: View own data, apply to jobs, track applications
- **Email Domain**: Must use `.edu` or university domain
- **Auto-Verification**: Yes (immediate access)

### 2. **Faculty** (Security Level: 2)
- **Access**: Faculty dashboard, student management, approvals, analytics
- **Permissions**: View assigned students, approve requests, provide feedback
- **Email Domain**: Must use `.edu` or university domain
- **Auto-Verification**: Yes (immediate access)

### 3. **Recruiter** (Security Level: 2)
- **Access**: Recruiter dashboard, job posting, candidate management
- **Permissions**: Post jobs, view candidates, schedule interviews
- **Email Domain**: Must use company email (NOT `.edu`)
- **Verification**: Required (admin approval needed)

### 4. **Placement Cell** (Security Level: 3)
- **Access**: Placement dashboard, recruiter management, analytics, reports
- **Permissions**: Manage recruiters, approve jobs, view all data, generate reports
- **Email Domain**: Must use `.edu` or university domain
- **Verification**: Required (admin approval needed)

### 5. **Admin** (Security Level: 4)
- **Access**: Admin dashboard, user management, system settings
- **Permissions**: Manage all users, system settings, audit logs, role management
- **Email Domain**: Must use `.edu` or university domain
- **Verification**: Required (super admin approval needed)

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication with role information
- **Token Expiry**: Short-lived tokens (1-24 hours) with refresh mechanism
- **Role Validation**: Every API call validates user role and permissions
- **Route Protection**: Frontend routes protected by role guards

### Email Domain Validation
```typescript
// Students & Faculty: Must use .edu domains
validateEmailDomain('student@university.edu', 'student') // ✅ Valid
validateEmailDomain('faculty@college.edu', 'faculty') // ✅ Valid

// Recruiters: Must use company emails (NOT .edu)
validateEmailDomain('recruiter@company.com', 'recruiter') // ✅ Valid
validateEmailDomain('recruiter@university.edu', 'recruiter') // ❌ Invalid

// Placement & Admin: Must use .edu domains
validateEmailDomain('placement@university.edu', 'placement') // ✅ Valid
```

### Role-Based Route Protection
```typescript
// Each dashboard is protected by role guards
<RoleGuard requiredRole="student">
  <StudentDashboard />
</RoleGuard>

<RoleGuard requiredRole="recruiter">
  <RecruiterDashboard />
</RoleGuard>
```

### Permission System
```typescript
const ROLE_PERMISSIONS = {
  student: ['view_own_profile', 'edit_own_profile', 'apply_jobs'],
  faculty: ['view_students', 'approve_requests', 'provide_feedback'],
  recruiter: ['post_jobs', 'view_candidates', 'schedule_interviews'],
  placement: ['manage_recruiters', 'approve_jobs', 'view_all_data'],
  admin: ['manage_all_users', 'system_settings', 'audit_logs']
}
```

## 🛡️ Security Measures

### 1. **Multi-Factor Authentication (MFA)**
- Required for high-privilege roles (Placement, Admin)
- SMS or email verification for sensitive operations
- Time-based one-time passwords (TOTP)

### 2. **Rate Limiting**
- API rate limiting to prevent brute force attacks
- Progressive delays for failed login attempts
- IP-based blocking for suspicious activity

### 3. **Audit Logging**
- All login attempts logged with IP and timestamp
- Role changes and permission modifications tracked
- Suspicious activity alerts and notifications

### 4. **Session Management**
- Secure session tokens with expiration
- Automatic logout on inactivity
- Concurrent session limits per user

### 5. **Data Encryption**
- Sensitive data encrypted at rest
- HTTPS for all communications
- JWT tokens signed with secure keys

## 🚫 Access Control Examples

### Student Trying to Access Recruiter Dashboard
```typescript
// User: student@university.edu, Role: student
// Attempting to access: /dashboard/recruiter

// Result: 403 Forbidden
{
  "error": "Access denied",
  "message": "This endpoint requires recruiter role",
  "userRole": "student"
}
```

### Unverified Recruiter Access
```typescript
// User: recruiter@company.com, Role: recruiter, Verified: false
// Attempting to access: /dashboard/recruiter

// Result: 403 Forbidden
{
  "error": "Account not verified",
  "message": "Your account is pending verification by admin"
}
```

### Invalid Email Domain
```typescript
// User: recruiter@university.edu, Role: recruiter
// During registration

// Result: Registration failed
{
  "success": false,
  "message": "Invalid email domain for recruiter role. Please use appropriate email."
}
```

## 🔄 Role Verification Process

### For Recruiters
1. **Registration**: User registers with company email
2. **Pending Status**: Account marked as unverified
3. **Admin Review**: Placement cell reviews application
4. **Verification**: Admin approves/rejects account
5. **Access Granted**: User can access recruiter dashboard

### For Placement Cell
1. **Registration**: User registers with university email
2. **Admin Review**: Super admin reviews application
3. **Verification**: Super admin approves account
4. **Access Granted**: User can access placement dashboard

## 📊 Security Monitoring

### Real-time Alerts
- Failed login attempts from multiple IPs
- Unusual access patterns
- Role escalation attempts
- Data access violations

### Audit Trail
- User login/logout events
- Role changes and permissions
- Data access and modifications
- Security policy violations

## 🛠️ Implementation

### Frontend Protection
```typescript
// Role-based component rendering
<RoleBasedRender allowedRoles={['faculty', 'placement']}>
  <StudentManagementPanel />
</RoleBasedRender>

// Route protection
const { canAccessRoute } = useRoleAccess()
if (!canAccessRoute('/dashboard/recruiter')) {
  redirect('/unauthorized')
}
```

### Backend Protection
```typescript
// API route protection
export async function GET(request: NextRequest) {
  const roleCheck = createRoleMiddleware('recruiter')(request)
  if (roleCheck) return roleCheck
  
  // Proceed with authorized access
}
```

### Database Level
```typescript
// User schema with role validation
interface User {
  id: string
  email: string
  role: UserRole
  verified: boolean
  securityLevel: number
  permissions: string[]
  lastLogin: Date
  createdAt: Date
}
```

## 🚨 Security Best Practices

1. **Never trust client-side role checks** - Always validate on server
2. **Use HTTPS everywhere** - Encrypt all communications
3. **Implement proper session management** - Secure token handling
4. **Regular security audits** - Monitor and review access logs
5. **Keep dependencies updated** - Patch security vulnerabilities
6. **Implement proper error handling** - Don't leak sensitive information
7. **Use environment variables** - Secure configuration management

## 🔍 Testing Security

### Role Segregation Tests
- ✅ Student cannot access recruiter dashboard
- ✅ Recruiter cannot access placement dashboard
- ✅ Unverified users cannot access protected routes
- ✅ Invalid email domains are rejected

### Security Tests
- ✅ JWT tokens are properly validated
- ✅ Rate limiting prevents brute force attacks
- ✅ Audit logs capture all security events
- ✅ Session management works correctly

This comprehensive security system ensures that each user can only access their designated dashboard and features, maintaining strict role segregation and preventing unauthorized access to sensitive information.
