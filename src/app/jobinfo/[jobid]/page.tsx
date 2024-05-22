"use client"
import { setLoading } from '@/redux/loaderSlice';
import { Button, Col, Row, message } from 'antd';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '@/components/PageTitle'
import Divider from '@/components/Divider';

const JobInfo = () => {
  const router = useRouter();
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobData, setJobData] = useState<any>(null);
  const [application, setApplication] = useState([]);

  const fetchPost = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
      console.log(response.data.data)
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));  
    }
  };

  const fetchApplication = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/applications?job=${jobid}&user=${currentUser._id}`);
      setApplication(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));  
    }
  };

  useEffect(() => {
    fetchPost()
    fetchApplication()
  }, []);

  const onApply = async() => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`/api/applications`, {
        job: jobData._id,
        user: currentUser._id,
        status: "pending",
      });
      message.success(response.data.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]} className="gap-3">
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>
            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>
            <div className="flex justify-between">
              <span>Jop Type</span>
              <span>{jobData.jobType}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} Years</span>
            </div>
          </Col>

          <Col span={24} className="flex flex-col gap-2">
            <h1 className="text-md">Job Description</h1>
            <Divider />
            <span>{jobData.description}</span>
            {application.length > 0 && (
              <span className="my-3 info p-3 rounded">
                You have already applied for this job, Please wait for the employer to respond!!!!  
              </span>
            )}
            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button> 
              <Button
                type="default"
                onClick={() => router.push(`/userinfo/${jobData.user._id}`)}
              >
                View Company Info
              </Button>
              <Button
                type="primary"
                onClick={onApply}
                disabled={currentUser.userType === "employer" || application.length > 0}
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  )
}

export default JobInfo