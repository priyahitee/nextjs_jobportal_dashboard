"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Form, message } from "antd";
import JobPostForm from "@/components/EmployeeJobForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoading } from "@/redux/loaderSlice";
import { useParams } from "next/navigation";
import { useState } from "react";

const EditJobs = () => {
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState<any>(null);

  // Function for updating a Job Details
  const onFinish = async (values: any) => {
    try {
      values._id = jobid;
      dispatch(setLoading(true));
      const response = await axios.put(`/api/jobs/${jobid}`, values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Function to show updated Details
  const getPost = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));  
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    jobData && (
      <div>
        <div className="flex align-middle justify-between">
          <PageTitle title="Edit Job" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>
        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />
          <div className="flex align-middle justify-end my-3 gap-2">
            <Button type="default" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    )
  );
};

export default EditJobs;
