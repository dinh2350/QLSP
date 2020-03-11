import {
  callApi,
  getListProduct,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct
} from "./utils/callapi.js";
import Product from "./models/Product.js";

const renderHTML = () => {
  let content = `
    <div class="card text-white bg-dark">
        <div class="card-body">
            <h4 class="card-title">Danh sách sản phẩm</h4>
            <div class='container'>
                <div class="row">
                <div class="col-md-3">
                    <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
                </div>
                <div class="col-md-3">
                    <input id="tenSP" class="form-control" placeholder="Tên SP" />
                </div>
                <div class="col-md-3">
                    <input id="gia" class="form-control" placeholder="Giá" />
                </div>
                <div class="col-md-3">
                    <input id="hinhAnh" class="form-control" placeholder="Link hình" />
                </div>
                </div>
                <br />
                <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
                <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
            </div>
            </div>
        </div>
        <div class="container">
            <table class="table">
            <thead>
                <tr>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Giá </th>
                <th>Hình ảnh</th>
                <th></th>
                </tr>
            </thead>
            <tbody id="tblDanhSachSanPham">

            </tbody>
            </table>
        </div>
    `;

  document.getElementById("root").innerHTML = content;
};

const renderTable = () => {
  callApi("SanPham", "GET", null)
    .then(result => {
      let contentHTML = "";
      /**
       * 0. Duyet mang
       * 1. Cộng dồn vào biến contentHTML
       *    Tạo từng dòng thẻ <tr> => <td>
       * 2. DOM đến tbody gán contentHTML ra
       */
      result.data.map(item => {
        contentHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.tenSP}</td>
                    <td>${item.gia}</td>
                    <td>
                        <img src="${item.hinhAnh}" width="50" />
                    </td>
                    <td>
                        <button class="btn btn-info" onclick="suaSanPham(${item.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="xoaSanPham(${item.id})">Xóa</button>
                    </td>
                </tr>
            `;
      });
      document.getElementById("tblDanhSachSanPham").innerHTML = contentHTML;
    })
    .catch(err => {
      console.log(err);
    });
};

renderTable();
renderHTML();

/**
 * Chuc nang them Product
 */
document.getElementById("btnThem").addEventListener("click", function() {
  // Lấy data từ người dùng nhập vào 3 ô input
  const tenSP = document.getElementById("tenSP").value;
  const gia = document.getElementById("gia").value;
  const hinhAnh = document.getElementById("hinhAnh").value;

  const product = new Product(tenSP, gia, hinhAnh);
  callApi("SanPham", "POST", product)
    .then(result => {
      alert("Them thanh cong");
      renderTable();
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * Xoa San Pham
 */
window.xoaSanPham = xoaSanPham;
function xoaSanPham(id) {
  callApi(`SanPham/${id}`, "DELETE", null)
    .then(result => {
      alert("Xoa thanh cong");
      renderTable();
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Sua san pham
 */
window.suaSanPham = suaSanPham;
function suaSanPham(id) {
  getProductById(id)
    .then(result => {
      //DOM 4 ô input gán value vào cho nó
      document.getElementById("maSP").value = result.data.id;
      document.getElementById("tenSP").value = result.data.tenSP;
      document.getElementById("gia").value = result.data.gia;
      document.getElementById("hinhAnh").value = result.data.hinhAnh;
    })
    .catch(err => {
      console.log(err);
    });
}
/**
 * Chuc nang cap nhat
 */
document.getElementById("btnCapNhat").addEventListener("click", function() {
  const maSP = document.getElementById("maSP").value;
  const tenSP = document.getElementById("tenSP").value;
  const gia = document.getElementById("gia").value;
  const hinhAnh = document.getElementById("hinhAnh").value;

  const product = new Product(tenSP, gia, hinhAnh);

  updateProduct(maSP, product)
    .then(result => {
      alert("Cap nhat thanh cong");
      renderTable();
    })
    .catch(err => {
      console.log(err);
    });
});
