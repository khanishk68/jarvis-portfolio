// ─── Content Data: Skills ──────────────────────────────────────────────────
// All percentages are self-assessed proficiency estimates.
// TODO: Review and confirm every value before publishing.

export interface Skill {
  name: string;
  level: number; // 0–100, self-assessed
  icon?: string; // emoji fallback
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    icon: '⌨️',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 72 },
      { name: 'C / C++', level: 60 },
      { name: 'Bash / Shell', level: 65 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: '🤖',
    skills: [
      { name: 'AI Agents', level: 80 },
      { name: 'LLM Integration', level: 78 },
      { name: 'NLP', level: 70 },
      { name: 'Machine Learning', level: 68 },
      { name: 'Prompt Engineering', level: 85 },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: '🌐',
    skills: [
      { name: 'React', level: 78 },
      { name: 'HTML & CSS', level: 85 },
      { name: 'Vite', level: 72 },
      { name: 'Tailwind CSS', level: 75 },
      { name: 'Framer Motion', level: 65 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Databases',
    icon: '🗄️',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'MongoDB', level: 68 },
      { name: 'SQL', level: 65 },
      { name: 'REST APIs', level: 75 },
      { name: 'FastAPI', level: 65 },
    ],
  },
  {
    id: 'tools',
    label: 'Development Tools',
    icon: '🔧',
    skills: [
      { name: 'Git & GitHub', level: 80 },
      { name: 'Docker', level: 60 },
      { name: 'Linux', level: 70 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 75 },
    ],
  },
  {
    id: 'creative',
    label: 'Creative & Media',
    icon: '🎬',
    skills: [
      { name: 'Video Editing', level: 78 },
      { name: 'UI Design', level: 70 },
      { name: 'Motion Graphics', level: 62 },
      { name: 'Figma', level: 65 },
      { name: 'Photography', level: 60 },
    ],
  },
];

