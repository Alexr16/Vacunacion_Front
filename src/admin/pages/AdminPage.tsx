import { Layout } from "../../components/Layout";
import { EmployeeListView } from "../views/EmployeeListView";

const AdminPage = () => {
  return (
    <Layout userRole="Admin">
      <EmployeeListView />
    </Layout>
  );
};

export default AdminPage;
