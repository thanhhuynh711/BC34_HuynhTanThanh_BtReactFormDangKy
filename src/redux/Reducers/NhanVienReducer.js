import { isDisabled } from "@testing-library/user-event/dist/utils";

const stateDefault = {
  dsSinhVien: [],
  sinhVienUpdate: "",
  ifNone: true,
  dangKy: "Thêm Sinh Viên",
};

export const NhanVienReducer = (state = stateDefault, action) => {
  const { type, payload } = action;
  switch (type) {
    case "THEM_SINH_VIEN": {
      let dsSinhVien = [...state.dsSinhVien];

      const sinhVienNew = dsSinhVien.find(
        (sinhVien) => sinhVien.taiKhoan == payload.sinhVien.taiKhoan
      );

      if (sinhVienNew) {
        alert("Mã sinh viên đã tồn tại !");
      } else {
        dsSinhVien.push(payload.sinhVien);
      }

      return { ...state, dsSinhVien };
    }

    case "XOA_SINH_VIEN": {
      let dsSinhVien = [...state.dsSinhVien];

      dsSinhVien = dsSinhVien.filter(
        (sinhVien) => sinhVien.taiKhoan != payload
      );

      return { ...state, dsSinhVien };
    }

    case "LAY_SINH_VIEN": {
      let dsSinhVien = [...state.dsSinhVien];

      let sinhVienTam = dsSinhVien.find(
        (sinhVien) => sinhVien.taiKhoan == payload
      );

      return {
        ...state,
        sinhVienUpdate: sinhVienTam,
        ifNone: false,
        dangKy: "Cập Nhật",
      };
    }

    case "UPDATE_SINH_VIEN": {
      let dsSinhVien = [...state.dsSinhVien];

      let sinhVienNew = dsSinhVien.find((sinhVien) => sinhVien == payload);

      // if (sinhVienNew) {
      //   sinhVienNew.taiKhoan = isDisabled;
      // }

      return {
        ...state,
        sinhVienNew,
        ifNone: true,
        sinhVienUpdate: "",
        dangKy: "Đăng ký",
      };
    }

    default:
      return { ...state };
  }
};
