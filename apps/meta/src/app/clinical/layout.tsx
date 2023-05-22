import MainLayout from '../../component/layout/mainLayout';

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
