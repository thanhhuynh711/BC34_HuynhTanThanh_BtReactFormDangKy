import React, { Component } from "react";
import { connect } from "react-redux";

class FormDangKy extends Component {
  state = {
    sinhVien: {
      taiKhoan: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    error: {
      taiKhoan: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    isValid: true,
  };

  static getDerivedStateFromProps(newProps, currentState) {
    if (
      newProps.sinhVienUpdate != "" &&
      newProps.sinhVienUpdate.taiKhoan != currentState.sinhVien.taiKhoan
    )
      return { ...currentState, sinhVien: newProps.sinhVienUpdate };
  }

  changeValue = (event) => {
    const { sinhVien, error } = this.state;
    const { value, name, title } = event.target;

    if (value == "") {
      error[name] = `${title} Không được rỗng !`;
    } else {
      error[name] = "";
    }

    const dataType = event.target.getAttribute("data-type");

    if (dataType == "email") {
      let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (regexEmail.test(value) == false) {
        error[name] = `Không đúng định dạng Email !`;
      } else {
        error[name] = "";
      }
    }
    if (dataType == "number") {
      let regexNumber = /^[0-9]+$/;
      if (regexNumber.test(value) == false) {
        error[name] = `${title} Vui lòng nhập số !`;
      } else {
        error[name] = "";
      }
    }

    sinhVien[name] = value;

    this.setState({
      sinhVien,
      error,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { taiKhoan, hoTen, soDienThoai, email } = this.state.sinhVien;
    let taiKhoanErr = this.state.error.taiKhoan;
    let hoTenErr = this.state.error.taiKhoan;
    let soDienThoaiErr = this.state.error.taiKhoan;
    let emailErr = this.state.error.taiKhoan;

    if (
      taiKhoan != "" &&
      hoTen != "" &&
      soDienThoai != "" &&
      email != "" &&
      taiKhoanErr == "" &&
      hoTenErr == "" &&
      soDienThoaiErr == "" &&
      emailErr == ""
    )
      if (this.props.ifNone) {
        this.props.dispatch({
          type: "THEM_SINH_VIEN",
          payload: { sinhVien: this.state.sinhVien },
        });
      } else {
        this.props.dispatch({
          type: "UPDATE_SINH_VIEN",
          payload: this.state.sinhVien,
        });
      }

    this.setState({
      sinhVien: {
        taiKhoan: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      },
    });
  };

  render() {
    const { taiKhoan, hoTen, soDienThoai, email } = this.state.error;
    const { dangKy, ifNone } = this.props;
    return (
      <div className="row ">
        <div className="col-12 p-2 bg-dark">
          <span className="text-white font-bold">Thông Tin Sinh Viên</span>
        </div>

        <form className="col-12 row" onSubmit={this.onSubmit}>
          <div className="col-6">
            <label>Mã Sinh Viên</label>
            <input
              disabled={!ifNone}
              value={this.state.sinhVien.taiKhoan}
              data-type="number"
              title="Mã sinh viên"
              name="taiKhoan"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{taiKhoan}</small>
          </div>

          <div className="col-6">
            <label>Họ tên</label>
            <input
              value={this.state.sinhVien.hoTen}
              title="Họ tên"
              name="hoTen"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{hoTen}</small>
          </div>

          <div className="col-6">
            <label>Số điện thoại</label>
            <input
              value={this.state.sinhVien.soDienThoai}
              data-type="number"
              title="Số điện thoại"
              name="soDienThoai"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{soDienThoai}</small>
          </div>
          <div className="col-6">
            <label>Email</label>
            <input
              value={this.state.sinhVien.email}
              data-type="email"
              title="Email"
              name="email"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{email}</small>
          </div>

          <button className="btn btn-success m-2">{dangKy}</button>

          {/* <button className="btn btn-primary m-2">Cập nhật</button> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dsSinhVien: state.NhanVienReducer.dsSinhVien,
    sinhVienUpdate: state.NhanVienReducer.sinhVienUpdate,
    ifNone: state.NhanVienReducer.ifNone,
    dangKy: state.NhanVienReducer.dangKy,
  };
};

export default connect(mapStateToProps, null)(FormDangKy);
