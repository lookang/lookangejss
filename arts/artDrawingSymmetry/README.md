# Interactive Kaleidoscope Drawing Application

This is an interactive web application that allows users to create beautiful symmetrical drawings similar to a kaleidoscope. The application uses p5.js to create a canvas where users can draw, and the drawings are automatically mirrored across multiple axes to create symmetrical patterns.

## Features

- **Adjustable Symmetry**: Control the number of symmetry axes (1-20) to create different kaleidoscopic effects
- **Rotation Control**: Rotate the orientation of the symmetry axes to change the pattern direction
- **Line Thickness**: Adjust the thickness of the drawing lines
- **Automatic Color Cycling**: The drawing color automatically cycles through the color spectrum as you draw
- **Clear Canvas**: Reset the canvas with a single click
- **Responsive Design**: Works on various screen sizes

## Installation

This is a client-side web application that doesn't require server-side installation. To run it locally:

1. Clone this repository or download the source code
2. Make sure the required libraries are in the `libs` folder:
   - p5.js
   - tailwind.js
3. Open `index.html` in a web browser

## Usage

1. **Drawing**: Click and drag on the canvas to draw
2. **Adjust Symmetry**: Use the "Symmetry Axes" slider to change the number of reflective sections (1-20)
3. **Rotate Axes**: Use the "Axes Rotation" slider to change the orientation of the symmetry axes (0-360°)
4. **Change Line Thickness**: Adjust the "Line Thickness" slider to make lines thinner or thicker
5. **Clear Canvas**: Click the "Clear Canvas" button to start over

## How It Works

The application uses mathematical principles to create symmetrical patterns:

- When symmetry is set to 1, it creates a simple mirror reflection
- With higher symmetry values, the drawing is repeated around a central point at equal angles
- The rotation control adjusts the starting angle of the symmetry axes
- Color values automatically cycle through the HSB color space as you draw

## Technologies Used

- **p5.js**: A JavaScript library for creative coding and interactive graphics
- **Tailwind CSS**: A utility-first CSS framework for styling the interface

## Educational Purpose

This application was created as an educational tool to demonstrate principles of symmetry, geometry, and interactive graphics programming. It's suitable for students learning about digital art, mathematics, or programming concepts.

## Acknowledgments

- Created with assistance from Gemini 2.5 Pro
- More educational resources available at [iwant2study.org Arts](https://sg.iwant2study.org/ospsg/index.php/interactive-resources/arts)