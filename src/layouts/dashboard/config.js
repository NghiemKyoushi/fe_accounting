'use client'

import BarChartIcon from '@mui/icons-material/BarChart';import { SvgIcon } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FaceIcon from '@mui/icons-material/Face';
import LoginIcon from '@mui/icons-material/Login';
import MenuBookIcon from '@mui/icons-material/MenuBook';
export const items = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <BarChartIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tạo Hóa Đơn',
    path: '/invoice',
    icon: (
      <SvgIcon fontSize="small">
        <DescriptionIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Quản Lý Hóa Đơn',
    path: '/invoiceManagement',
    icon: (
      <SvgIcon fontSize="small">
        <FileCopyIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Sổ Thu Chi',
    path: '/accountingBook',
    icon: (
      <SvgIcon fontSize="small">
        <MenuBookIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tài khoản',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <FaceIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Đăng nhập',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LoginIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];