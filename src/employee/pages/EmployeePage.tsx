import { Layout } from "../../components/Layout";
import { VaccineView } from "../views";
import InfoView from "../views/InfoView";
const EmployeePage = () => {
  return (
    <Layout userRole="Employeee">
      <InfoView />
      <VaccineView />
    </Layout>
  );
};

export default EmployeePage;
