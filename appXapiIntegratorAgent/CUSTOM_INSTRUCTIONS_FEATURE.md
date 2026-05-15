# ✨ Custom Instructions Feature for AI Agent Mode

## Overview

Added a new **Custom Instructions** input field that allows users to specify exactly what they want the AI Agent to do when generating xAPI tracking scripts. This provides maximum flexibility for specialized tracking requirements.

## What Changed

### 1. **Frontend UI** (`public/index.html`)
- Added a new fieldset with a textarea for custom instructions
- Positioned after the "Options" section
- Includes helpful examples and tips
- Clean, professional styling matching the rest of the UI

**Example instructions:**
- "Track scores with exponential weighting for later answers"
- "Generate xAPI statements for time spent on each section"
- "Track user confidence levels and attempt counts"
- "Create detailed learning path analysis statements"

### 2. **Client Logic** (`public/client.js`)
- Added `getCustomInstructions()` function to capture textarea value
- Updated `integrate()` function to:
  - Retrieve custom instructions from textarea
  - Log custom instructions to the interface
  - Send custom instructions to backend via FormData

### 3. **Backend Upload Handler** (`routes/upload.js`)
- Extract `customInstructions` from request body
- Log when custom instructions are provided
- Pass custom instructions to `generateAIAgentScript()` function

### 4. **Gemini AI Integration** (`lib/geminiAgent.js`)
- Updated `generateAIAgentScript()` function signature to accept `customInstructions` parameter
- Updated `buildAnalysisPrompt()` to accept and incorporate custom instructions
- Custom instructions are added to the AI prompt with high priority
- Example format in prompt tells AI: "IMPORTANT: Incorporate these custom instructions... They take priority..."

## How It Works

### User Workflow

1. **Upload ZIP file** - Same as before
2. **Select AI Agent Mode** - Same as before
3. **Enter Custom Instructions (Optional)**
   - User types specific requirements in the textarea
   - Examples: custom scoring, special tracking, analysis requirements
4. **Click Integrate**
   - System sends custom instructions to Gemini Pro
   - Gemini generates xAPI script incorporating user's requirements
   - Result is returned with the custom tracking logic

### Technical Flow

```
User Input (textarea)
    ↓
client.js (captures value)
    ↓
FormData (sends to server)
    ↓
upload.js (extracts from request)
    ↓
geminiAgent.js (adds to AI prompt)
    ↓
Gemini Pro (generates script with custom logic)
    ↓
Result (returned to user)
```

## Examples

### Example 1: Custom Scoring
**User Input:**
```
Track scores with exponential weighting where later answers count more. 
Include time bonuses for quick responses.
```

**AI Will Generate:**
- xAPI statements that apply weighted scoring
- Time-based bonus calculations
- Custom scoring algorithm in the tracking script

### Example 2: Section-Based Tracking
**User Input:**
```
Track time spent in each section separately. Create xAPI statements for 
section completion milestones.
```

**AI Will Generate:**
- Section entry/exit tracking
- Duration calculations per section
- Milestone completion statements
- Progress tracking

### Example 3: Confidence Levels
**User Input:**
```
Track user confidence by analyzing hesitation patterns. If user changes 
answer multiple times, mark as low confidence. First-time correct answers 
are high confidence.
```

**AI Will Generate:**
- Answer change detection logic
- Confidence level calculation
- Special xAPI extensions for confidence
- Pattern analysis in tracking

## Code Changes Summary

### Files Modified

| File | Changes |
|------|---------|
| `public/index.html` | Added custom instructions fieldset with textarea |
| `public/client.js` | Added instruction capture and form submission |
| `routes/upload.js` | Extract and pass custom instructions |
| `lib/geminiAgent.js` | Updated prompt to include custom instructions |

### Key Functions

**New:**
- `getCustomInstructions()` - Retrieves textarea value from UI

**Updated:**
- `generateAIAgentScript(contentAnalysis, customInstructions = '')` 
- `buildAnalysisPrompt(analysis, customInstructions = '')`
- Form submission in `integrate()` function
- Upload handler in `router.post('/'...)`

## Usage Tips

### ✅ What Works Well

- **Specific Requirements**: "Track only radio button selections, ignore text inputs"
- **Custom Calculations**: "Apply logarithmic scoring instead of linear"
- **Special Cases**: "If score > 80%, generate achievement badge statement"
- **Integration Needs**: "Include tracking for external API calls"
- **Analytics Requests**: "Create detailed interaction sequence analysis"

### ⚠️ Limitations

- Instructions are optional (if blank, AI uses default analysis)
- Very long instructions (1000+ words) may be truncated by API
- Instructions should be natural language (AI interprets them)
- Some complex algorithms may not be possible in JavaScript
- AI will do its best but may not implement impossible requests

### 💡 Best Practices

1. **Be Specific** - "Track score changes" vs "Track every score calculation step"
2. **Use Examples** - "Create statements like 'actor answered Q1 correctly'"
3. **Mention Triggers** - "When user clicks submit button, ..."
4. **State Goals** - "We need to identify mastery. High score = mastery"
5. **Consider Context** - Keep in mind content types the AI detects

## Testing the Feature

### Test Scenario 1: Basic Custom Instructions
1. Upload a simple quiz ZIP
2. Select AI Agent Mode
3. Enter: "Track only correct answers"
4. Integrate
5. Review generated script - should focus on correctness tracking

### Test Scenario 2: No Custom Instructions
1. Upload a ZIP
2. Select AI Agent Mode
3. Leave textarea empty
4. Integrate
5. System should work exactly as before (uses default analysis)

### Test Scenario 3: Complex Requirements
1. Upload interactive content
2. Select AI Agent Mode
3. Enter detailed custom instructions
4. Integrate
5. Review if AI incorporated your requirements

## Future Enhancements

Possible improvements:
- **Instruction Templates** - Predefined instruction templates users can select
- **Instruction History** - Save frequently used instructions
- **AI Suggestion** - AI suggests instructions based on content analysis
- **Instruction Validation** - Warn if instructions seem problematic
- **Instruction Preview** - Show how instructions will be used

## Performance Impact

- **Minimal** - Custom instructions are just text in the prompt
- No additional processing overhead
- AI response time unchanged
- Generated scripts same size/complexity

## Backward Compatibility

✅ **Fully Backward Compatible**
- Custom instructions are optional (defaults to empty string)
- Existing code continues to work
- Old uploads without instructions work fine
- No breaking changes to API or UI

---

## Summary

Users can now specify **exactly what they want the AI to track** by providing custom instructions. This makes the AI Agent mode much more powerful and flexible for specialized tracking requirements like:

- Custom scoring algorithms
- Section-based tracking
- Confidence level analysis
- Interaction pattern detection
- Business logic-specific requirements
- And much more!

The feature is simple to use (just type in a textarea) but powerful in what it enables.
