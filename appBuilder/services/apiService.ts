interface APIResponse {
  content: string;
  error?: string;
}

class APIService {
  private baseURL: string;

  constructor() {
    // Use current origin for proxy endpoints when running with backend
    // Fall back to direct API calls for development
    // Check if we're on the production server
    if (window.location.hostname === 'iwant2study.org' || window.location.hostname === 'sg.iwant2study.org') {
      // Use PHP proxy for production
      this.baseURL = '/lookangejss/appBuilder/dist/api-proxy.php';
    } else {
      // Use Node.js backend for local development
      this.baseURL = window.location.origin;
    }
  }

  async callOpenAI(prompt: string, model: string = 'gpt-4'): Promise<APIResponse> {
    try {
      const messages = [
        {
          role: 'user',
          content: prompt
        }
      ];

      const url = this.baseURL.includes('api-proxy.php') 
        ? `${this.baseURL}/api/openai`
        : `${this.baseURL}/api/openai`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, model })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        content: data.choices[0]?.message?.content || 'No response generated'
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async callClaude(prompt: string, model: string = 'claude-3-sonnet-20240229'): Promise<APIResponse> {
    try {
      const messages = [
        {
          role: 'user',
          content: prompt
        }
      ];

      const url = this.baseURL.includes('api-proxy.php') 
        ? `${this.baseURL}/api/claude`
        : `${this.baseURL}/api/claude`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages, model })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        content: data.content[0]?.text || 'No response generated'
      };
    } catch (error) {
      console.error('Claude API error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async callGemini(prompt: string): Promise<APIResponse> {
    try {
      const url = this.baseURL.includes('api-proxy.php') 
        ? `${this.baseURL}/api/gemini`
        : `${this.baseURL}/api/gemini`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) {
        throw new Error('No content in Gemini response');
      }

      return { content };
    } catch (error) {
      console.error('Gemini API error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async checkHealth(): Promise<any> {
    try {
      const url = this.baseURL.includes('api-proxy.php') 
        ? `${this.baseURL}/api/health`
        : `${this.baseURL}/api/health`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export const apiService = new APIService();
export default apiService;
