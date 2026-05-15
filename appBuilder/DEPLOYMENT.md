# Deployment Guide for Interactive Content Builder

## Built Files Location
The application has been successfully built and is ready for deployment. All files are located in the `dist/` folder:

```
dist/
├── index.html
└── assets/
    └── index-BC_Ncn37.js
```

## Deployment Instructions

### Target URL
The application is configured to be deployed at: `https://iwant2study.org/lookangejss/appbuilder/`

### Steps to Deploy

1. **Upload Files**: Copy all contents from the `dist/` folder to the web server directory:
   - Upload to: `/lookangejss/appbuilder/` on the iwant2study.org server
   - Ensure the folder structure is maintained

2. **File Structure on Server**:
   ```
   /lookangejss/appbuilder/
   ├── index.html
   └── assets/
       └── index-BC_Ncn37.js
   ```

3. **Access the Application**: 
   - URL: https://iwant2study.org/lookangejss/appbuilder/
   - The application will load the Interactive Content Builder interface

### Configuration Notes

- **Base Path**: The application is configured with base path `/lookangejss/appbuilder/`
- **API Key**: The application uses a placeholder API key. For production use, update the `GEMINI_API_KEY` environment variable
- **Dependencies**: All dependencies are loaded via CDN (esm.sh) so no additional server-side setup is required
- **Static Files**: The application is fully static and can be served by any web server

### Features
The deployed application includes:
- Interactive HTML5 content builder
- AI-powered content generation using Gemini API
- Multiple content types: games, simulations, charts, etc.
- Export functionality for generated content
- Responsive design with dark theme

### Testing
After deployment, verify the application loads correctly at the target URL and all features work as expected.
