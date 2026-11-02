const fs = require('fs');
const path = require('path');

const baseLogDir = 'c:\\Users\\sujal\\.gemini\\antigravity\\brain';
const convIds = [
  '247a9845-77fe-4c46-b041-6dde285562d1', // main conversation
  'd06e971a-9eb0-446d-8005-daf2eeb61949',
  '74566cb5-5c46-451f-81eb-ef9d7adc82e3',
  '12c7954b-145f-4e32-ae51-c92a8b2ca740',
  'c396418b-7ebe-4b70-9a76-215771ed2e87'
];

for (const id of convIds) {
  const logPath = path.join(baseLogDir, id, '.system_generated/logs/transcript.jsonl');
  if (!fs.existsSync(logPath)) continue;

  const lines = fs.readFileSync(logPath, 'utf8').split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === 'VIEW_FILE' && step.status === 'DONE') {
        const output = step.content; // The output string from view_file
        
        // Parse the File Path
        const matchPath = output.match(/File Path: `file:\/\/\/(.+?)`/);
        if (!matchPath) continue;
        
        let filePath = matchPath[1];
        // Handle Windows path drive letter casing
        filePath = filePath.replace(/^[a-zA-Z]:/, match => match.toLowerCase());
        filePath = filePath.replace(/\//g, '\\');
        
        // Ensure it's inside the workspace and is page.tsx
        if (!filePath.includes('scratch\\intern\\src\\app\\page.tsx')) continue;
        
        // Extract content between "The following code has been modified..." and "The above content shows..."
        const startMarker = 'The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.\n';
        const endMarker = '\nThe above content shows the entire, complete file contents of the requested file.';
        
        let contentIndex = output.indexOf(startMarker);
        let endIndex = output.indexOf(endMarker);
        
        if (contentIndex !== -1 && endIndex !== -1) {
          contentIndex += startMarker.length;
          let numberedContent = output.substring(contentIndex, endIndex);
          
          // Remove line numbers (e.g. "1: " or "10: ")
          let originalContent = numberedContent.split('\n').map(l => l.replace(/^\d+:\s?/, '')).join('\n');
          
          fs.writeFileSync(filePath, originalContent, 'utf8');
          console.log(`Restored: ${filePath}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
