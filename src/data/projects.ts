// ─── Content Data: Projects ────────────────────────────────────────────────
// Edit this file to update project content without touching any components.
// TODO items are clearly marked — fill them in before publishing.

export interface Project {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  repoUrl?: string;   // TODO: add real GitHub URL when ready
  demoUrl?: string;   // TODO: add live URL when ready
  status: 'active' | 'in-progress' | 'prototype';
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'jarvis',
    name: 'JARVIS',
    tagline: 'Autonomous AI Computer & Software Engineering Platform',
    summary:
      'An intelligent AI system designed to assist with complex software engineering tasks, automation, and digital workflows — acting as a personal AI co-pilot.',
    problem:
      'Modern software development involves repetitive cognitive overhead: context switching, boilerplate, debugging cycles, and information retrieval that slows down creative work.',
    solution:
      'JARVIS provides an AI-first interface that understands context, automates repetitive tasks, and collaborates in real time with the developer to accelerate the engineering process.',
    stack: ['Python', 'AI Agents', 'LLMs', 'Automation', 'Natural Language Processing'],
    repoUrl: undefined,   // TODO
    demoUrl: undefined,   // TODO
    status: 'active',
    featured: true,
  },
  {
    id: 'novamart',
    name: 'NovaMart',
    tagline: 'Agentic AI Order Resolution System',
    summary:
      'An agentic AI platform built to autonomously resolve customer order issues, manage exceptions, and streamline e-commerce operations without human intervention.',
    problem:
      'High-volume e-commerce platforms face thousands of order anomalies daily — delays, mismatches, failed payments — that require repetitive manual resolution.',
    solution:
      'NovaMart deploys AI agents that classify, prioritize, and resolve order issues end-to-end, integrating with existing order management systems and escalating only true edge cases.',
    stack: ['Python', 'AI Agents', 'LLMs', 'API Integration', 'Automation'],
    repoUrl: undefined,   // TODO
    demoUrl: undefined,   // TODO
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'wifi-attendance',
    name: 'Wi-Fi Attendance',
    tagline: 'Automated Attendance Prototype Using Network Presence',
    summary:
      'A prototype attendance system that uses Wi-Fi network presence detection to automatically record student or employee attendance without manual check-ins.',
    problem:
      'Traditional attendance systems require manual sign-in, are prone to proxy fraud, and create administrative overhead for educators and administrators.',
    solution:
      'By detecting registered devices connecting to a local network, the system automatically marks attendance — reducing friction while maintaining a verifiable audit trail.',
    stack: ['Python', 'Networking', 'Raspberry Pi / Linux', 'SQLite'],
    repoUrl: undefined,   // TODO
    demoUrl: undefined,   // TODO
    status: 'prototype',
    featured: true,
  },
];

