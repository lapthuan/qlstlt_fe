import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import routesAdmin from "@/routesAdmin";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

import { HangHoaChiTiet } from "@/pages/dashboard";
import { useEffect } from "react";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('user');

    if (!isLoggedIn) {
      navigate("/dangnhap")
    }
  }, [])
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={User?.Quyen == 0 ? routes : routesAdmin}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>

          {
            User?.Quyen == 0 ?


              routes.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              ) :
              routesAdmin.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map(({ path, element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )

          }

        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
