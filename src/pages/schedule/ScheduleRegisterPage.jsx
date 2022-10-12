import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ScheduleCard from "../../components/schedule/ScheduleCard";
import { routingLoginPage } from "../../utils/routingLoginPage";

function ScheduleRegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    routingLoginPage(navigate);
  }, []);

  return (
    <Layout isLoggedIn={false} title="일정 등록" highlight={"schedule/create"}>
      <div className="h-full grid place-content-center">
        <div className="flex justify-center mt-10 mb-5">
          <span className="mr-3 font-medium text-lg text-black2">새 일정 만들기</span>
          <AddCircleIcon
            className="cursor-pointer drop-shadow-md text-black2"
            sx={{ fontSize: 30 }}
            onClick={() => navigate(`/schedule/register`)}
          ></AddCircleIcon>
        </div>
        <ScheduleCard />
      </div>
    </Layout>
  );
}

export default ScheduleRegisterPage;
