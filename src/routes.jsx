import {
  HomeIcon,
  ShoppingCartIcon,
  InformationCircleIcon,
  ServerStackIcon,
  TagIcon,
  ShoppingBagIcon,
  RectangleStackIcon,
  TicketIcon,
  DocumentIcon,
  InboxIcon,
  UserGroupIcon,
  UsersIcon,
  MapIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, HangHoa } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Trang chủ",
        path: "/home",
        element: <Home />,
      },

      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "Hàng hóa",
        path: "/hang-hoa",
        element: <HangHoa />,
      },
      {
        icon: <TagIcon {...icon} />,
        name: "Danh mục",
        path: "/danh-muc",
        element: <Notifications />,
      },

      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Nhãn hàng",
        path: "/nhan-hang",
        element: <Notifications />,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "Khuyến mãi",
        path: "/khuyen-mai",
        element: <Tables />,
      },

    ],
  },
  {
    title: "Quản lí",
    layout: "dashboard",
    pages: [
      {
        icon: <DocumentIcon {...icon} />,
        name: "Đơn hàng",
        path: "/don-hang",
        element: <SignIn />,
      },
      {
        icon: <InboxIcon {...icon} />,
        name: "Phiếu nhập kho",
        path: "/phieu-nhap-kho",
        element: <SignUp />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Nhân viên",
        path: "/nhan-vien",
        element: <SignUp />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Khách hàng",
        path: "/khach-hang",
        element: <SignUp />,
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Siêu thị",
        path: "/sieu-thi",
        element: <SignIn />,
      },
      {
        icon: <MapIcon {...icon} />,
        name: "Tỉnh",
        path: "/tinh",
        element: <SignUp />,
      }
    ],
  },

];

export default routes;
