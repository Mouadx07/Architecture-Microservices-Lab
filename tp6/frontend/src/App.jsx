import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StatCards } from './components/StatCards';
import { StudentTable } from './components/StudentTable';
import { DemographicsChart } from './components/DemographicsChart';
import { ApiConsole } from './components/ApiConsole';
import { StudentModal } from './components/StudentModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { useToast } from './components/Toast';
import { StudentApi } from './api/client';
import { ExternalLink, Database, Server, ShieldCheck, Heart } from 'lucide-react';

export function App() {
  const { addToast } = useToast();

  // Navigation tab state: 'directory' | 'analytics' | 'api'
  const [activeTab, setActiveTab] = useState('directory');

  // Core Data States
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [byYearData, setByYearData] = useState([]);
  const [health, setHealth] = useState({ online: false, latency: null });

  // Loading States
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Modal States
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [studentToView, setStudentToView] = useState(null);

  // Fetch all data from backend
  const fetchData = useCallback(async (showToast = false) => {
    try {
      // Check health & fetch in parallel
      const [healthRes, allStudents, totalCount, yearStats] = await Promise.all([
        StudentApi.checkHealth(),
        StudentApi.getAll().catch(() => []),
        StudentApi.getCount().catch(() => 0),
        StudentApi.getByYear().catch(() => []),
      ]);

      setHealth(healthRes);
      setStudents(allStudents);
      setCount(totalCount);
      setByYearData(yearStats);

      if (showToast) {
        addToast('Data synchronized with Spring Boot backend.', 'success');
      }
    } catch (err) {
      console.error('Failed to load data:', err);
      setHealth({ online: false, latency: null });
      if (showToast) {
        addToast('Failed to connect to backend at localhost:8080.', 'error');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [addToast]);

  // Initial load & periodic health check
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      StudentApi.checkHealth().then(setHealth);
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Manual Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData(true);
  };

  // Seed demo data
  const handleSeedData = async () => {
    try {
      setIsSeeding(true);
      const results = await StudentApi.seedDemoData();
      await fetchData();
      addToast(`Successfully populated ${results.length} demo student entities!`, 'success');
    } catch (err) {
      addToast(`Error seeding demo data: ${err.message}`, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  // Create or Update Student
  const handleSaveStudent = async (studentPayload) => {
    const isEdit = Boolean(studentPayload.id);
    const saved = await StudentApi.save(studentPayload);
    await fetchData();
    addToast(
      isEdit 
        ? `Student #${saved.id} (${saved.prenom} ${saved.nom}) updated.` 
        : `Student ${saved.prenom} ${saved.nom} registered with ID #${saved.id}.`,
      'success'
    );
  };

  // Delete Student
  const handleDeleteStudent = async (id) => {
    const success = await StudentApi.delete(id);
    if (success) {
      await fetchData();
      addToast(`Student #${id} deleted successfully.`, 'success');
    } else {
      throw new Error(`Failed to delete student #${id}`);
    }
  };

  // Open Edit Modal
  const openEditModal = (student) => {
    setStudentToEdit(student);
    setIsStudentModalOpen(true);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setStudentToEdit(null);
    setIsStudentModalOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  // Open Detail Modal
  const openDetailModal = (student) => {
    setStudentToView(student);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        health={health}
        onAddStudent={openCreateModal}
        onSeedData={handleSeedData}
        isSeeding={isSeeding}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Stat Cards (Rendered for Directory & Demographics views) */}
        {activeTab !== 'api' && (
          <StatCards
            count={count}
            byYearData={byYearData}
            isLoading={isLoading}
          />
        )}

        {/* Tab 1: Students Directory */}
        {activeTab === 'directory' && (
          <StudentTable
            students={students}
            isLoading={isLoading}
            onViewStudent={openDetailModal}
            onEditStudent={openEditModal}
            onDeleteStudent={openDeleteModal}
            onAddStudent={openCreateModal}
            onSeedData={handleSeedData}
          />
        )}

        {/* Tab 2: Demographics Analytics */}
        {activeTab === 'analytics' && (
          <DemographicsChart
            byYearData={byYearData}
            totalCount={count}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
        )}

        {/* Tab 3: Swagger / OpenAPI Console */}
        {activeTab === 'api' && (
          <ApiConsole />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/[0.06] bg-slate-950/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300 font-['Plus_Jakarta_Sans']">
              Studently Microservice UI
            </span>
            <span>•</span>
            <span>Spring Boot 4.1.2 & MySQL 8.0</span>
            <span>•</span>
            <span className="font-mono text-slate-400">RESTful JPA Architecture</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:8080/swagger-ui/index.html#/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 flex items-center gap-1 transition-colors"
            >
              <span>Swagger UI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="http://localhost:8080/v3/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 flex items-center gap-1 transition-colors"
            >
              <span>OpenAPI JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteStudent}
        student={studentToDelete}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={studentToView}
        onEdit={openEditModal}
      />
    </div>
  );
}
