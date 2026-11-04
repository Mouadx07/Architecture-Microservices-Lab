import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, student }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !student) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirm(student.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl glass-panel border border-rose-500/20 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                  Delete Student Record?
                </h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Are you sure you want to delete student{' '}
                <span className="font-semibold text-white">
                  {student.prenom} {student.nom}
                </span>{' '}
                (<code className="font-mono text-brand-300">ID #{student.id}</code>)?
              </p>
              <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] text-[11px] font-mono text-slate-400">
                DELETE /students/delete/{student.id}
              </div>
              <p className="mt-2 text-[11px] text-rose-400/90">
                This action is irreversible and will remove this entity permanently from the MySQL database.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/25 transition-all disabled:opacity-50"
            >
              <Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-spin' : ''}`} />
              <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
