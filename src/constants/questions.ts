import { Question } from '@/types';

export const QUESTIONS: Question[] = [
  {
    id: 'domain_knowledge',
    text: 'How would you rate your knowledge in your primary domain/field?',
    description: 'Rate your level of expertise in your primary field',
    category: 'expertise',
    options: [
      {
        value: 1,
        label: 'Beginner',
        description: 'I have basic knowledge in this field'
      },
      {
        value: 2,
        label: 'Novice',
        description: 'I have some experience but still learning'
      },
      {
        value: 3,
        label: 'Intermediate',
        description: 'I have practical experience in this field'
      },
      {
        value: 4,
        label: 'Advanced',
        description: 'I have significant experience and depth of knowledge'
      },
      {
        value: 5,
        label: 'Expert',
        description: 'I have deep expertise and can teach others'
      }
    ]
  },
  {
    id: 'ai_tool_usage',
    text: 'How frequently do you use AI tools in your work?',
    description: 'Rate how often you incorporate AI tools into your workflow',
    category: 'ai_adoption',
    options: [
      {
        value: 1,
        label: 'Never',
        description: 'I do not use AI tools in my work'
      },
      {
        value: 2,
        label: 'Rarely',
        description: 'I occasionally try AI tools but don\'t rely on them'
      },
      {
        value: 3,
        label: 'Sometimes',
        description: 'I use AI tools for specific tasks'
      },
      {
        value: 4,
        label: 'Frequently',
        description: 'I regularly use AI tools in my workflow'
      },
      {
        value: 5,
        label: 'Always',
        description: 'AI tools are integral to my work process'
      }
    ]
  },
  {
    id: 'ai_validation',
    text: 'How confident are you in identifying AI errors or hallucinations?',
    description: 'Rate your ability to spot when AI outputs are incorrect',
    category: 'expertise',
    options: [
      {
        value: 1,
        label: 'Not confident',
        description: 'I often can\'t tell if AI outputs are correct'
      },
      {
        value: 3,
        label: 'Somewhat confident',
        description: 'I can spot obvious errors but might miss subtle ones'
      },
      {
        value: 5,
        label: 'Very confident',
        description: 'I can reliably identify when AI outputs are incorrect'
      }
    ]
  },
  {
    id: 'ai_integration',
    text: 'How do you integrate AI tools into your workflow?',
    description: 'Describe how you incorporate AI into your work processes',
    category: 'ai_adoption',
    options: [
      {
        value: 1,
        label: 'Not at all',
        description: 'I don\'t use AI in my workflow'
      },
      {
        value: 2,
        label: 'Basic assistance',
        description: 'I use AI for simple tasks like generating ideas or fixing typos'
      },
      {
        value: 3,
        label: 'Task automation',
        description: 'I use AI to automate specific, well-defined tasks'
      },
      {
        value: 4,
        label: 'Workflow enhancement',
        description: 'AI is integrated throughout my workflow for various tasks'
      },
      {
        value: 5,
        label: 'Strategic partnership',
        description: 'I work collaboratively with AI to achieve complex goals'
      }
    ]
  }
];
