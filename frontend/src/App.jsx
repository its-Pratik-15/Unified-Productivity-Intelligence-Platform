import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { Skeleton } from './components/atoms/Skeleton';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Assignments = lazy(() => import('./pages/Assignments'));
const Notes = lazy(() => import('./pages/Notes'));
const Focus = lazy(() => import('./pages/Focus'));
const Revision = lazy(() => import('./pages/Revision'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Reminders = lazy(() => import('./pages/Notifications'));

const PageLoader = () => (
  <div className="space-y-6 p-2">
    <Skeleton className="h-10 w-1/3" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
    </div>
    <Skeleton className="h-80 w-full" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
          <Route path="assignments" element={<Suspense fallback={<PageLoader />}><Assignments /></Suspense>} />
          <Route path="notes" element={<Suspense fallback={<PageLoader />}><Notes /></Suspense>} />
          <Route path="focus" element={<Suspense fallback={<PageLoader />}><Focus /></Suspense>} />
          <Route path="revision" element={<Suspense fallback={<PageLoader />}><Revision /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<PageLoader />}><Analytics /></Suspense>} />
          <Route path="reminders" element={<Suspense fallback={<PageLoader />}><Reminders /></Suspense>} />
          {/* Legacy redirects */}
          <Route path="tasks" element={<Navigate to="/assignments" replace />} />
          <Route path="notifications" element={<Navigate to="/reminders" replace />} />
          <Route path="integrations" element={<Navigate to="/reminders" replace />} />
          <Route path="planner" element={<Navigate to="/" replace />} />
          <Route path="assistant" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
