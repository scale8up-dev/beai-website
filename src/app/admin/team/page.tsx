'use client';

import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  LayoutGrid,
  List,
  Image as ImageIcon,
  User,
  Briefcase,
  AlignLeft,
} from 'lucide-react';

interface TeamMemberItem {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const PRESET_TEAM_IMAGES = [
  '/team/domingo.svg',
  '/team/hamza.svg',
  '/team/gregory.svg',
];

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    order: 0,
  });

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMemberItem | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch team from MongoDB API
  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/team');
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch team members');
      }

      setTeam(data.data || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Unable to load team members from MongoDB');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Handle Seed
  const handleSeedDatabase = async () => {
    try {
      setActionLoading(true);
      const res = await fetch('/api/team/seed', { method: 'POST' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to seed team database');
      }

      showToast(data.message || 'Team seeded successfully!');
      fetchTeam();
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
      title: '',
      description: '',
      image: '',
      order: team.length,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (member: TeamMemberItem) => {
    setEditingId(member._id);
    setFormData({
      name: member.name,
      title: member.title,
      description: member.description,
      image: member.image,
      order: member.order ?? 0,
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
      showToast('Photo uploaded successfully!');
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

    if (!formData.name.trim() || !formData.title.trim() || !formData.description.trim() || !formData.image.trim()) {
      showToast('Please fill out all required fields (Name, Title, Description, Image).', 'error');
      return;
    }

    try {
      setActionLoading(true);

      if (editingId) {
        // Update
        const res = await fetch(`/api/team/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update team member');
        }

        showToast('Team member updated successfully.');
      } else {
        // Create
        const res = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to create team member');
        }

        showToast('Team member added successfully.');
      }

      setIsModalOpen(false);
      fetchTeam();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Trigger Delete
  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      setActionLoading(true);
      const res = await fetch(`/api/team/${memberToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete team member');
      }

      showToast('Team member deleted successfully.');
      setDeleteModalOpen(false);
      setMemberToDelete(null);
      fetchTeam();
    } catch (err: unknown) {
      const e = err as Error;
      showToast(e.message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered team
  const filteredTeam = useMemo(() => {
    return team.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [team, search]);

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
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage public team profiles, titles, bios, and portraits displayed on the website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {team.length === 0 && !loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={actionLoading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Seed Default Team</span>
            </button>
          )}

          <button
            onClick={fetchTeam}
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
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team members by name, title, or bio keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 border border-gray-200 p-0.5 rounded-lg bg-gray-50 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'table' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={fetchTeam}
            className="text-xs font-semibold underline hover:text-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Team Content */}
      {loading ? (
        <div className="py-16 text-center text-gray-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-gray-400" />
          <span>Loading team members...</span>
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="py-16 bg-white border border-gray-200 rounded-xl text-center p-6 space-y-3">
          <p className="font-semibold text-gray-700">No team members found</p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {search
              ? 'Try different search keywords.'
              : 'Add your first team member or seed default team data.'}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            {search ? (
              <button
                onClick={() => setSearch('')}
                className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black"
              >
                Add Team Member
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeam.map((member) => (
            <div
              key={member._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="relative w-14 h-14 rounded-full border border-gray-200 overflow-hidden bg-gray-100 shrink-0">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 m-auto text-gray-400" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-blue-600">
                      {member.title}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mt-1">
                  {member.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-1.5 px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-blue-600" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setMemberToDelete(member);
                    setDeleteModalOpen(true);
                  }}
                  className="px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md text-red-600 hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Title / Role</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTeam.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50/75 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-100 shrink-0">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 m-auto text-gray-400" />
                        )}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs font-medium text-blue-600">
                    {member.title}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate">
                    {member.description}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                        title="Edit Team Member"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => {
                          setMemberToDelete(member);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Team Member"
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
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? 'Edit Team Member' : 'Add New Team Member'}
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
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Domingo M. Silvas III"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Title / Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Title / Role *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CEO & Founder"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Description / Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Description / Bio *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter a brief bio or description of the team member's role and expertise..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y"
                />
              </div>

              {/* Image Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Photo / Portrait *
                </label>

                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-medium transition-colors cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
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
                      placeholder="/team/domingo.svg or photo URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                {/* Preset suggestions */}
                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                  <span className="text-[11px] text-gray-500 font-medium">Preset Assets:</span>
                  {PRESET_TEAM_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img}
                      onClick={() => setFormData({ ...formData, image: img })}
                      className={`px-2 py-0.5 rounded text-[11px] border font-mono transition-colors ${
                        formData.image === img ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {img.replace('/team/', '')}
                    </button>
                  ))}
                </div>

                {/* Preview */}
                {formData.image && (
                  <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-gray-50 mt-2">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 bg-white shrink-0">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized={formData.image.startsWith('http')}
                      />
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      Photo preview selected
                    </div>
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
                  {actionLoading ? 'Saving...' : editingId ? 'Save Changes' : 'Add Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-red-200 p-6 space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Delete Team Member</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{memberToDelete.name}</strong> from the team database? This action cannot be undone.
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
                {actionLoading ? 'Deleting...' : 'Delete Team Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
