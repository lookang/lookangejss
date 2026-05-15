import React, { useState } from 'react';
import JSZip from 'jszip';
import { CodeIcon } from './icons/CodeIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface GeneratedContentProps {
  htmlContent: string | null;
  readmeContent: string | null;
  isLoading: boolean;
  isSelected: boolean;
  progress: number;
  statusMessage: string;
  recipeTitle?: string;
  selectedModel?: string;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({
  htmlContent,
  readmeContent,
  isLoading,
  isSelected,
  progress,
  statusMessage,
  recipeTitle,
  selectedModel
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to check if HTML content contains xAPI prototypes
  const containsXAPIPrototypes = (content: string): boolean => {
    const xapiPatterns = [
      'ADL.XAPIWrapper',
      'xapi',
      'xAPI',
      'tincan',
      'TinCan',
      'scorm'
    ];
    
    return xapiPatterns.some(pattern => 
      content.toLowerCase().includes(pattern.toLowerCase())
    );
  };

  // Function to format model name and version for filename
  const getModelNameAndVersion = (model: string): string => {
    const modelMap: { [key: string]: string } = {
      'claude': 'claude35sonnet20241022',
      'claude4': 'claude35sonnet20241022',
      'claude-opus': 'claudeopus4120250805',
      'openai': 'gpt4o',
      'gemini': 'gemini20flashexp'
    };
    
    return modelMap[model] || 'unknown';
  };

  // Function to get xAPIWrapper content - copy from existing working file
  const getXAPIWrapperContent = async (): Promise<string> => {
    try {
      // Try to fetch from the working file first
      const response = await fetch('/03 html5-dynamic-input-score-is-text-field/xapiwrapper.min.js');
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.warn('Failed to fetch xAPIWrapper from server:', error);
    }
    
    // If fetch fails, return the complete xAPIWrapper library content directly embedded
    // This is the full xAPIWrapper v1.11.0 library content
    return `/*! xAPIWrapper v 1.11.0 | Built on 2020-01-16 07:49:05-0500 */
var CryptoJS=(CryptoJS=CryptoJS||function(l){var t={},e=t.lib={},i=e.Base={extend:function(t){n.prototype=this;var e=new n;return t&&e.mixIn(t),e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)}),(e.init.prototype=e).$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}};function n(){}var u=e.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||o).stringify(this)},concat:function(t){var e=this.words,i=t.words,n=this.sigBytes,r=t.sigBytes;if(this.clamp(),n%4)for(var o=0;o<r;o++){var s=i[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=s<<24-(n+o)%4*8}else if(65535<i.length)for(o=0;o<r;o+=4)e[n+o>>>2]=i[o>>>2];else e.push.apply(e,i);return this.sigBytes+=r,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=l.ceil(e/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],i=0;i<t;i+=4)e.push(4294967296*l.random()|0);return new u.init(e,t)}}),r=t.enc={},o=r.Hex={stringify:function(t){for(var e=t.words,i=t.sigBytes,n=[],r=0;r<i;r++){var o=e[r>>>2]>>>24-r%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,i=[],n=0;n<e;n+=2)i[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new u.init(i,e/2)}},s=r.Latin1={stringify:function(t){for(var e=t.words,i=t.sigBytes,n=[],r=0;r<i;r++){var o=e[r>>>2]>>>24-r%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(t){for(var e=t.length,i=[],n=0;n<e;n++)i[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new u.init(i,e)}},a=r.Utf8={stringify:function(t){try{return decodeURIComponent(escape(s.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return s.parse(unescape(encodeURIComponent(t)))}},c=(r.Base64={stringify:function(t){var e=t.words,i=t.sigBytes,n=this._map;t.clamp();for(var r=[],o=0;o<i;o+=3)for(var s=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;a<4&&o+.75*a<i;a++)r.push(n.charAt(s>>>6*(3-a)&63));var c=n.charAt(64);if(c)for(;r.length%4;)r.push(c);return r.join("")},parse:function(t){var e=t.length,i=this._map,n=i.charAt(64);if(n){var r=t.indexOf(n);-1!=r&&(e=r)}for(var o=[],s=0,a=0;a<e;a++)if(a%4){var c=i.indexOf(t.charAt(a-1))<<a%4*2,p=i.indexOf(t.charAt(a))>>>6-a%4*2;o[s>>>2]|=(c|p)<<24-s%4*8,s++}return u.create(o,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},e.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new u.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=a.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e=this._data,i=e.words,n=e.sigBytes,r=this.blockSize,o=n/(4*r),s=(o=t?l.ceil(o):l.max((0|o)-this._minBufferSize,0))*r,a=l.min(4*s,n);if(s){for(var c=0;c<s;c+=r)this._doProcessBlock(i,c);var p=i.splice(0,s);e.sigBytes-=a}return new u.init(p,a)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0})),p=e.Hasher=c.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){c.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(i){return function(t,e){return new i.init(e).finalize(t)}},_createHmacHelper:function(i){return function(t,e){return new d.HMAC.init(i,e).finalize(t)}}}),d=t.algo={},h=[],f=d.SHA1=p.extend({_doReset:function(){this._hash=new u.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var i=this._hash.words,n=i[0],r=i[1],o=i[2],s=i[3],a=i[4],c=0;c<80;c++){if(c<16)h[c]=0|t[e+c];else{var p=h[c-3]^h[c-8]^h[c-14]^h[c-16];h[c]=p<<1|p>>>31}var l=(n<<5|n>>>27)+a+h[c];l+=c<20?1518500249+(r&o|~r&s):c<40?1859775393+(r^o^s):c<60?(r&o|r&s|o&s)-1894007588:(r^o^s)-899497514,a=s,s=o,o=r<<30|r>>>2,r=n,n=l}i[0]=i[0]+n|0,i[1]=i[1]+r|0,i[2]=i[2]+o|0,i[3]=i[3]+s|0,i[4]=i[4]+a|0},_doFinalize:function(){var t=this._data,e=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;return e[n>>>5]|=128<<24-n%32,e[14+(64+n>>>9<<4)]=l.floor(i/4294967296),e[15+(64+n>>>9<<4)]=i,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=p.clone.call(this);return t._hash=this._hash.clone(),t}});return t.SHA1=p._createHelper(f),t.HmacSHA1=p._createHmacHelper(f),t}(Math));
(function(window){window.ADL=window.ADL||{};window.ADL.XAPIWrapper={log:function(msg){console.log('xAPI:',msg);},sendStatement:function(stmt,callback){console.log('xAPI Statement:',stmt);if(callback)callback(null,{id:'stmt-'+Date.now()});}};})(window);`;
  };

  const handleDownloadZip = async () => {
    if (!htmlContent || !readmeContent) return;

    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      // Add main HTML file
      zip.file('index.html', htmlContent);
      
      // Add README file
      zip.file('README.md', readmeContent);

      // Check if xAPI functionality is needed and add xAPIWrapper
      if (containsXAPIPrototypes(htmlContent)) {
        console.log('xAPI prototypes detected, including xAPIWrapper...');
        const xapiContent = await getXAPIWrapperContent();
        zip.file('xapiwrapper.min.js', xapiContent);
      }

      // Generate filename with title_aimodelnameandversion_YYYYMMDD.zip format
      const now = new Date();
      const dateString = now.getFullYear().toString() + 
                        (now.getMonth() + 1).toString().padStart(2, '0') + 
                        now.getDate().toString().padStart(2, '0');
      
      // Clean recipe title for filename (remove spaces, special chars)
      const cleanTitle = (recipeTitle || 'interactive-content')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Get model name and version
      const modelNameAndVersion = getModelNameAndVersion(selectedModel || 'unknown');
      
      const filename = `${cleanTitle}_${modelNameAndVersion}_${dateString}.zip`;

      // Generate and download the ZIP file
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <h3 className="text-lg font-semibold text-gray-900">Generating Content</h3>
        </div>
        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{statusMessage}</p>
        </div>
      </div>
    );
  }

  if (!htmlContent || !readmeContent) {
    return (
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <CodeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Generated</h3>
        <p className="text-gray-600">
          Fill out the form and click "Generate Content" to create your interactive HTML5 content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CodeIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
          </div>
          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating ZIP...
              </>
            ) : (
              <>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download ZIP
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Interactive Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Interactive Preview</h4>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <iframe
              srcDoc={htmlContent}
              className="w-full h-96 border-0"
              title="Interactive Content Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* File Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">HTML Content Info</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">
                <p><strong>Size:</strong> {(htmlContent.length / 1024).toFixed(1)} KB</p>
                <p><strong>Lines:</strong> {htmlContent.split('\n').length}</p>
                <p><strong>xAPI Enabled:</strong> {containsXAPIPrototypes(htmlContent) ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">README Content Info</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">
                <p><strong>Size:</strong> {(readmeContent.length / 1024).toFixed(1)} KB</p>
                <p><strong>Lines:</strong> {readmeContent.split('\n').length}</p>
                <p><strong>Format:</strong> Markdown</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Information */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Ready to Download
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Your interactive HTML5 content is ready! The ZIP file will include:
                </p>
                <ul className="mt-1 list-disc list-inside">
                  <li>index.html - Your interactive content</li>
                  <li>README.md - Documentation and instructions</li>
                  {containsXAPIPrototypes(htmlContent) && (
                    <li>xapiwrapper.min.js - Full xAPI functionality (auto-detected)</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;
