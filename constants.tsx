
import { StaffMember, EventCard, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Curriculum', href: '#curriculum' },
  { name: 'Internships', href: '#internships' },
  { name: 'Staff', href: '#staff' },
];

export interface Course {
  id: string;
  category: string;
  categoryIcon: string;
  level: number;
  title: string;
  description: string;
  startDate: string; // ISO date string
  status: 'active' | 'future';
  tags: string[];
  syllabus: string[];
  enrollmentLink: string;
  isDisabled?: boolean;
}

const SHARED_ENROLL_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdW30J1abT_yGZrvLGpIvX_DDsBoNCdXvQy4GEql_z4QQnooQ/viewform";

export const COURSES: Course[] = [
  {
    id: 'p1',
    category: 'Python',
    categoryIcon: 'terminal',
    level: 1,
    title: 'Python Fundamentals',
    description: 'Master the basics of Python programming. Perfect for complete beginners with no prior coding experience.',
    startDate: '2026-02-15T09:00:00Z',
    status: 'active',
    tags: ['Variables', 'Data Types', 'Control Flow', 'Functions', 'Loops', 'Problem Solving'],
    syllabus: [
      'Variables & Data Types',
      'Control Flow (if/else, loops)',
      'Functions & Parameters',
      'Lists & Dictionaries',
      'Basic File I/O',
      'Introduction to Problem Solving'
    ],
    enrollmentLink: SHARED_ENROLL_LINK
  },
  {
    id: 'p-adv-ml',
    category: 'Advanced Python',
    categoryIcon: 'psychology',
    level: 2,
    title: 'Advanced Python & Machine Learning',
    description: 'Dive deeper into Python with object-oriented programming, APIs, and real-world projects.',
    startDate: '2026-02-25T09:00:00Z',
    status: 'active',
    tags: ['Object-Oriented Programming', 'Data Processing with Pandas', 'Introduction to Machine Learning', 'API Development', 'Neural Networks'],
    syllabus: [
      'OOP in Python',
      'Pandas for Data Processing',
      'Scikit-Learn Basics',
      'Linear Regression',
      'Building REST APIs'
    ],
    enrollmentLink: SHARED_ENROLL_LINK
  },
  {
    id: 'ai-ds',
    category: 'AI & Data Science',
    categoryIcon: 'analytics',
    level: 3,
    title: 'Python for Data Science & AI (Industry-Level Coding)',
    description: 'Learn to analyze and visualize data using Python libraries like NumPy, Pandas, and Matplotlib.',
    startDate: '2026-04-05T09:00:00Z',
    status: 'active',
    isDisabled: true,
    tags: ['Data Analysis with NumPy & Pandas', 'Data Visualization with Matplotlib & Seaborn', 'Statistical Analysis', 'TensorFlow basics', 'Keras'],
    syllabus: [
      'NumPy & Array Operations',
      'Pandas DataFrames',
      'Matplotlib & Seaborn Visualization',
      'Statistical Methods',
      'Intro to Scikit-Learn'
    ],
    enrollmentLink: SHARED_ENROLL_LINK
  },
  {
    id: 'w1',
    category: 'Web Development',
    categoryIcon: 'public',
    level: 1,
    title: 'Web Dev Basics',
    description: 'Learn HTML, CSS, and JavaScript fundamentals to create beautiful, interactive websites from scratch.',
    startDate: '2026-02-11T09:00:00Z',
    status: 'active',
    tags: ['HTML Structure', 'CSS Styling', 'Flexbox & Grid', 'JS Basics', 'DOM Manipulation'],
    syllabus: [
      'HTML Structure & Semantics',
      'CSS Styling & Layouts',
      'Flexbox & Grid',
      'JavaScript Basics',
      'DOM Manipulation',
      'Responsive Design'
    ],
    enrollmentLink: SHARED_ENROLL_LINK
  },
  {
    id: 'w2',
    category: 'Web Development',
    categoryIcon: 'public',
    level: 2,
    title: 'Web Dev Advanced',
    description: 'Master React, work with databases, and build complete web applications ready for deployment.',
    startDate: '2026-04-12T08:00:00Z',
    status: 'future',
    isDisabled: true,
    tags: ['React Fundamentals', 'PostgreSQL', 'API Integration', 'Auth Systems', 'Deployment'],
    syllabus: [
      'React Components & Hooks',
      'State Management',
      'SQL Databases & Querying',
      'API Integration',
      'Deployment & CI/CD'
    ],
    enrollmentLink: SHARED_ENROLL_LINK
  }
];

export const STAFF: StaffMember[] = [
  {
    name: 'Sathvik Darbha',
    role: 'Co-Founder & Co-President',
    image: ''
  },
  {
    name: 'Sidhaanth Kapoor',
    role: 'Co-Founder & Co-President',
    image: ''
  },
  {
    name: 'Arnav Jha',
    role: 'Co-Founder & Co-President',
    image: ''
  },
  {
    name: 'Sreejith Sreekumar',
    role: 'Vice President & Marketing Management',
    image: ''
  }
];
