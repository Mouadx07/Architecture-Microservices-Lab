import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  UserX, 
  Calendar,
  Sparkles,
  UserPlus,
  FileSpreadsheet,
  FileJson
} from 'lucide-react';

export const StudentTable = ({
  students = [],
  isLoading,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onAddStudent,
  onSeedData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-desc'); // 'id-desc', 'id-asc', 'name-asc', 'name-desc', 'date-desc', 'date-asc'

  // Extract distinct birth years for filter dropdown
  const availableYears = useMemo(() => {
    const years = new Set();
    students.forEach((s) => {
      if (s.dateNaissance) {
        const y = new Date(s.dateNaissance).getFullYear();
        if (!isNaN(y)) years.add(y);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [students]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        const term = searchTerm.toLowerCase().trim();
        const fullName = `${student.prenom || ''} ${student.nom || ''}`.toLowerCase();
        const reverseName = `${student.nom || ''} ${student.prenom || ''}`.toLowerCase();
        const idMatch = String(student.id).includes(term);

        const matchesSearch = !term || fullName.includes(term) || reverseName.includes(term) || idMatch;

        let matchesYear = true;
        if (selectedYear !== 'ALL') {
          const y = student.dateNaissance ? new Date(student.dateNaissance).getFullYear() : null;
          matchesYear = y === Number(selectedYear);
        }

        return matchesSearch && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === 'id-desc') return b.id - a.id;
        if (sortBy === 'id-asc') return a.id - b.id;
        if (sortBy === 'name-asc') {
          const nameA = `${a.nom} ${a.prenom}`.toLowerCase();
          const nameB = `${b.nom} ${b.prenom}`.toLowerCase();
          return nameA.localeCompare(nameB);
        }
        if (sortBy === 'name-desc') {
          const nameA = `${a.nom} ${a.prenom}`.toLowerCase();
          const nameB = `${b.nom} ${b.prenom}`.toLowerCase();
          return nameB.localeCompare(nameA);
        }
        if (sortBy === 'date-desc') {
          return new Date(b.dateNaissance || 0) - new Date(a.dateNaissance || 0);
        }
        if (sortBy === 'date-asc') {
          return new Date(a.dateNaissance || 0) - new Date(b.dateNaissance || 0);
        }
        return 0;
      });
  }, [students, searchTerm, selectedYear, sortBy]);

  // Calculate age helper
  const calculateAge = (dateStr) => {
    if (!dateStr) return null;
    const birth = new Date(dateStr);
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Format date helper (e.g. 2004-07-01 -> Jul 1, 2004)
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Avatar initials & color generator
  const getAvatarInitials = (prenom, nom) => {
    const first = prenom ? prenom[0].toUpperCase() : '';
    const last = nom ? nom[0].toUpperCase() : '';
    return `${first}${last}` || 'ST';
  };

  const getAvatarGradient = (id) => {
    const gradients = [
      'from-blue-600 to-indigo-600',
      'from-purple-600 to-pink-600',
      'from-emerald-600 to-teal-600',
      'from-amber-600 to-orange-600',
      'from-rose-600 to-red-600',
      'from-cyan-600 to-blue-600',
    ];
    return gradients[id % gradients.length];
  };

  // Export handlers
  const exportCSV = () => {
    const headers = ['ID', 'Nom', 'Prenom', 'Date de Naissance', 'Age'];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.nom || ''}"`,
      `"${s.prenom || ''}"`,
      s.dateNaissance ? s.dateNaissance.split('T')[0] : '',
      calculateAge(s.dateNaissance) || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredStudents, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-6 border-b border-white/[0.08] bg-slate-900/40 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder-slate-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Birth Year Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-input text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year} className="bg-slate-900 text-white">
                  Birth Year: {year}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-input text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer"
            >
              <option value="id-desc" className="bg-slate-900 text-white">ID: High to Low</option>
              <option value="id-asc" className="bg-slate-900 text-white">ID: Low to High</option>
              <option value="name-asc" className="bg-slate-900 text-white">Name: A to Z</option>
              <option value="name-desc" className="bg-slate-900 text-white">Name: Z to A</option>
              <option value="date-desc" className="bg-slate-900 text-white">Youngest First</option>
              <option value="date-asc" className="bg-slate-900 text-white">Oldest First</option>
            </select>
          </div>

          {/* Export Dropdown / Buttons */}
          <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={exportCSV}
              disabled={filteredStudents.length === 0}
              title="Export filtered records to CSV"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors disabled:opacity-40"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={exportJSON}
              disabled={filteredStudents.length === 0}
              title="Export filtered records to JSON"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors disabled:opacity-40"
            >
              <FileJson className="w-4 h-4 text-brand-400" />
            </button>
          </div>

        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-slate-950/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Student Details</th>
              <th className="py-3.5 px-4">Identifier</th>
              <th className="py-3.5 px-4">Birth Date</th>
              <th className="py-3.5 px-4">Age Bracket</th>
              <th className="py-3.5 px-4 text-right sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-32 bg-slate-800 rounded" />
                        <div className="h-3 w-20 bg-slate-800/60 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><div className="h-5 w-12 bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-24 bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-5 w-16 bg-slate-800 rounded" /></td>
                  <td className="py-4 px-4 text-right sm:pr-6"><div className="h-8 w-20 bg-slate-800 rounded ml-auto" /></td>
                </tr>
              ))
            ) : filteredStudents.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="max-w-sm mx-auto flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/[0.08] flex items-center justify-center text-slate-500 mb-4 shadow-inner">
                      <UserX className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      No Student Records Found
                    </h3>
                    <p className="text-xs text-slate-400 mb-5 text-center leading-relaxed">
                      {searchTerm || selectedYear !== 'ALL'
                        ? 'No records match your active search or filter criteria. Try resetting them.'
                        : 'Your MySQL database currently has 0 registered students. Create one or seed demo data!'}
                    </p>
                    <div className="flex items-center gap-3">
                      {searchTerm || selectedYear !== 'ALL' ? (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedYear('ALL');
                          }}
                          className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          Reset Filters
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={onSeedData}
                            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            Seed Demo Data
                          </button>
                          <button
                            onClick={onAddStudent}
                            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-glow transition-colors"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            Add Student
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              // Render Student Rows
              filteredStudents.map((student) => {
                const age = calculateAge(student.dateNaissance);
                const birthYear = student.dateNaissance ? new Date(student.dateNaissance).getFullYear() : null;

                return (
                  <tr 
                    key={student.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Student Full Name & Avatar */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${getAvatarGradient(student.id)} flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm flex-shrink-0`}>
                          {getAvatarInitials(student.prenom, student.nom)}
                        </div>
                        <div>
                          <span className="font-semibold text-white block group-hover:text-brand-300 transition-colors">
                            {student.prenom} {student.nom}
                          </span>
                          <span className="text-xs text-slate-400">
                            {student.nom?.toUpperCase()}, {student.prenom}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* ID Badge */}
                    <td className="py-4 px-4">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-white/[0.08] text-slate-300">
                        #{student.id}
                      </span>
                    </td>

                    {/* Birth Date */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatDate(student.dateNaissance)}</span>
                      </div>
                    </td>

                    {/* Age & Tag */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {age !== null ? (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                            {age} years old
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">—</span>
                        )}
                        {birthYear && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            ({birthYear})
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right sm:pr-6">
                      <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onViewStudent(student)}
                          title="View student entity details"
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditStudent(student)}
                          title="Edit student"
                          className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteStudent(student)}
                          title="Delete student record"
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-4 sm:px-6 border-t border-white/[0.06] bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="text-white font-medium">{filteredStudents.length}</span> of{' '}
          <span className="text-white font-medium">{students.length}</span> total students
        </div>
        <div className="font-mono text-[11px] text-slate-500">
          Backend: <span className="text-slate-400">/students/all</span>
        </div>
      </div>
    </div>
  );
};
