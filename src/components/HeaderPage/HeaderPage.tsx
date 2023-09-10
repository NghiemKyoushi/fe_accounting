interface HeaderPageProps {
  children: React.ReactNode;
}
const HeaderPage = (prop: HeaderPageProps) => {
  return (
    <div style={{ backgroundColor: "#f8f8f8", marginBottom: 10 }}>
      {prop.children}
    </div>
  );
};

export default HeaderPage;
