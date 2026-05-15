# Cline Interactive Application Template

## Instructions for Cline
When building interactive educational applications, always include these standard elements:

### 1. Google Analytics Tracking
Add this to the `<head>` section of all HTML files:

```html
<!-- Google Analytics -->
<script async="true" src="https://www.googletagmanager.com/gtag/js?id=G-S9EWRY1CPJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-S9EWRY1CPJ');
</script>
```

### 2. Standard Footer
Include this footer with appropriate CSS styling:

```html
<div id="footer">
    <div>Made by <strong>lookang</strong>, using <strong>Claude 4</strong></div>
    <div>More resources: <a href="https://sg.iwant2study.org/ospsg/index.php/interactive-resources/mathematics/measurement-and-geometry/geometry/2-3d-shapes" target="_blank">Educational Resources</a></div>
</div>
```

### 3. Footer CSS Styling
Add this CSS for the footer:

```css
#footer {
    position: absolute;
    bottom: 80px;
    left: 20px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 12px;
    color: #666;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 150;
}
#footer a {
    color: #3498db;
    text-decoration: none;
}
#footer a:hover {
    text-decoration: underline;
}
```

### 4. Educational Design Principles
When building educational applications, focus on:

- **Interactive 3D visualization** when applicable
- **Gamification elements** (scoring, levels, progress bars)
- **Immediate feedback** with explanations
- **Hint systems** for scaffolded learning
- **Real-world connections** to make concepts tangible
- **Multiple challenge types** to promote critical thinking
- **Responsive design** for all devices
- **Simple, clean architecture** for easy maintenance

### 5. Technical Standards
- Use modern web technologies (ES6 modules, CSS3, vanilla JavaScript)
- Keep dependencies minimal
- Prioritize single-file architecture when possible
- Include comprehensive README.md documentation
- Ensure cross-browser compatibility
- Implement proper error handling

### 6. Documentation Requirements
Always create a README.md that includes:
- Educational value and learning objectives
- Technical architecture explanation
- Getting started instructions
- Feature descriptions
- Future enhancement possibilities

## Usage Instructions for lookang:
1. Save this file as `cline-template.md` in your project directory
2. In future Cline conversations, reference this template by saying:
   "Please follow the standards in cline-template.md"
3. Cline will read this file and apply all the standard elements automatically

## Example Reference Command:
"Create an interactive physics simulation following the template in cline-template.md"
