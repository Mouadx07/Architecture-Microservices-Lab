import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Save, AlertCircle, Sparkles } from 'lucide-react';

export const StudentModal = ({ isOpen, onClose, onSave, studentToEdit = null }) => {
  const isEditing = Boolean(studentToEdit);

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      setNom(studentToEdit.nom || '');
      setPrenom(studentToEdit.prenom || '');
      // Format to YYYY-MM-DD for date input
      if (studentToEdit.dateNaissance) {
        try {
          const d = new Date(studentToEdit.dateNaissance);
          setDateNaissance(d.toISOString().split('T')[0]);
        } catch {
          setDateNaissance(studentToEdit.dateNaissance);
        }
      } else {
        setDateNaissance('');
      }
    } else {
      setNom('');
      setPrenom('');
      setDateNaissance('2004-01-15'); // pleasant modern default
    }
    setError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom.trim() || !prenom.trim()) {
      setError('Please provide both first name and last name.');
      return;
    }
    if (!dateNaissance) {
      setError('Please select a valid date of birth.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSave({
        ...(isEditing ? { id: studentToEdit.id } : {}),
        nom: nom.trim(),
        prenom: prenom.trim(),
        dateNaissance: dateNaissance,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl glass-panel border border-white/[0.1] shadow-2xl overflow-hidden scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                {isEditing ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEditing ? `Updating ID #${studentToEdit.id}` : 'POST /students/save'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* First Name (Prenom) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              First Name (<span className="text-brand-400 font-mono">prenom</span>) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Mouad"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm placeholder-slate-500"
                autoFocus
              />
            </div>
          </div>

          {/* Last Name (Nom) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Last Name (<span className="text-brand-400 font-mono">nom</span>) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Handaji"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm placeholder-slate-500"
              />
            </div>
          </div>

          {/* Date of Birth (dateNaissance) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Date of Birth (<span className="text-brand-400 font-mono">dateNaissance</span>) *
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-200"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Persisted with JPA <code className="text-slate-400 font-mono">@Temporal(TemporalType.DATE)</code>
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 rounded-xl shadow-glow transition-all disabled:opacity-50"
            >
              <Save className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>{isSubmitting ? 'Saving to Database...' : isEditing ? 'Update Student' : 'Save Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
