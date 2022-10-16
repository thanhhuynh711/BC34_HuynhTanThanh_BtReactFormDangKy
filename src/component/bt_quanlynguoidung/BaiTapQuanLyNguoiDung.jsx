import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDanhSachNguoiDung from './TableDanhSachNguoiDung'

export default class BaiTapQuanLyNguoiDung extends Component {
  render() {
    return (
      <div className='container text-left text-lg'>
        <FormDangKy />
        <TableDanhSachNguoiDung />
      </div>
    )
  }
}
