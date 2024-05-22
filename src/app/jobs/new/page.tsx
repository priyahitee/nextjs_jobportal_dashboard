"use client";
import React from "react";
import { useRouter } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { Button, Form, message } from "antd";
import JobPostForm from "@/components/EmployeeJobForm";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoading } from "@/redux/loaderSlice";

const NewJobs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    console.log(values)
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/api/jobs", values);
      message.success(response.data.message);
      router.push("/jobs");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="flex align-middle justify-between">
        <PageTitle title="New Jobs" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <JobPostForm />
        <div className="flex align-middle justify-end my-3 gap-2">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">Save</Button>
        </div>
      </Form>
    </>
  );
};

export default NewJobs;
