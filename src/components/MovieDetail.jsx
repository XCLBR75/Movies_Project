import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import Movies from "./components/Movies";
// import WatchPage from "./components/WatchPage";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import AddAdmin from "./components/AddAdmin";
// import AdminPage from "./components/AdminPage";
// import Favorites from "./components/Favorites";
// import AdminSidebar from "./components/admin/AdminSdebar";
function MovieDetail() {
  return (
    <div>
      <h1 className="p-2 bg-gray-600 text-lg text-center border-2 rounded-lg border-black text-white">
        Ám kịch
      </h1>
      <div className="right flex items-center text-white bg-gray-800 p-2 mb-2 rounded-lg box-border text-center">
        <div class="w-[25%] h-64 p-1 bg-black">
          <img
            src="https://image.lag.vn/upload/news/18/08/08/bg_01_nie60646_PIGU.jpg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div className="left w-[75%] ml-[10px]">
          <div className=" name_oder p-[2px] mb-5"> Ám kịch</div>
          <div className="gener_list p-[2px] mb-5 flex justify-center">
            <p className="mr-4">huyền bí</p>
            <p className="mr-4">kinh dị</p>
          </div>
          {/* nếu status trong database là 1 là hoàn thành */}
          <div className="status p-[2px] mb-5">Hoàn thành</div>
          <div className=" year p-[2px] mb-5"> 2022</div>
        </div>
      </div>

      <div className="body">
        <div className="list-episo bg-gray-800 p-4 mb-4 rounded-md box-borde">
          <div className="text-white font-bold text-lg mb-4 border-b-2 border-dashed border-gray-700 pb-4">
            <span className="text-white">Danh sách tập</span>
            <br className="text-white"/>
            <div className="flex flex-wrap justify-center max-h-300 overflow-auto overflow-x-hidden pr-10">
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                1
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                2
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                3
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                4
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                5
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                6
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                7
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                8
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                9
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                10
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                11
              </Link>
              <Link
                to="/watchPage"
                className="w-1/6 border-2 border-gray-600 p-2 m-1 text-center"
              >
                12
              </Link>
            </div>
          </div>
        </div>

        <div className="desc bg-gray-800 p-4 mb-4 rounded-lg box-border text-white">
          <div><h2>Nội dung</h2></div>
          <div>
            <p>truyện ma ngắn phong kể kịch Nhật Bản</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
