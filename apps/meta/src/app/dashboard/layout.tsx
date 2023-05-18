import MainLayout from '../../component/layout/MainLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

// export const dynamic = 'auto';
// export const dynamicParams = true;
// export const revalidate = false;
// export const fetchCache = 'auto';
// export const runtime = 'nodejs';
// export const preferredRegion = 'all';
