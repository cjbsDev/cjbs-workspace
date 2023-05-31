import MainLayout from '../../component/layout/MainLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //return <MainLayout>{children}</MainLayout>;
  return (
    <MainLayout title={'Clinical Data Center Dashboard '}>
      {children}
    </MainLayout>
  );
}
