// LocalService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3002/local/all-locals"; // Adjust as necessary
const token = localStorage.getItem("authToken");
const LocalService = {
  getAllLocals: async () => {
    try {
      const response = await axios.get("http://localhost:3002/local/all-locals",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

      );
      return response.data;
    } catch (error) {
      console.error("Error fetching locals:", error);
      throw error;
    }
  },
};

export default LocalService;