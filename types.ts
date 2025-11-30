import React from 'react';

export enum ViewRole {
  HQ = 'HQ View',
  REGIONAL = 'Regional View',
  SQUADRON = 'Squadron View',
  CADET = 'Cadet View',
  PARENT = 'Parent View',
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: ViewRole;
  accessLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5'; // Security clearance levels
  allowedViews: ViewRole[];
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