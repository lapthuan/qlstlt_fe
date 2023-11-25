import React from "react";
import {
  Typography,

} from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import useAsync from "@/hook/useAsync";
import ServiceOrder from "@/service/ServiceOrder";
import ServiceEmployee from "@/service/ServiceEmployee";
import ServiceCustomer from "@/service/ServiceCustomer";
import ServiceHangHoa from "@/service/ServiceHangHoa";

export function Home() {
  const { data: Order } = useAsync(() => ServiceOrder.getOrderDetail())
  const { data: NhanVien } = useAsync(() => ServiceEmployee.getAllEmployee())
  const { data: NguoiDung } = useAsync(() => ServiceCustomer.getAllCustomer())
  const { data: HangHoa } = useAsync(() => ServiceHangHoa.getAllHangHoa())
  const tongThanhTien = Order.reduce((tong, hoa) => tong + hoa.ThanhTien, 0)

  const statisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Tổng thu nhập",
      value: tongThanhTien + " vnđ",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Nhân viên",
      value: NhanVien.length,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "Người dùng",
      value: NguoiDung.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ArchiveBoxIcon,
      title: "Sales",
      value: HangHoa.length,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}

          />
        ))}
      </div>


    </div>
  );
}

export default Home;
