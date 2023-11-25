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
import { Home, Profile, Tables, Notifications, HangHoa, HangHoaChiTiet } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import DanhMuc from "./pages/dashboard/danhmuc/danhmuc";
import NhanHang from "./pages/dashboard/nhanhang/nhanhang";
import KhuyenMai from "./pages/dashboard/khuyenmai/khuyenmai";
import DanhMucChiTiet from "./pages/dashboard/danhmuc/danhmucchitiet";
import NhanHangChiTiet from "./pages/dashboard/nhanhang/nhanhangchitiet";
import KhuyenMaiChiTiet from "./pages/dashboard/khuyenmai/khuyenmaichitiet";
import NhanVien from "./pages/dashboard/nhanvien/nhanvien";
import KhachHang from "./pages/dashboard/khachhang/khachhang";
import SieuThi from "./pages/dashboard/sieuthi/sieuthi";
import Tinh from "./pages/dashboard/tinh";


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
        element: <DanhMuc />,
      },

      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Nhãn hàng",
        path: "/nhan-hang",
        element: <NhanHang />,
      },
      {
        icon: <TicketIcon {...icon} />,
        name: "Khuyến mãi",
        path: "/khuyen-mai",
        element: <KhuyenMai />,
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
        element: <NhanVien />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Khách hàng",
        path: "/khach-hang",
        element: <KhachHang />,
      },
      {
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Siêu thị",
        path: "/sieu-thi",
        element: <SieuThi />,
      },
      {
        icon: <MapIcon {...icon} />,
        name: "Tỉnh",
        path: "/tinh",
        element: <Tinh />,
      }
    ],
  },
  {
    layout: "dashboard",
    pages: [

      {
        path: "/hang-hoa/:id",
        element: <HangHoaChiTiet />,
      },
      {
        path: "/danh-muc/:id",
        element: <DanhMucChiTiet />,
      },
      {
        path: "/nhan-hang/:id",
        element: <NhanHangChiTiet />,
      },
      {
        path: "/khuyen-mai/:id",
        element: <KhuyenMaiChiTiet />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Trang chủ",
        path: "/",
        element: <Home />,
      },
    ],
  },

];

export default routes;
