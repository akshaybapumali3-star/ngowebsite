import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  return (

    <div style={{padding:"40px"}}>

      <h1>Balvatsalya Dashboard</h1>

      <p>Welcome to Child Protection Complaint Portal</p>

      <button
        style={{
          padding:"12px 20px",
          background:"#0b3d91",
          color:"white",
          border:"none",
          borderRadius:"5px",
          cursor:"pointer"
        }}
        onClick={()=>navigate("/portal")}
      >
        Report Child Complaint
      </button>

    </div>
  );
};

export default Dashboard;