const express = require("express");
const fs = require("fs");
const app = express();

// Đường dẫn đến thư mục chứa các ảnh
const imagePath = "./puplic/images";

// Thêm middleware để có thể đọc được dữ liệu gửi lên từ client
app.use(express.json());

// Định nghĩa route để truy cập các ảnh
app.use("/images", express.static(imagePath));

// Định nghĩa route để ghi các ảnh vào thư mục
app.post("/images", (req, res) => {
  // Lấy dữ liệu gửi lên từ client
  const imageData = req.body;

  // Tạo tên file từ timestamp hiện tại và định dạng ảnh
  const fileName = `${Date.now()}.${imageData.type.split("/")[1]}`;

  // Tạo đường dẫn đến file ảnh mới được tạo
  const imagePathWithName = `${imagePath}/${fileName}`;

  // Ghi dữ liệu vào file
  fs.writeFile(imagePathWithName, imageData.data, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to save the image");
    } else {
      // Trả về đường dẫn đến file ảnh để client có thể truy cập
      res.send(`http://localhost:3000/images/${fileName}`);
    }
  });
});

// Khởi tạo máy chủ và lắng nghe kết nối tới cổng 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
