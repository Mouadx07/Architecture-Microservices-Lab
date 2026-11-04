import axios from 'axios';

// In dev mode with Vite proxy, relative path works directly and avoids CORS.
// If accessing directly or in standalone production, it can fallback to http://localhost:8080.
export const DEFAULT_BASE_URL = window.location.port === '3000' || window.location.port === '5173'
  ? '' 
  : 'http://localhost:8080';

const api = axios.create({
  baseURL: DEFAULT_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for logging/metrics
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const StudentApi = {
  // Fetch all students (GET /students/all)
  async getAll() {
    const res = await api.get('/students/all');
    return Array.isArray(res.data) ? res.data : [];
  },

  // Count total students (GET /students/count)
  async getCount() {
    const res = await api.get('/students/count');
    return typeof res.data === 'number' ? res.data : Number(res.data) || 0;
  },

  // Grouped by year of birth (GET /students/byYear)
  async getByYear() {
    const res = await api.get('/students/byYear');
    // Note: Spring returns array of [year, count] or object wrapper { value: [[2004, 1]] }
    let raw = res.data;
    if (raw && typeof raw === 'object' && Array.isArray(raw.value)) {
      raw = raw.value;
    }
    if (!Array.isArray(raw)) return [];
    
    // Normalize into array of objects { year: number, count: number }
    return raw.map((item) => {
      if (Array.isArray(item)) {
        return { year: Number(item[0]), count: Number(item[1]) };
      }
      if (typeof item === 'object' && item !== null) {
        return {
          year: Number(item.year || item[0] || Object.keys(item)[0]),
          count: Number(item.count || item[1] || Object.values(item)[0]),
        };
      }
      return { year: 0, count: 0 };
    }).sort((a, b) => a.year - b.year);
  },

  // Create or update student (POST /students/save)
  async save(student) {
    // Expected format: { nom: string, prenom: string, dateNaissance: "YYYY-MM-DD" }
    const payload = {
      nom: student.nom?.trim(),
      prenom: student.prenom?.trim(),
      dateNaissance: student.dateNaissance,
    };
    if (student.id) {
      payload.id = student.id;
    }
    const res = await api.post('/students/save', payload);
    return res.data;
  },

  // Delete student (DELETE /students/delete/{id})
  async delete(id) {
    const res = await api.delete(`/students/delete/${id}`);
    return res.status === 204 || res.status === 200;
  },

  // Fetch OpenAPI JSON specification (/v3/api-docs)
  async getOpenApiSpec() {
    const res = await api.get('/v3/api-docs');
    return res.data;
  },

  // Ping health check and measure latency
  async checkHealth() {
    const startTime = performance.now();
    try {
      await api.get('/students/count', { timeout: 3000 });
      const latency = Math.round(performance.now() - startTime);
      return { online: true, latency };
    } catch (err) {
      return { online: false, latency: null, error: err.message };
    }
  },

  // Generic request executor for API Console / Swagger tester
  async executeCustomRequest(method, url, body = null) {
    const startTime = performance.now();
    try {
      const res = await api.request({
        method: method.toLowerCase(),
        url,
        data: body ? (typeof body === 'string' ? JSON.parse(body) : body) : undefined,
      });
      const latency = Math.round(performance.now() - startTime);
      return {
        success: true,
        status: res.status,
        statusText: res.statusText || 'OK',
        data: res.data,
        headers: res.headers,
        latency,
      };
    } catch (err) {
      const latency = Math.round(performance.now() - startTime);
      return {
        success: false,
        status: err.response?.status || 500,
        statusText: err.response?.statusText || err.message,
        data: err.response?.data || { error: err.message },
        latency,
      };
    }
  },

  // Quick Seed Demo Data (Populates realistic students with varied birth years)
  async seedDemoData() {
    const sampleStudents = [
      { nom: 'Handaji', prenom: 'Mouad', dateNaissance: '2004-07-01' },
      { nom: 'Alami', prenom: 'Yassine', dateNaissance: '2003-04-15' },
      { nom: 'Bennani', prenom: 'Salma', dateNaissance: '2004-11-20' },
      { nom: 'Chraibi', prenom: 'Hamza', dateNaissance: '2002-09-08' },
      { nom: 'El Idrissi', prenom: 'Kenza', dateNaissance: '2005-02-14' },
      { nom: 'Tahiri', prenom: 'Amine', dateNaissance: '2003-12-05' },
      { nom: 'Mansouri', prenom: 'Zineb', dateNaissance: '2004-03-30' },
      { nom: 'Naciri', prenom: 'Mehdi', dateNaissance: '2002-06-22' },
      { nom: 'Zerouali', prenom: 'Hiba', dateNaissance: '2005-10-18' },
    ];

    const results = [];
    for (const student of sampleStudents) {
      try {
        const created = await this.save(student);
        results.push(created);
      } catch (err) {
        console.error('Seed item failed:', err);
      }
    }
    return results;
  }
};
