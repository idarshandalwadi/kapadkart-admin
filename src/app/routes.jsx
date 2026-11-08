import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '@/shared/components/AdminLayout'
import AdminProtectedRoute from '@/features/admin/auth/ProtectedRoute'

const AdminLoginPage = lazy(() => import('@/features/admin/auth/LoginPage'))
const PlatformDashboardPage = lazy(() => import('@/features/admin/dashboard/PlatformDashboardPage'))
const ShopListPage = lazy(() => import('@/features/admin/shops/ShopListPage'))
const ShopFormPage = lazy(() => import('@/features/admin/shops/ShopFormPage'))
const ShopDetailPage = lazy(() => import('@/features/admin/shops/ShopDetailPage'))
const EmailLogsPage = lazy(() => import('@/features/admin/emails/EmailLogsPage'))

function LoadingFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-3 border-amber-500/20 border-t-amber-500" />
        <span className="text-xs font-medium text-[#9aa3ad]">Loading…</span>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />

        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PlatformDashboardPage />} />
            <Route path="/shops" element={<ShopListPage />} />
            <Route path="/shops/new" element={<ShopFormPage key="new" />} />
            <Route path="/shops/:slug/edit" element={<ShopFormPage key="edit" />} />
            <Route path="/shops/:slug" element={<ShopDetailPage />} />
            <Route path="/emails" element={<EmailLogsPage />} />

            {/* Seamless /admin/* compatibility routes */}
            <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<PlatformDashboardPage />} />
            <Route path="/admin/shops" element={<ShopListPage />} />
            <Route path="/admin/shops/new" element={<ShopFormPage key="new-admin" />} />
            <Route path="/admin/shops/:slug/edit" element={<ShopFormPage key="edit-admin" />} />
            <Route path="/admin/shops/:slug" element={<ShopDetailPage />} />
            <Route path="/admin/emails" element={<EmailLogsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
