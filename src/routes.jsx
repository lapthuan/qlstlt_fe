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
import { Home, Profile, Tables, Notifications, HangHoa, HangHoaChiTiet, KhuyenMais, KhuyenMaiChiTiet } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import DanhMuc from "./pages/dashboard/danhmuc/danhmuc";
import NhanHang from "./pages/dashboard/nhanhang/nhanhang";

import DanhMucChiTiet from "./pages/dashboard/danhmuc/danhmucchitiet";
import NhanHangChiTiet from "./pages/dashboard/nhanhang/nhanhangchitiet";

import NhanVien from "./pages/dashboard/nhanvien/nhanvien";
import NhanVienChiTiet from "./pages/dashboard/nhanvien/nhanvienchitiet";

import KhachHang from "./pages/dashboard/khachhang/khachhang";
import KhachHangChiTiet from "./pages/dashboard/khachhang/khachhangchitiet";

import DonHang from "./pages/dashboard/hoadon/hoadon";
import HoaDonChiTiet from "./pages/dashboard/hoadon/hoadonchitiet";

import PhieuNhapKho from "./pages/dashboard/phieunhapkho/phieunhapkho";
import PhieuNhapChiTiet from "./pages/dashboard/phieunhapkho/phieunhapchitiet";

import SieuThi from "./pages/dashboard/sieuthi/sieuthi";
import Tinh from "./pages/dashboard/tinh";
import SieuThiChiTiet from "./pages/dashboard/sieuthi/sieuthichitiet";
import ChiNhanh from "./pages/dashboard/chinhanh";
import ChiTietKhuyenMai from "./pages/dashboard/khuyenmai/chitietkhuyenmai";
import ChiTietHoaDon from "./pages/dashboard/hoadon/chitiethoadon";
import ChiTietPhieuNhap from "./pages/dashboard/phieunhapkho/chitietphieunhap";
import Account from './pages/dashboard/taikhoan/taikhoan';
import TaiKhoanChiTiet from './pages/dashboard/taikhoan/taikhoanchitiet';


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
        element: <KhuyenMais />,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "Đơn hàng",
        path: "/don-hang",
        element: <DonHang />,
      },
      {
        icon: <InboxIcon {...icon} />,
        name: "Phiếu nhập kho",
        path: "/phieu-nhap-kho",
        element: <PhieuNhapKho />,
      },
    
      {
        icon: <UsersIcon {...icon} />,
        name: "Khách hàng",
        path: "/khach-hang",
        element: <KhachHang />,
      },
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
        path: "/chi-tiet-khuyen-mai/:id",
        element: <ChiTietKhuyenMai />,
      },
      {
        path: "/nhan-vien/:id",
        element: <NhanVienChiTiet />,
      },
      {
        path: "/khach-hang/:id",
        element: <KhachHangChiTiet />,
      },
      {
        path: "/don-hang/:id",
        element: <HoaDonChiTiet />,
      },
      {
        path: "/phieu-nhap-kho/:id",
        element: <PhieuNhapChiTiet />,
      },
      {
        path: "/sieu-thi/:id",
        element: <SieuThiChiTiet />,
      },
      {
        path: "/chi-tiet-don-hang/:id",
        element: <ChiTietHoaDon />,
      },
      {
        path: "/chi-tiet-phieu-nhap/:id",
        element: <ChiTietPhieuNhap />,
      },
      {
        path: "/tai-khoan/:id",
        element: <TaiKhoanChiTiet />,
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
