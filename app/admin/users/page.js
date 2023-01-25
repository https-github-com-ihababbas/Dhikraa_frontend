"use client";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "app/contexts/auth.js";
import axios from "axios";
import LoginForm from "../../login/page";
export default function Users() {
  const { tokens, refresh } = useContext(AuthContext);
  const [female, setFemale] = useState(0);
  const [male, setMale] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [percentMale, setPercentMale] = useState(0);
  const [percentFemale, setPercentFemale] = useState(0);
  const [users, setUsers] = useState([]);
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [username, setUsername] = useState(null)







  const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/users/`;
  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)
    const access = localStorage.getItem("access");
    setAccessString(access)
    const admin = localStorage.getItem("username")
    setUsername(admin)
    refresh(refresh_string);

    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };




    axios
      .get(url, config)
      .then((result) => {
        setUsers(result.data);
        console.log(result.data);
        femaleMale(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const femaleMale = (items) => {
    let female = 0,
      male = 0,
      admin = 0;
    let x = items.map((item) => {
      if (item["gender"] == "female") {
        female++;
      } else if (item["gender"] == "male") {
        male++;
      } else {
        admin++;
      }
      return [female, male];
    });
    setFemale(female);
    setMale(male);
    setAdmin(admin);
  };


  return (
    <>{
      tokens && username == "admin" ? <div className="py-10 bg-[#e5f2c4]">
        <Link
          href="/admin"
          className="flex w-[14%] px-8 py-2 mb-4 ml-8 text-lg text-black shadow-2xl rounded-3xl hover:text-[#e5f2c4] hover:bg-[#3a451c] shadow-gray-500 text-center bg-[#949e7b] "
        >
          {" "}
          عودة لصفحة الرئيسية
        </Link>
        <div class="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden items-center">
          <div class="relative bg-blueGray-100 w-full">
            <div class="relative pt-16 pb-32 bg-lightBlue-500 w-full">
              <div class="px-4 md:px-6 mx-auto w-full">
                <div>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                        <div class="flex-auto px-4 bg-[#949e7b] rounded-xl">
                          <div class="flex flex-wrap mt-4">
                            <div class="relative w-auto pl-4 mt-4 flex-initial">
                              <div class="text-white px-3 my-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-red-500">
                                <i class="far fa-chart-bar"></i>
                                {((female / users.length) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1 text-right ">
                              <h5 class="text-[#252f0b] uppercase font-bold text-2xl border-b-2 border-[#252f0b] mb-2">
                                الإناث
                              </h5>
                              <span class="font-bold text-xl  text-[#252f0b]  text-[#252f0b]">
                                {female}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                        <div class="flex-auto px-4 bg-[#949e7b] rounded-xl">
                          <div class="flex flex-wrap mt-4">
                            <div class="relative w-auto pl-4 mt-4 flex-initial">
                              <div class="text-white px-3 my-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-blue-600">
                                <i class="far fa-chart-bar"></i>
                                {((male / users.length) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1 text-right ">
                              <h5 class="text-[#252f0b] uppercase font-bold text-2xl border-b-2 border-[#252f0b] mb-2">
                                الذكور
                              </h5>
                              <span class="font-bold text-xl  text-[#252f0b] ">
                                {male}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                        <div class="flex-auto px-4 bg-[#949e7b] rounded-xl">
                          <div class="flex flex-wrap mt-4">
                            <div class="relative w-auto pl-4 mt-4 flex-initial">
                              <div class="text-white px-3 my-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-[#3a451c]">
                                <i class="far fa-chart-bar"></i>
                                {((admin / users.length) * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1 text-right ">
                              <h5 class="text-[#252f0b] uppercase font-bold text-2xl border-b-2 border-[#252f0b] mb-2">
                                المسؤولون
                              </h5>
                              <span class="font-bold text-xl  text-[#252f0b] ">
                                {admin}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                        <div class="flex-auto px-4 bg-[#949e7b] rounded-xl">
                          <div class="flex flex-wrap mt-4">
                            <div class="relative w-auto pl-4 mt-4 flex-initial">
                              <div class="text-white px-3 my-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-[#252f0b]">
                                <i class="far fa-chart-bar"></i>
                                100%
                              </div>
                            </div>
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1 text-right  ">
                              <h5 class="text-[#252f0b] uppercase font-bold text-3xl border-b-2 border-[#252f0b] mb-2">
                                المستخدمون
                              </h5>
                              <span class="font-bold text-xl text-[#252f0b] ">
                                {users.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        :
        <LoginForm />
    }

    </>
  );
}
