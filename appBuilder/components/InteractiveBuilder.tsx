
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RECIPES } from '../constants';
import { type Recipe, type ApiKeys } from '../types';
import RecipeCard from './RecipeCard';
import GeneratedContent from './GeneratedContent';
import { generateInteractive, type ModelOption } from '../services/geminiService';
import apiService from '../services/apiService';

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const InteractiveBuilder: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<{ html: string; readme: string } | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelOption>('claude');
  const [apiKeys, setApiKeys] = useState<ApiKeys>({ openAI: '', claude: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [username, setUsername] = useState('lookang');
  const [resourceURL, setResourceURL] = useState('https://sg.iwant2study.org/ospsg/');

  // State for refinement
  const [refinePrompt, setRefinePrompt] = useState('');
  const [refineImageFile, setRefineImageFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem('apiKeys');
      if (savedKeys) {
        const parsed = JSON.parse(savedKeys);
        setApiKeys({
          openAI: parsed.openAI || '',
          claude: parsed.claude || '',
        });
      }
    } catch (error) {
      console.error("Failed to load API keys from localStorage:", error);
    }
  }, []);

  const handleRecipeSelect = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setUserPrompt(recipe.promptTemplate);
    setGeneratedResult(null);
    setError(null);
    setImageFile(null);
    setRefinePrompt('');
    setRefineImageFile(null);
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
    }
  };
  
  const handleRefineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRefineImageFile(file);
    }
  };
  
  const processImageFile = async (file: File | null): Promise<{ base64: string | null; mimeType: string | null; }> => {
    if (!file) return { base64: null, mimeType: null };
    try {
      const dataUrl = await fileToDataUrl(file);
      const [header, data] = dataUrl.split(',');
      const mimeMatch = header.match(/:(.*?);/);
      if (!mimeMatch || !mimeMatch[1] || !data) {
        throw new Error('Invalid image file format.');
      }
      return { base64: data, mimeType: mimeMatch[1] };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to process image: ${message}`);
      throw err; // Propagate error to stop the generation process
    }
  };

  const runGenerationProcess = async (
    isRefinement: boolean,
    refinementHtml: string | null = null
  ) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    
    const messages = isRefinement
      ? [ 'Analyzing refinement request...', 'Applying your changes...', 'Re-generating interactive code...', 'Updating README documentation...', 'Finalizing new version...']
      : [ 'Connecting to AI model...', 'Analyzing your request...', 'Designing the interactive layout...', 'Generating HTML structure...', 'Writing pedagogical README file...', 'Styling with CSS...', 'Adding JavaScript for interactivity...', 'Finalizing and packaging the interactive...', 'Almost there...'];
    
    let messageIndex = 0;
    setStatusMessage(messages[messageIndex]);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.floor(Math.random() * 5) + 1, 95));
    }, 400);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1);
      if (messageIndex < messages.length) {
        setStatusMessage(messages[messageIndex]);
      }
    }, 2000);

    try {
      const { base64: imageBase64, mimeType: imageMimeType } = await processImageFile(imageFile);
      const { base64: refineImageBase64, mimeType: refineImageMimeType } = await processImageFile(refineImageFile);

      const result = await generateInteractive(
        selectedRecipe!,
        userPrompt,
        selectedModel,
        imageBase64,
        imageMimeType,
        username,
        resourceURL,
        refinementHtml,
        isRefinement ? refinePrompt : null,
        refineImageBase64,
        refineImageMimeType
      );

      setGeneratedResult(result);
      // Clear refinement inputs after successful refinement
      if (isRefinement) {
        setRefinePrompt('');
        setRefineImageFile(null);
      }
    } catch (e: unknown) {
      if (e instanceof Error && !e.message.includes('process image')) {
        setError(e.message);
      } else if (!(e instanceof Error)) {
        setError('An unknown error occurred.');
      }
    } finally {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      setProgress(100);
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedRecipe || !userPrompt) {
      setError('Please select a recipe and provide a prompt.');
      return;
    }
    if (selectedModel !== 'gemini' && isKeyMissing) {
      setError('API key for the selected model is missing. Please add it in Settings.');
      return;
    }
    if (selectedRecipe.id === 'image-to-interactive' && !imageFile) {
      setError('Please upload an image for this interactive type.');
      return;
    }
    
    setGeneratedResult(null); // Clear previous results before new generation
    await runGenerationProcess(false);
  };

  const handleRefine = async () => {
    if (!refinePrompt && !refineImageFile) {
      setError('Please provide instructions or an image to refine the interactive.');
      return;
    }
    if (generatedResult?.html) {
      await runGenerationProcess(true, generatedResult.html);
    }
  };

  const isKeyMissing = false; // Backend proxy handles all API keys

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full">
      {/* Left Column: Controls */}
      <div className="flex flex-col gap-4 lg:gap-6 overflow-y-auto max-h-screen lg:max-h-none">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-200">1. Choose an Interactive Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {RECIPES.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSelected={selectedRecipe?.id === recipe.id}
                onSelect={handleRecipeSelect}
              />
            ))}
          </div>
        </div>

        {selectedRecipe && (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-200">2. Describe Your Interactive</h2>
              <textarea
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-shadow resize-none"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Provide detailed instructions here..."
                rows={8}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-200">2a. Upload an Image (Optional)</h2>
              {imageFile ? (
                <div className="p-3 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-between">
                  <span className="text-gray-200 truncate pr-2">{imageFile.name}</span>
                  <button
                    onClick={() => setImageFile(null)}
                    className="text-gray-400 hover:text-white font-bold text-lg flex-shrink-0"
                    aria-label="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
                    <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-gray-200">Click to upload</span>
                    <span className="text-sm text-gray-400">PNG or JPG</span>
                  </label>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-200">3. Choose a Generation Model</h2>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value as ModelOption)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                >
                    <option value="claude">🥇 Anthropic Claude 3.5 Sonnet (Most Capable)</option>
                    <option value="claude4">🏆 Anthropic Claude 3.5 Sonnet (Premium)</option>
                    <option value="claude-opus">🏅 Anthropic Claude Opus 4.1 (Ultra Premium)</option>
                    <option value="openai">🥈 OpenAI GPT-4o (Latest)</option>
                    <option value="gemini">🥉 Google Gemini 2.5 Flash (Fast)</option>
                </select>
                {isKeyMissing && selectedModel !== 'gemini' && (
                    <div className="text-sm text-red-400 p-3 bg-red-900/50 border border-red-700 rounded-md">
                        API key for the selected model is missing. Please{' '}
                        <Link to="/settings" className="font-bold underline hover:text-red-300">
                            add it in Settings
                        </Link>
                        .
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-200">4. Customize Footer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="e.g., lookang"
                  />
                </div>
                <div>
                  <label htmlFor="resourceURL" className="block text-sm font-medium text-gray-400 mb-1">Resource URL</label>
                  <input
                    type="url"
                    id="resourceURL"
                    value={resourceURL}
                    onChange={(e) => setResourceURL(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="https://your-resource-url.com"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || isKeyMissing}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Interactive'
              )}
            </button>

            {generatedResult && !isLoading && (
              <div className="flex flex-col gap-6 pt-6 border-t-2 border-gray-700">
                <h2 className="text-xl font-semibold text-gray-200">5. Refine Your Interactive</h2>
                <div className="flex flex-col gap-3">
                  <textarea
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none transition-shadow resize-none"
                    value={refinePrompt}
                    onChange={(e) => setRefinePrompt(e.target.value)}
                    placeholder="e.g., Change the color of the cube to blue. Add a slider to control the light intensity."
                    rows={4}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-gray-300">Upload new image (optional)</h3>
                  {refineImageFile ? (
                     <div className="p-3 bg-gray-700 border border-gray-600 rounded-md flex items-center justify-between">
                       <span className="text-gray-200 truncate pr-2">{refineImageFile.name}</span>
                       <button onClick={() => setRefineImageFile(null)} className="text-gray-400 hover:text-white font-bold text-lg">&times;</button>
                     </div>
                  ) : (
                    <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                      <input type="file" accept="image/png, image/jpeg" onChange={handleRefineFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="refine-image-upload" />
                      <label htmlFor="refine-image-upload" className="cursor-pointer text-sm text-gray-400">
                        Click to upload an image for refinement
                      </label>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleRefine}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? 'Refining...' : 'Refine Interactive'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Column: Generated Content */}
      <div className="min-h-[400px] lg:min-h-0 lg:flex-grow bg-gray-800 rounded-md overflow-hidden relative border-2 border-gray-700">
        {error && (
          <div className="absolute inset-0 bg-red-900/50 text-red-200 flex flex-col items-center justify-center p-8 z-10">
            <h3 className="font-bold text-lg mb-2">Operation Failed</h3>
            <p className="text-center">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        )}
        <GeneratedContent
          htmlContent={generatedResult?.html ?? null}
          readmeContent={generatedResult?.readme ?? null}
          isLoading={isLoading}
          isSelected={!!selectedRecipe}
          progress={progress}
          statusMessage={statusMessage}
          recipeTitle={selectedRecipe?.title}
          selectedModel={selectedModel}
        />
      </div>
    </div>
  );
};

export default InteractiveBuilder;
