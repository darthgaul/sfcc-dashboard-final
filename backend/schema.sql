-- SFCC Command Suite V2.5 - PostgreSQL Schema
-- Compliant with CCT 20-4T Neutral Portfolio Architecture

-- 1. USERS (13 RBAC Roles)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL CHECK (user_role IN (
        'board_of_directors', 'external_auditor', 'executive_staff',
        'cfo_treasurer', 'support_staff_data_manager', 'regional_commander',
        'squadron_commander', 'reviewer_instructor', 'cadet_member',
        'parent_guardian', 'external_fiscal_sponsor'
    )),
    sfa_fiscal_access BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. AUDIT_LOG (Non-Repudiation)
CREATE TABLE audit_log (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    action_type VARCHAR(50) NOT NULL,
    target_table VARCHAR(50),
    target_id INTEGER,
    details JSONB,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT NOW()
);

-- 3. ARTIFACTS (Evidence/Portfolio - CCT 20-4T)
CREATE TABLE artifacts (
    artifact_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    mission_id VARCHAR(100),
    loe VARCHAR(1) CHECK (loe IN ('A', 'B', 'C', 'D', 'E', 'F', 'G')),
    rubric_score INTEGER CHECK (rubric_score BETWEEN 0 AND 4),
    board_ready BOOLEAN DEFAULT FALSE,
    opsec_check_status VARCHAR(20) DEFAULT 'PENDING' CHECK (opsec_check_status IN ('PENDING', 'PASSED', 'FAILED')),
    opsec_attested_by INTEGER REFERENCES users(user_id),
    ai_disclosure_included BOOLEAN NOT NULL,
    safety_checklist_attached BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. WORKFLOW_GATES (AWE Enforcement)
CREATE TABLE workflow_gates (
    gate_id SERIAL PRIMARY KEY,
    artifact_id INTEGER REFERENCES artifacts(artifact_id) NOT NULL,
    gate_type VARCHAR(30) NOT NULL CHECK (gate_type IN (
        'OPSEC_CHECK', 'SAFETY_GATE', 'AI_DISCLOSURE', 'AAR_REQUIRED', 'RECOVERY_WAIVER'
    )),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PASSED', 'FAILED', 'WAIVED')),
    enforced_by_awe BOOLEAN DEFAULT TRUE,
    waiver_memo_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. WAIVERS (Quarterly Board Packet - CCT 20-10T)
CREATE TABLE waivers (
    waiver_id SERIAL PRIMARY KEY,
    reason TEXT NOT NULL,
    approver_id INTEGER REFERENCES users(user_id),
    approved_date TIMESTAMP,
    related_mission_ids TEXT[],
    attachment_urls TEXT[],
    included_in_board_packet BOOLEAN DEFAULT FALSE
);

-- 6. REMEDIATIONS (Deficiency Tracking)
CREATE TABLE remediations (
    remediation_id SERIAL PRIMARY KEY,
    artifact_id INTEGER REFERENCES artifacts(artifact_id),
    cadet_id INTEGER REFERENCES users(user_id) NOT NULL,
    assigned_by INTEGER REFERENCES users(user_id),
    deadline DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ASSIGNED' CHECK (status IN ('ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE')),
    closed_date DATE,
    closure_verified_by INTEGER REFERENCES users(user_id)
);

-- 7. AFTER_ACTION_REVIEWS (AAR - What/So-What/Now-What)
CREATE TABLE after_action_reviews (
    aar_id SERIAL PRIMARY KEY,
    artifact_id INTEGER REFERENCES artifacts(artifact_id) NOT NULL,
    what_section TEXT NOT NULL,
    so_what_section TEXT NOT NULL,
    now_what_section TEXT NOT NULL,
    link_verified BOOLEAN DEFAULT FALSE,
    submitted_date TIMESTAMP DEFAULT NOW()
);

-- 8. PAYMENTS (DTM 25-02 Compliance)
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    requestor_id INTEGER REFERENCES users(user_id),
    treasurer_approved BOOLEAN DEFAULT FALSE,
    treasurer_approved_date TIMESTAMP,
    ceo_approved BOOLEAN DEFAULT FALSE,
    ceo_approved_date TIMESTAMP,
    sfa_handoff_generated BOOLEAN DEFAULT FALSE,
    receipt_url TEXT
);

-- 9. CONSENT_FORMS (CCF 20-5 Youth Protection)
CREATE TABLE consent_forms (
    consent_id SERIAL PRIMARY KEY,
    cadet_id INTEGER REFERENCES users(user_id) NOT NULL,
    parent_id INTEGER REFERENCES users(user_id) NOT NULL,
    allergies TEXT,
    medications TEXT,
    pre_existing_conditions TEXT,
    emergency_contact_1_name VARCHAR(100) NOT NULL,
    emergency_contact_1_phone VARCHAR(20) NOT NULL,
    emergency_contact_2_name VARCHAR(100),
    emergency_contact_2_phone VARCHAR(20),
    media_opt_in BOOLEAN NOT NULL,
    image_release_consent BOOLEAN,
    ip_release_consent BOOLEAN,
    consent_timestamp TIMESTAMP,
    form_version VARCHAR(10) DEFAULT '1.0'
);

-- INDEXES
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_artifacts_user ON artifacts(user_id);
CREATE INDEX idx_artifacts_mission ON artifacts(mission_id);
CREATE INDEX idx_gates_artifact ON workflow_gates(artifact_id);
CREATE INDEX idx_remediations_cadet ON remediations(cadet_id);
CREATE INDEX idx_consent_cadet ON consent_forms(cadet_id);