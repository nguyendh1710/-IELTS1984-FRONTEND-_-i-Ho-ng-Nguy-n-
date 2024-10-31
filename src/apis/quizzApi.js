import axios from 'axios';

  export const getQuizz = async () => {
    try {
      const response = await axios.get('https://672380ea493fac3cf24b1cda.mockapi.io/verdhn/qatest/qa'); // Địa chỉ API hợp lệ
      return response.data; // Trả về dữ liệu đã lấy
    } catch (error) {
      console.error(error.message); // Xử lý lỗi
      throw error; // Ném lỗi ra để xử lý ở nơi gọi hàm nếu cần
    }
  };