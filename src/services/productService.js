import { api } from "../hooks/api";

export function productService() {
  return {
    getAll: async () => {
      const response = await api.get("products", {
        params: {
          skip: 0,
          limit: 100,
        },
      });
      return response.data;
    },

    uploadImage: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    create: async (data) => {
      const response = await api.post("products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    getById: async (id) => {
      const response = await api.get(`products/${id}`);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`products/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  };
}
