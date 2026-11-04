import React, { useState } from 'react';
import { X, Calendar, Hash, User, Copy, Check, Edit3, Code2, Sparkles } from 'lucide-react';

export const StudentDetailModal = ({ isOpen, onClose, student, onEdit }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !student) return null;

  const calculateAge = (dateStr) => {
    if (!dateStr) return 'N/A';
    const birth = new Date(dateStr);
    if (isNaN(birth.getTime())) return 'N/A';
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const birthDate = student.dateNaissance ? new Date(student.dateNaissance) : null;
  const birthYear = birthDate && !isNaN(birthDate.getTime()) ? birthDate.getFullYear() : 'Unknown';
  const age = calculateAge(student.dateNaissance);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(student, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient backdrop */}
        <div className="relative p-6 bg-gradient-to-br from-brand-900/40 via-slate-900/60 to-slate-950 border-b border-white/[0.08]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold tracking-wider shadow-glow">
              {student.prenom?.[0]?.toUpperCase()}{student.nom?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                  {student.prenom} {student.nom}
                </h3>
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-brand-500/10 text-brand-300 border border-brand-500/20">
                  #{student.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Registered Student Entity
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>Date of Birth</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {student.dateNaissance
                  ? new Date(student.dateNaissance).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Age & Cohort</span>
              </div>
              <p className="text-sm font-semibold text-white">
                {age} yrs old <span className="text-xs text-slate-400 font-normal">({birthYear})</span>
              </p>
            </div>
          </div>

          {/* Raw JSON Entity inspection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-brand-400" />
                JPA Entity JSON
              </span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-white/[0.06] text-xs font-mono text-emerald-400 overflow-x-auto">
              {JSON.stringify(student, null, 2)}
            </pre>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-glow transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
