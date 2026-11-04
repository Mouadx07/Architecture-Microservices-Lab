import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  Send,
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';
import { StudentApi } from '../api/client';

export const ApiConsole = () => {
  const [openApiSpec, setOpenApiSpec] = useState(null);
  const [isLoadingSpec, setIsLoadingSpec] = useState(true);
  const [copied, setCopied] = useState(false);

  // Preset known documented endpoints from the Swagger UI documentation
  const defaultEndpoints = [
    {
      id: 'save-student',
      tag: 'StudentController',
      method: 'POST',
      path: '/students/save',
      summary: 'Create or update student record',
      description: 'Persists a student with first name, last name, and birth date in MySQL.',
      defaultBody: JSON.stringify({
        nom: 'Handaji',
        prenom: 'Mouad',
        dateNaissance: '2004-07-01'
      }, null, 2),
      hasBody: true,
      hasIdParam: false,
    },
    {
      id: 'get-all',
      tag: 'StudentController',
      method: 'GET',
      path: '/students/all',
      summary: 'Récupérer tous les étudiants',
      description: 'Fetches the complete array of student entities currently registered.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
    {
      id: 'get-count',
      tag: 'StudentController',
      method: 'GET',
      path: '/students/count',
      summary: 'Count total registered students',
      description: 'Returns the total count scalar (Long) from the repository.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
    {
      id: 'get-by-year',
      tag: 'StudentController',
      method: 'GET',
      path: '/students/byYear',
      summary: 'Group student counts by birth year',
      description: 'Executes custom JPQL SELECT YEAR(s.dateNaissance), COUNT(s) GROUP BY YEAR.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
    {
      id: 'delete-student',
      tag: 'StudentController',
      method: 'DELETE',
      path: '/students/delete/{id}',
      summary: 'Delete student by numeric ID',
      description: 'Removes student record; returns 204 No Content on success or 404 if not found.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: true,
      defaultId: '1',
    },
    {
      id: 'spring-data-paged',
      tag: 'Spring Data REST',
      method: 'GET',
      path: '/students?page=0&size=5',
      summary: 'Paged collection resource',
      description: 'PagedModelEntityModelStudent with HATEOAS HAL JSON links.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
    {
      id: 'spring-data-search',
      tag: 'Spring Data REST',
      method: 'GET',
      path: '/students/search/findNbrStudentByYear',
      summary: 'Search repository custom query',
      description: 'Direct Spring Data repository query method mapping.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
    {
      id: 'alps-profile',
      tag: 'Spring Data REST Metadata',
      method: 'GET',
      path: '/profile/students',
      summary: 'ALPS metadata descriptor',
      description: 'Application-Level Profile Semantics (ALPS) descriptor for the student resource.',
      defaultBody: '',
      hasBody: false,
      hasIdParam: false,
    },
  ];

  // Active selected endpoint for testing
  const [selectedEndpoint, setSelectedEndpoint] = useState(defaultEndpoints[0]);
  const [requestBody, setRequestBody] = useState(defaultEndpoints[0].defaultBody);
  const [pathId, setPathId] = useState('1');
  const [executionResult, setExecutionResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Fetch OpenAPI spec on mount
  useEffect(() => {
    async function loadSpec() {
      try {
        setIsLoadingSpec(true);
        const spec = await StudentApi.getOpenApiSpec();
        setOpenApiSpec(spec);
      } catch (err) {
        console.warn('Could not load remote OpenAPI spec, using standard documented endpoints:', err);
      } finally {
        setIsLoadingSpec(false);
      }
    }
    loadSpec();
  }, []);

  const handleSelectEndpoint = (ep) => {
    setSelectedEndpoint(ep);
    setRequestBody(ep.defaultBody || '');
    if (ep.defaultId) setPathId(ep.defaultId);
    setExecutionResult(null);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionResult(null);

    let actualUrl = selectedEndpoint.path;
    if (selectedEndpoint.hasIdParam) {
      actualUrl = actualUrl.replace('{id}', pathId.trim() || '1');
    }

    const result = await StudentApi.executeCustomRequest(
      selectedEndpoint.method,
      actualUrl,
      selectedEndpoint.hasBody ? requestBody : null
    );

    setExecutionResult(result);
    setIsExecuting(false);
  };

  const handleCopyResponse = () => {
    if (executionResult?.data) {
      navigator.clipboard.writeText(JSON.stringify(executionResult.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getMethodBadge = (method) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'POST':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'DELETE':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'PUT':
      case 'PATCH':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with direct Swagger UI link */}
      <div className="p-5 rounded-2xl glass-panel border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-glow">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Swagger & OpenAPI Live Console
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
                OpenAPI 3.1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive test console for all backend routes exposed at <code className="text-brand-300 font-mono">http://localhost:8080/swagger-ui/index.html#/</code>
            </p>
          </div>
        </div>

        <a
          href="http://localhost:8080/swagger-ui/index.html#/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-white/[0.1] rounded-xl shadow-sm transition-all"
        >
          <span>Open Native Swagger UI</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Main Console Split: Endpoints List (Left) + Interactive Playground (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Endpoints Directory */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Documented Utilities ({defaultEndpoints.length})
            </span>
            {openApiSpec && (
              <span className="text-[11px] font-mono text-emerald-400">
                v3/api-docs synced
              </span>
            )}
          </div>

          <div className="space-y-2">
            {defaultEndpoints.map((ep) => {
              const isSelected = selectedEndpoint.id === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEndpoint(ep)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900/90 border-brand-500/50 shadow-glow'
                      : 'glass-card border-white/[0.06] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded border ${getMethodBadge(ep.method)}`}>
                      {ep.method}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {ep.tag}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-white font-semibold truncate mb-1">
                    {ep.path}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">
                    {ep.summary}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Interactive Request & Response Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-5">
            {/* Selected Route Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Endpoint Tester
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Target: http://localhost:8080
                </span>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-white/[0.08]">
                <span className={`px-2 py-1 text-xs font-mono font-bold rounded border ${getMethodBadge(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-sm text-white font-semibold flex-1">
                  {selectedEndpoint.hasIdParam ? (
                    <>
                      {selectedEndpoint.path.split('{id}')[0]}
                      <span className="text-brand-400 bg-brand-500/10 px-1 py-0.5 rounded border border-brand-500/20">
                        {pathId || '{id}'}
                      </span>
                    </>
                  ) : (
                    selectedEndpoint.path
                  )}
                </span>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-glow transition-all disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isExecuting ? 'animate-pulse' : ''}`} />
                  <span>{isExecuting ? 'Sending...' : 'Send'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-2">
                {selectedEndpoint.description}
              </p>
            </div>

            {/* Path Param Input if applicable */}
            {selectedEndpoint.hasIdParam && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Path Parameter: <code className="text-brand-400 font-mono">id</code>
                </label>
                <input
                  type="text"
                  value={pathId}
                  onChange={(e) => setPathId(e.target.value)}
                  placeholder="e.g. 1"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-mono"
                />
              </div>
            )}

            {/* Request Body JSON Editor if applicable */}
            {selectedEndpoint.hasBody && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Request Payload (JSON Body)
                </label>
                <textarea
                  rows={6}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full p-4 rounded-xl glass-input font-mono text-xs text-brand-300 focus:outline-none"
                />
              </div>
            )}

            {/* Execution Result Area */}
            {executionResult && (
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Response
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                        executionResult.status >= 200 && executionResult.status < 300
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {executionResult.status} {executionResult.statusText}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {executionResult.latency}ms
                    </span>
                  </div>

                  <button
                    onClick={handleCopyResponse}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08] rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
                    {typeof executionResult.data === 'object'
                      ? JSON.stringify(executionResult.data, null, 2)
                      : String(executionResult.data || 'No content')}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
