import { useState, useEffect } from 'react';
import { recordsAPI } from '../lib/api';

export interface Record {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  user_id: string;
  created_at: string;
  updated_at: string;
  users?: {
    name: string;
    email: string;
  };
}

export interface RecordStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
}

export const useRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [stats, setStats] = useState<RecordStats>({ total: 0, active: 0, inactive: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchRecords = async (page = 1, limit = 10, search = '', status = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await recordsAPI.getRecords(page, limit, search, status);
      setRecords(response.records);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar registros');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await recordsAPI.getStats();
      setStats(response);
    } catch (err: any) {
      console.error('Erro ao carregar estatísticas:', err);
    }
  };

  const createRecord = async (record: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const newRecord = await recordsAPI.createRecord(record);
      setRecords(prev => [newRecord, ...prev]);
      await fetchStats();
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Erro ao criar registro');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (id: string, record: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const updatedRecord = await recordsAPI.updateRecord(id, record);
      setRecords(prev => prev.map(r => r.id === id ? updatedRecord : r));
      await fetchStats();
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar registro');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await recordsAPI.deleteRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      await fetchStats();
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar registro');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchStats();
  }, []);

  return {
    records,
    stats,
    loading,
    error,
    pagination,
    fetchRecords,
    fetchStats,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};