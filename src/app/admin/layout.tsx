'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderKanban,
  FileText,
  Users,
  Contact2,
  UserCheck,
  LogOut,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/setup' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password';

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          // Check if setup is required
          const setupRes = await fetch('/api/auth/setup');
          const setupData = await setupRes.json();
          if (setupData.success && setupData.setupRequired) {
            router.replace('/admin/setup');
          } else {
            router.replace('/admin/login');
          }
          return;
        }

        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isAuthPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      startTransition(() => {
        router.replace('/admin/login');
      });
    } catch (e) {
      console.error('Logout error:', e);
      router.replace('/admin/login');
    }
  };

  // If on login or setup page, render bare page
  if (isAuthPage) {
    return <>{children}</>;
  }

  // If loading auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-500 font-sans">
        <Loader2 className="w-6 h-6 animate-spin text-gray-900" />
        <span className="text-sm">Verifying CMS Session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Top Simple Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Main Tabs */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2.5 font-bold text-gray-900 text-lg">
              <Image
                src="/brand/icon-dark.svg"
                alt="Business Evolution AI"
                width={28}
                height={28}
                priority
                className="w-7 h-7 object-contain shrink-0"
              />
              <span>BEAI CMS</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/admin"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/admin'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Projects</span>
              </Link>

              <Link
                href="/admin/case-studies"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/admin/case-studies'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Case Studies</span>
              </Link>

              <Link
                href="/admin/team"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/admin/team'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Contact2 className="w-4 h-4" />
                <span>Team</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  href="/admin/users"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/admin/users'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Users</span>
                </Link>
              )}

              <Link
                href="/admin/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/admin/profile'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
            </nav>
          </div>

          {/* Right User Bar & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800">{user?.name}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                {user?.role}
              </span>
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 text-xs font-medium transition-colors cursor-pointer border border-transparent hover:border-red-200"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="sm:hidden flex items-center justify-around border-t border-gray-100 px-2 py-1 bg-gray-50">
          <Link
            href="/admin"
            className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium ${
              pathname === '/admin' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects</span>
          </Link>

          <Link
            href="/admin/case-studies"
            className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium ${
              pathname === '/admin/case-studies' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Cases</span>
          </Link>

          <Link
            href="/admin/team"
            className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium ${
              pathname === '/admin/team' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600'
            }`}
          >
            <Contact2 className="w-3.5 h-3.5" />
            <span>Team</span>
          </Link>

          {user?.role === 'admin' && (
            <Link
              href="/admin/users"
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium ${
                pathname === '/admin/users' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Users</span>
            </Link>
          )}

          <Link
            href="/admin/profile"
            className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium ${
              pathname === '/admin/profile' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        BEAI CMS &bull; Clean Management Dashboard
      </footer>
    </div>
  );
}
