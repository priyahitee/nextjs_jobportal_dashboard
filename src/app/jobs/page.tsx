"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import PageTitle from '@/components/PageTitle'
import { Button, Table, message, Tooltip  } from "antd";
import { setLoading } from '@/redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from "moment";
import ReceivedJobApplications from '@/components/ReceivedJobApplications';


const Jobs = () => {

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const [jobs, setJobs] = useState([]);
  const [selectedJob = {}, setSelectedJob] = useState({} as any);
  const [showApplications, setShowApplications] = useState<boolean>(false);

  const fetchJobs = async() => {
    try{
      dispatch(setLoading(true))
      const response = await axios.get(`/api/jobs?user=${currentUser._id}`);
      setJobs(response.data.data);
      console.log(response.data.data);
    } catch(error: any){
      message.error(error.message);
    } finally{
      dispatch(setLoading(false))
    }
  }
  useEffect(()=> {
    fetchJobs();
  }, []);

  const deleteJobPost = async(jobId: string) => {
    try{
      dispatch(setLoading(true))
      const response = await axios.delete(`/api/jobs/${jobId}`);
      message.success(response.data.message);
      fetchJobs();
    } catch(error: any){
      message.error(error.message);
    } finally{
      dispatch(setLoading(false));
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      render: (text: any) => moment(text).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Work Mode",
      dataIndex: "workMode",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    { 
      title: "Action",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-5 align-middle">
           <Tooltip title="Delete">
              <i className="ri-delete-bin-line" onClick={()=> deleteJobPost(record._id)}></i>
          </Tooltip>
          <Tooltip title="Edit">
             <i className="ri-edit-line" onClick={() => router.push(`/jobs/edit/${record._id}`)}></i>
          </Tooltip>
          <Tooltip title="Applications">
              <i className="ri-file-list-3-line"  onClick={() => { setSelectedJob(record); setShowApplications(true); }}></i>
          </Tooltip>
        </div>
      )
    },
  ];

  const router = useRouter();
  return (
    <>
     <div className='flex items-center justify-between'>
      <PageTitle title='Posted Jobs' />
      <Button type='primary' onClick={() => router.push("/jobs/new")}>
        Post New Post
      </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={jobs}/>
      </div>
      {showApplications && <ReceivedJobApplications selectedJob={selectedJob} setShowApplications={setShowApplications}
          showApplications={showApplications}/>
      }
      </>
  )
    
   
  
}

export default Jobs