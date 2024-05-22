"use client"
import React from 'react'
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, message } from 'antd';
import PageTitle from '@/components/PageTitle';
import axios from 'axios';
import { setLoading } from '@/redux/loaderSlice';
import { setCurrentUsers } from '@/redux/usersSlice';


const profile = () => {
    const { currentUser } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();
    const onFinish = async(values: any) => {
      try{
        values._id = currentUser._id;
        values.userType = currentUser.userType;
        dispatch(setLoading(true));
        const response= await axios.put('/api/users', values);

        dispatch(setCurrentUsers(response.data.data));
        message.success('Profile Updated Successfully!');
      }catch(error: any){
        message.error(error.response.data.message || "Something went wrong");
      }finally{
        dispatch(setLoading(false));
      }
    }
  return (
    <div>
        <Form layout='vertical' initialValues={currentUser} onFinish={onFinish}>
        <PageTitle title='Profile'/>
        { currentUser?.userType === "employee" ? <EmployeeForm/> : <EmployerForm/> }
        <div className="flex justify-end my-3">
          <Button type='primary' htmlType='submit'>
              Save
          </Button>
        </div>
        </Form>
    </div>

  )
}

export default profile;