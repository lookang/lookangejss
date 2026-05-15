
import { type Recipe } from './types';
import { GameIcon } from './components/icons/GameIcon';
import { ScienceIcon } from './components/icons/ScienceIcon';
import { ChartIcon } from './components/icons/ChartIcon';
import { MindMapIcon } from './components/icons/MindMapIcon';
import { CodeIcon } from './components/icons/CodeIcon';
import { ImageIcon } from './components/icons/ImageIcon';

export const RECIPES: Recipe[] = [
  {
    id: 'simple-game',
    title: 'Simple Game',
    description: 'Create a gamified learning experience with scoring and real-time analytics.',
    icon: GameIcon,
    promptTemplate: `Create a simple game for a gamified learning experience.

Topic: [Simple Fractional Equations]
Level: [Sec 1 Mathematics (G3)]

Instructions:
- Score should not go higher than 99 maximum marks.
- Add real-time data analytics of the chain of actions (corrects and wrongs) at every question to allow the teacher to see the misconception of the student.
- The analytics should show: the question, the correct answer, what the student chose, and a correct/wrong mark with clear unicode color coding.
`,
  },
  {
    id: 'simple-simulation',
    title: 'Simple Simulation',
    description: 'A physics simulation of light, objects, and shadows with draggable elements.',
    icon: ScienceIcon,
    promptTemplate: `Create a fully interactive and realistic simulation of light and shadows.

Elements:
- On the left, a point/beam light source emitting 2 straight light path lines that touch the top and bottom of the object.
- In the center, an opaque object (selectable via a dropdown: cube, sphere) casting a shadow.
- On the right, a screen for the shadow to be cast upon.

Interactivity:
- Allow dragging the light source, object, and screen along the x-axis only.
- The physics of straight-line light projection must be obeyed and updated in real-time during dragging.
- For a cube, light rays should emanate from the edges.
- For a sphere, calculate the tangent for the light path accurately.
- Include interactive controls: [Play, Pause, Reset] in a top control panel.

Focus on scientific accuracy appropriate for primary school students.
`,
  },
  {
    id: 'data-visualization',
    title: 'Data Visualisation',
    description: 'Generate interactive charts and graphs to explore datasets and reveal patterns.',
    icon: ChartIcon,
    promptTemplate: `Create an interactive data visualization.

Topic / Dataset: [Singapore Population Trends 1980-2020]
Target Audience: [Students aged 12 to 18]

Data to Display:
- Numerical: [Population Count]
- Categorical: [e.g., Age Group]
- Temporal: [Year]

Key Patterns to Highlight:
- [Growth trend over time]
- [Comparison between categories]

Visualization & Interaction:
- Chart Type: [Line Chart]
- Filtering: [Filter by Year Range (Slider)]
- Interaction: [Hover on data points for tooltips with detailed info, Click on legend items to toggle visibility]
`,
  },
  {
    id: 'mind-map',
    title: 'Mind Map',
    description: 'Design a mind map with a central idea, main branches, and draggable nodes.',
    icon: MindMapIcon,
    promptTemplate: `Create an interactive mind map.

Topic: [Speed and Velocity]
Audience: [Primary School Students]

Structure:
- Central idea: [Speed and Velocity]
- Main branches: [e.g., Definition, Formula, Units, Examples]
- Sub-branches: Supporting details for each main branch.
- Draw connection lines between related concepts.

Interactivity:
- Allow users to drag and reposition the bubbles (nodes).
- The layout should use the available width effectively.
`,
  },
  {
    id: 'explanation-interactive',
    title: 'Explanation Interactive',
    description: 'Create a step-by-step interactive explanation for a math or science problem.',
    icon: CodeIcon,
    promptTemplate: `Create an interactive with explaining steps for a math problem.

Problem: Express x/2 + x/6 as a single fraction in its simplest form.

Instructions:
- Break down the solution into clear, incremental steps.
- Each step should be revealed one by one with a "Next" button.
- Use clear visual displays for fractions and mathematical operations.
- Ensure visuals do not overlap and are easy to read.
`,
  },
  {
    id: 'image-to-interactive',
    title: 'Image to Interactive',
    description: 'Generate an interactive math manipulative from an image.',
    icon: ImageIcon,
    promptTemplate: `Based on the provided image, design a clear, interactive math manipulative that visually illustrates a key concept from the image.
- Make the explanation steps incremental to help students understand.
- Ensure the visual display does not overlap and cause issues with viewing it clearly.
- If the image content is insufficient to create a meaningful interactive, state that clearly in the output.
`,
  },
  {
    id: 'xapi-prototype',
    title: 'xAPI Prototype',
    description: 'Create an interactive with xAPI learning analytics for SLS integration.',
    icon: ChartIcon,
    promptTemplate: `Create an educational interactive with xAPI learning analytics integration.

Topic: [Mathematics - Fractions]
Level: [Primary 4]

Requirements:
- Create an interactive learning activity (quiz, simulation, or game)
- Record all student interactions using xAPI (clicks, answers, time spent)
- Track correct/incorrect responses for learning analytics
- Include feedback mechanisms for students
- Analytics should help teachers understand student thinking processes
- Must work with SLS (Singapore Learning Space) integration

The interactive should:
- Be engaging and educational
- Provide immediate feedback to students
- Record detailed learning analytics
- Help identify student misconceptions
- Support teacher review of student progress

Focus on creating meaningful learning experiences with comprehensive analytics.
`,
  },
];
