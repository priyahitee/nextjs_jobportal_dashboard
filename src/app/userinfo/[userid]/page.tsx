"use client";
import { setLoading } from "@/redux/loaderSlice";
import { message } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "@/components/PageTitle";
import EmployerInfo from "@/components/EmployerInfo";
import EmployeeInfo from "@/components/EmployeeInfo";

function userInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const { userid } = useParams();
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/users/${userid}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === "employer" ? "Employer" : "Applicant"
          } Info`}
        />

        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo = {userInfo}/>
        ) : (
          <EmployeeInfo employeeInfo = {userInfo}/>
        )}
      </div>
    )
  );
}

export default userInfo;
