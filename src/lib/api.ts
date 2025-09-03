const API_BASE_URL = 'http://localhost:3001/api';

// Função para fazer requisições autenticadas
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
};

// Serviços de autenticação
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  updateProfile: async (name: string) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  },
};

// Serviços de registros
export const recordsAPI = {
  getRecords: async (page = 1, limit = 10, search = '', status = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(status && { status }),
    });
    
    return apiRequest(`/records?${params}`);
  },

  getRecord: async (id: string) => {
    return apiRequest(`/records/${id}`);
  },

  createRecord: async (record: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) => {
    return apiRequest('/records', {
      method: 'POST',
      body: JSON.stringify(record),
    });
  },

  updateRecord: async (id: string, record: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
  }) => {
    return apiRequest(`/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(record),
    });
  },

  deleteRecord: async (id: string) => {
    return apiRequest(`/records/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return apiRequest('/records/stats');
  },
};

export default { authAPI, recordsAPI };