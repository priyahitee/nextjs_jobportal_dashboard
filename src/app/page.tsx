"use client"
import axios from "axios";
// import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loaderSlice";
import { Col, Row, message } from "antd";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";
import Filters from "@/components/Filters";

  // Client-side rendering
  // const [user, setUser] = useState<any>(null);
  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("/api/users/currentuser");
  //     console.log(response.data.data)
  //     setUser(response.data.data);
  //   } catch (error: any) {
  //     message.error(error.response.data.message || error.message);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

//Server-side rendering
// export async function getUser(){
//     try{
//       const token = cookies().get("token")?.value;
//       const response = await axios.get("http://localhost:3000/api/users/currentuser", 
//       {
//         method: 'GET',
//         timeout: 50000,
//         headers: {
//           Cookie: `token=${token}`,
//         }
//       }
//     );
//     return response.data.data;
  
//     } catch(error){
//       console.log(error);
//     }
// }

export default function Home() { 
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [filters, setFilters] = useState({
    searchText: "",
    location: "",
  });

  const fetchJobs = async() => {
    try{
      dispatch(setLoading(true));
      const response = await axios.get(`/api/jobs`, { params: filters })
      setJobs(response.data.data);
    }catch(error: any){
      message.error(error.message);
    } finally{
      dispatch(setLoading(false));
    }
  }

  useEffect(()=> {
    fetchJobs()
  }, []);

  return (
    <>
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />
      <Row gutter={[16, 16]}>
          {jobs.map((job:any) => (
              <Col span={8} className="p-2" key={job._id} onClick={() => router.push(`/jobinfo/${job._id}`)}>
                  <div className="card flex flex-col gap-2 cursor-pointer p-2">
              <h1 className="text-md">{job.title}</h1>
              <Divider />

              <div className="flex justify-between">
                <span>Company</span>
                <span>{job.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between">
                <span>Salary</span>
                <span>
                  {job.salaryFromRange} LPA - {job.salaryToRange} LPA
                </span>
              </div>

              <div className="flex justify-between">
                <span>Work Mode</span>
                <span>{job.workMode}</span>
              </div>
            </div>
              </Col>
          ))}
      </Row>
    </>
  );
}


