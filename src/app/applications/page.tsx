"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Table, message } from "antd";
import { setLoading } from "@/redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";

const Applications = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `/api/applications?user=${currentUser._id}`
      );
      setApplications(response.data.data);
      console.log(response.data.data)
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
    },
    {
      title: "Job Title",
      dataIndex: "job",
      render: (job: any) => job.title,
    },
    {
      title: "Company",
      dataIndex: "job",
      render: (job: any) => job.user.name,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ];

  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Applications" />
      </div>
      <div>
        <Table columns={columns} dataSource={applications} />
      </div>
    </>
  );
};

export default Applications;
