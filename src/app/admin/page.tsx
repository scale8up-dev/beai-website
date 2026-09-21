'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  LayoutGrid,
  List,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag as TagIcon,
  Calendar,
} from 'lucide-react';

interface ProjectItem {
  _id: string;
  name: string;
  year: string;
  tag: string;
  image: string;
  link: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const COMMON_TAGS = [
  'AI Web Application',
  'Enterprise SaaS',
  'Mobile App Platform',
  'FinTech Solution',
  'AI & Automation',
  'Machine Learning',
  'Cloud Infrastructure',
];

const PRESET_IMAGES = [
  '/slideshow/1.jpg',
  '/slideshow/2.jpg',
  '/slideshow/3.jpg',
  '/slideshow/4.png',
  '/slideshow/5.png',
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear().toString(),
    tag: 'AI Web Application',
    image: '',
    link: '#',
    order: 0,
  });

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch projects from MongoDB API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/projects');
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      setProjects(data.data || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Unable to load projects from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Seed
  const handleSeedDatabase = async () => {
    try {
      setActionLoading(true);
      const res = await fetch('/api/projects/seed', { method: 'POST' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to seed database');
      }

      showToast(data.message || 'Database seeded successfully!');
      fetchProjects();
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
    setFormData({
      name: '',
      year: new Date().getFullYear().toString(),
      tag: 'AI Web Application',
      image: '',
      link: '#',
      order: projects.length,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      year: project.year,
      tag: project.tag,
      image: project.image,
      link: project.link || '#',
      order: project.order ?? 0,
    });
    setIsModalOpen(true);
  };

  // Handle Image File Upload
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const body = new FormData();
      body.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setFormData((prev) => ({ ...prev, image: data.url }));
      showToast('Image uploaded successfully!');
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // Submit Create or Edit Form
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.year.trim() || !formData.tag.trim() || !formData.image.trim()) {
      showToast('Please fill out all required fields (Name, Year, Tag, Image).', 'error');
      return;
    }

    try {
      setActionLoading(true);

      if (editingId) {
        // Update
        const res = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update project');
        }

        showToast('Project updated successfully.');
      } else {
        // Create
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to create project');
        }

        showToast('Project created successfully.');
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Trigger Delete
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      setActionLoading(true);
      const res = await fetch(`/api/projects/${projectToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete project');
      }

      showToast('Project deleted successfully.');
      setDeleteModalOpen(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.tag) tags.add(p.tag);
    });
    return Array.from(tags);
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.tag.toLowerCase().includes(search.toLowerCase()) ||
        item.year.toLowerCase().includes(search.toLowerCase());

      const matchesTag = selectedTag === 'ALL' || item.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [projects, search, selectedTag]);

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
          <button
            onClick={() => setToast(null)}
            className="p-1 hover:opacity-75"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your website portfolio projects stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {projects.length === 0 && !loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Seed Default Projects</span>
            </button>
          )}

          <button
            onClick={fetchProjects}
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
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, tag, or year..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedTag === 'ALL'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({projects.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
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
            onClick={fetchProjects}
            className="text-xs font-semibold underline hover:text-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Projects List Content */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
          <span>Loading projects...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 bg-white border border-gray-200 rounded-xl text-center p-6 space-y-3">
          <p className="font-semibold text-gray-700">No projects found</p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {search || selectedTag !== 'ALL'
              ? 'Try changing your search keywords or tag filters.'
              : 'Add your first project or seed default projects to get started.'}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            {search || selectedTag !== 'ALL' ? (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedTag('ALL');
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
                Create Project
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
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Category Tag</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-50/75 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-8 rounded border border-gray-200 overflow-hidden bg-gray-100 shrink-0">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 m-auto text-gray-400" />
                        )}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">
                    {project.year}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                      {project.tag}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-500 max-w-[200px] truncate">
                    {project.link || '#'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setProjectToDelete(project);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Project"
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
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[16/9] bg-gray-100 border-b border-gray-100">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-xs font-semibold text-gray-800 shadow-xs">
                  {project.year}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700 mb-1.5">
                    {project.tag}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                    {project.name}
                  </h3>
                  <div className="text-xs text-gray-400 font-mono truncate mt-1">
                    {project.link || '#'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                  {project.link && project.link !== '#' ? (
                    <a
                      href={project.link}
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
                      onClick={() => handleOpenEdit(project)}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setProjectToDelete(project);
                        setDeleteModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs border border-gray-200 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neural Canvas AI"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Year & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Category Tag *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Web Application"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Tag Suggestions */}
              <div>
                <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Suggested Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_TAGS.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setFormData({ ...formData, tag })}
                      className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                        formData.tag === tag
                          ? 'bg-gray-900 text-white font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Project Link / URL
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="https://... or #"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Image Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Project Image *
                </label>

                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-medium transition-colors cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  <div className="flex-1 w-full relative">
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="/slideshow/1.jpg or image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                {/* Preset suggestions */}
                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                  <span className="text-[11px] text-gray-500 font-medium">Preset Images:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img}
                      onClick={() => setFormData({ ...formData, image: img })}
                      className={`px-2 py-0.5 rounded text-[11px] border font-mono transition-colors ${
                        formData.image === img ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {img.replace('/slideshow/', '')}
                    </button>
                  ))}
                </div>

                {/* Preview */}
                {formData.image && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 mt-2">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={formData.image.startsWith('http')}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploading}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE PROJECT MODAL */}
      {deleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-red-200 p-6 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Delete Project</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{projectToDelete.name}</strong> from MongoDB? This action cannot be undone.
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
                {actionLoading ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
