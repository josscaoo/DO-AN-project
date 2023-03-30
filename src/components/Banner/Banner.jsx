import React from "react";
import styled from "styled-components";

const Main = styled.div`
  img {
    /* display: flex; */
    width: 100%;
  }
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Banner = () => {
  return (
    <Main>
      <img
        src="https://cdn.didongviet.vn/pub/media/mageplaza/bannerslider/banner/image/1/_/1_1280x109.jpg"
        alt=""
      />
    </Main>
  );
};

export default Banner;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const Main = styled.div`
//   img {
//     width: 100%;
//   }
// `;

// const Banner = () => {
//   const [imageUrl, setImageUrl] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       const response = await axios.get(
//         `http://localhost:3001/products/${40}`, // đường dẫn tới sản phẩm có id là 40
//         { responseType: "arraybuffer" } // yêu cầu server trả về ArrayBuffer
//       );
//       const blob = new Blob([response.data], { type: "image/jpeg" }); // tạo Blob object từ ArrayBuffer
//       const url = URL.createObjectURL(blob); // tạo URL từ Blob object
//       setImageUrl(url);
//     };
//     fetchImage();
//   }, []);
//   return (
//     <Main>
//       <img src={imageUrl} alt="" />
//     </Main>
//   );
// };

// export default Banner;
