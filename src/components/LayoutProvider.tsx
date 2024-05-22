"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {  setCurrentUsers } from '@/redux/usersSlice'
import { setLoading } from "@/redux/loaderSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "./Loader";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { currentUser } = useSelector((state: any) => state.users);
  const  {loading } = useSelector((state: any) => state.loaders);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState([
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ]);

  const getCurrentUser = async() => {
        try{
          dispatch(setLoading(true));
          const response = await axios.get('/api/users/currentuser');
          const isEmployer = response.data.data.userType === "employer";

          const updatedMenuItems = menuItems.map((item, index) => {
            if (index === 2) {
              return isEmployer
                ? { name: "Posted Jobs", path: "/jobs", icon: item.icon }
                : { name: "Applications", path: "/applications", icon: item.icon };
            }
            return item;
          });
          setMenuItems(updatedMenuItems);
      
          dispatch(setCurrentUsers(response.data.data));

      } catch(error: any){
          message.error("Please clear your cookies!")
          message.error(error.response.data.message || 'Something went wrong!')
      } finally {
        dispatch(setLoading(false));
  }
}

  useEffect(()=> {
   if((pathname !== "/login" && pathname !== "/register") && !currentUser){
    getCurrentUser();
   }
  }, [pathname]);

  const onLogout = async () => {
    try {
      dispatch(setLoading(true));
      await axios.post("/api/users/logout");
      message.success("Logged out successfully");
      dispatch(setCurrentUsers(null));
      router.push("/login")
    } catch(error:any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#213555",
            },
          }}
        >
          {loading && <Loader />}
          {/* if route is login / register, no need to show sidebar */}
          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            currentUser && <div className="layout-parent">
              <div className="sidebar"  style={{width: isSidebarExpanded ? "250px" : "auto" }}>
                <div className="logo">
                  {isSidebarExpanded && <h1>JOBS</h1>}
                  {!isSidebarExpanded && < i 
                  onClick={() => setSidebarExpanded(!isSidebarExpanded)} 
                  className="ri-menu-3-line"></i>}
                  {isSidebarExpanded && <i 
                  onClick={() => setSidebarExpanded(!isSidebarExpanded)} 
                  className="ri-close-line"></i>}
                </div>
                <div className="menu-items">
                {menuItems.map((item, index) => {
                      const isActive = pathname === item.path;
                      return (
                        <div
                          className={`menu-item ${
                            isActive ? "active-menu-item" : ""
                          }`}
                          style={{
                            justifyContent: isSidebarExpanded
                              ? "flex-start"
                              : "center",
                          }}
                          key={index}
                          onClick={() => router.push(item.path)}
                        >
                          <i className={item.icon}></i>
                          <span>{isSidebarExpanded && item.name}</span>
                        </div>
                      );
                    })}
                </div>
                <div className="user-info flex justify-between items-center p-2">
                 {isSidebarExpanded && (
                  <div className="flex flex-col">
                    <span>{currentUser?.name}</span>
                    </div>
                 )}
                 <i className="logout ri-logout-box-line" onClick={onLogout}></i>
                </div>
              </div>
              <div className="body">{children}</div>
            </div>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
