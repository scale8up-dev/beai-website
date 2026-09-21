'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  LayoutGrid,
  List,
  FileText,
  Clock,
  Tag as TagIcon,
  TrendingUp,
  Building2,
  CheckSquare,
  Eye,
  Code,
} from 'lucide-react';

interface MetricItem {
  label: string;
  value: string;
}

interface CaseStudyItem {
  _id: string;
  title: string;
  client: string;
  shortDescription: string;
  metrics: MetricItem[];
  tags: string[];
  duration: string;
  category: string;
  deliverables: string[];
  link: string;
  markdown: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const COMMON_CATEGORIES = [
  'AI & HealthTech',
  'AI Fitness & Wellness',
  'GenAI & Publishing',
  'LegalTech & Directory',
  'PropTech & Automation',
  'Voice AI & Support',
  'Enterprise SaaS',
];

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMarkdown, setPreviewMarkdown] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [metrics, setMetrics] = useState<MetricItem[]>([
    { label: '', value: '' },
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>(['']);
  const [link, setLink] = useState('#');
  const [markdown, setMarkdown] = useState('');
  const [order, setOrder] = useState(0);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CaseStudyItem | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch case studies from API
  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/case-studies');
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch case studies');
      }

      setCaseStudies(data.data || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Unable to load case studies from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Handle Seed
  const handleSeedDatabase = async () => {
    try {
      setActionLoading(true);
      const res = await fetch('/api/case-studies/seed', { method: 'POST' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to seed case studies');
      }

      showToast(data.message || 'Case studies seeded successfully!');
      fetchCaseStudies();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Open Modal for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setClient('');
    setShortDescription('');
    setMetrics([{ label: '', value: '' }]);
    setTags([]);
    setNewTagInput('');
    setDuration('');
    setCategory('AI & HealthTech');
    setDeliverables(['']);
    setLink('#');
    setMarkdown(
      `## Project Overview\n\nBrief overview of the project and background.\n\n---\n\n## The Challenge\n\nDetail the problem statement and client requirements.\n\n---\n\n## The Solution & Architecture\n\nDescribe the technical solution, models used, and engineering breakthroughs.\n\n---\n\n## Measurable Impact\n\n* **Metric 1:** Key result\n* **Metric 2:** Key result`
    );
    setOrder(caseStudies.length);
    setPreviewMarkdown(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (item: CaseStudyItem) => {
    setEditingId(item._id);
    setTitle(item.title);
    setClient(item.client);
    setShortDescription(item.shortDescription);
    setMetrics(
      item.metrics && item.metrics.length > 0
        ? item.metrics
        : [{ label: '', value: '' }]
    );
    setTags(item.tags || []);
    setNewTagInput('');
    setDuration(item.duration);
    setCategory(item.category);
    setDeliverables(
      item.deliverables && item.deliverables.length > 0
        ? item.deliverables
        : ['']
    );
    setLink(item.link || '#');
    setMarkdown(item.markdown || '');
    setOrder(item.order ?? 0);
    setPreviewMarkdown(false);
    setIsModalOpen(true);
  };

  // Add metric row (max 3)
  const handleAddMetric = () => {
    if (metrics.length >= 3) {
      showToast('Maximum 3 metrics allowed.', 'error');
      return;
    }
    setMetrics([...metrics, { label: '', value: '' }]);
  };

  // Remove metric row
  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  // Update metric
  const handleUpdateMetric = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...metrics];
    updated[index][field] = val;
    setMetrics(updated);
  };

  // Add tag (max 5)
  const handleAddTag = () => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if (tags.length >= 5) {
      showToast('Maximum 5 tags allowed.', 'error');
      return;
    }
    if (tags.includes(trimmed)) {
      showToast('Tag already added.', 'error');
      return;
    }
    setTags([...tags, trimmed]);
    setNewTagInput('');
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Add deliverable item
  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, '']);
  };

  // Remove deliverable item
  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  // Update deliverable item
  const handleUpdateDeliverable = (index: number, val: string) => {
    const updated = [...deliverables];
    updated[index] = val;
    setDeliverables(updated);
  };

  // Submit Form
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !client.trim() || !shortDescription.trim() || !duration.trim() || !category.trim() || !markdown.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (shortDescription.trim().length > 150) {
      showToast('Short description cannot exceed 150 characters.', 'error');
      return;
    }

    // Filter out empty metrics and deliverables
    const cleanMetrics = metrics.filter((m) => m.label.trim() && m.value.trim()).slice(0, 3);
    const cleanDeliverables = deliverables.filter((d) => d.trim());
    const cleanTags = tags.slice(0, 5);

    const payload = {
      title: title.trim(),
      client: client.trim(),
      shortDescription: shortDescription.trim(),
      metrics: cleanMetrics,
      tags: cleanTags,
      duration: duration.trim(),
      category: category.trim(),
      deliverables: cleanDeliverables,
      link: link.trim() || '#',
      markdown: markdown.trim(),
      order,
    };

    try {
      setActionLoading(true);

      if (editingId) {
        // Update
        const res = await fetch(`/api/case-studies/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update case study');
        }

        showToast('Case study updated successfully.');
      } else {
        // Create
        const res = await fetch('/api/case-studies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to create case study');
        }

        showToast('Case study created successfully.');
      }

      setIsModalOpen(false);
      fetchCaseStudies();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Trigger Delete
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setActionLoading(true);
      const res = await fetch(`/api/case-studies/${itemToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete case study');
      }

      showToast('Case study deleted successfully.');
      setDeleteModalOpen(false);
      setItemToDelete(null);
      fetchCaseStudies();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Unique categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    caseStudies.forEach((cs) => {
      if (cs.category) cats.add(cs.category);
    });
    return Array.from(cats);
  }, [caseStudies]);

  // Filtered case studies
  const filteredStudies = useMemo(() => {
    return caseStudies.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesCat =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [caseStudies, search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage comprehensive client case studies, metrics, deliverables, and Markdown narratives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {caseStudies.length === 0 && !loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Seed Default Case Studies</span>
            </button>
          )}

          <button
            onClick={fetchCaseStudies}
            disabled={loading}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search case studies by title, client, category, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({caseStudies.length})
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 border border-gray-200 p-0.5 rounded-lg bg-gray-50 shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchCaseStudies}
            className="text-xs font-semibold underline hover:text-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Content List */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
          <span>Loading case studies...</span>
        </div>
      ) : filteredStudies.length === 0 ? (
        <div className="py-16 bg-white border border-gray-200 rounded-xl text-center p-6 space-y-3">
          <p className="font-semibold text-gray-700">No case studies found</p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {search || selectedCategory !== 'ALL'
              ? 'Try adjusting your search query or category filters.'
              : 'Add your first case study or seed default case studies to get started.'}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            {search || selectedCategory !== 'ALL' ? (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('ALL');
                }}
                className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black"
              >
                Create Case Study
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Title & Client</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Key Metrics</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudies.map((cs) => (
                <tr key={cs._id} className="hover:bg-gray-50/75 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{cs.title}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span>{cs.client}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {cs.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-gray-600">
                    {cs.duration}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {cs.metrics && cs.metrics.length > 0 ? (
                        cs.metrics.map((m, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium"
                          >
                            {m.value} {m.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {cs.tags && cs.tags.length > 0 ? (
                        cs.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(cs)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                        title="Edit Case Study"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(cs);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudies.map((cs) => (
            <div
              key={cs._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {cs.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{cs.duration}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                    {cs.title}
                  </h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{cs.client}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {cs.shortDescription}
                </p>

                {/* Metrics */}
                {cs.metrics && cs.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="p-1.5 bg-gray-50 rounded border border-gray-100 text-center">
                        <div className="text-xs font-bold text-gray-900 truncate">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {cs.tags && cs.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cs.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                {cs.link && cs.link !== '#' ? (
                  <a
                    href={cs.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cs)}
                    className="px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-blue-600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setItemToDelete(cs);
                      setDeleteModalOpen(true);
                    }}
                    className="px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md text-red-600 hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-xl text-gray-900">
                  {editingId ? 'Edit Case Study' : 'Create New Case Study'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Complete all fields, key metrics, and Markdown narrative.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-5">
              {/* Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CuerPOWER"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Client *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CuerPOWER Inc."
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Short Description (150 chars max) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Short Description * (150 Chars Max)
                  </label>
                  <span
                    className={`text-xs font-mono ${
                      shortDescription.length > 150
                        ? 'text-red-600 font-bold'
                        : 'text-gray-400'
                    }`}
                  >
                    {shortDescription.length}/150
                  </span>
                </div>
                <textarea
                  required
                  rows={2}
                  maxLength={150}
                  placeholder="24/7 intelligent AI coach for fitness, nutrition, and personalized habit accountability."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI & HealthTech"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  {/* Category suggestions */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {COMMON_CATEGORIES.slice(0, 4).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className="text-[10px] bg-gray-100 text-gray-600 hover:bg-gray-200 px-1.5 py-0.5 rounded cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Weeks"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Metrics (3 Max) */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Metrics (Up to 3)
                  </label>
                  {metrics.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddMetric}
                      className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Metric</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 92%)"
                        value={metric.value}
                        onChange={(e) =>
                          handleUpdateMetric(idx, 'value', e.target.value)
                        }
                        className="w-1/3 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Active Retention)"
                        value={metric.label}
                        onChange={(e) =>
                          handleUpdateMetric(idx, 'label', e.target.value)
                        }
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                      {metrics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMetric(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-600 cursor-pointer"
                          title="Remove metric"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags (5 Max) */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tags (Up to 5)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter a tag (e.g. NLP, React Native)..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={tags.length >= 5 || !newTagInput.trim()}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full border border-gray-200"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Deliverables List */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Key Deliverables List
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Deliverable</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono w-5">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. Cross-platform iOS & Android application in React Native"
                        value={deliv}
                        onChange={(e) =>
                          handleUpdateDeliverable(idx, e.target.value)
                        }
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                      {deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-600 cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Project Link / URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Markdown Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Markdown Content *
                  </label>
                  <button
                    type="button"
                    onClick={() => setPreviewMarkdown(!previewMarkdown)}
                    className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {previewMarkdown ? (
                      <>
                        <Code className="w-3.5 h-3.5" />
                        <span>Edit Markdown</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Markdown</span>
                      </>
                    )}
                  </button>
                </div>

                {previewMarkdown ? (
                  <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[220px] max-h-[350px] overflow-y-auto text-sm text-gray-800 whitespace-pre-wrap font-mono">
                    {markdown || '(No markdown content entered yet)'}
                  </div>
                ) : (
                  <textarea
                    required
                    rows={8}
                    placeholder="Enter case study details in Markdown format..."
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y"
                  />
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingId ? 'Save Changes' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-red-200 p-6 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Delete Case Study</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{itemToDelete.title}</strong> from MongoDB? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Delete Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
