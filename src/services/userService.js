import { api } from "../hooks/api";

export const userService = {
  getBelusauriaUsers: async () => {
    try {
      const response = await api.get("/users", { params: { limit: 100 } });
      return response.data.filter((user) => user.email && user.email.endsWith("@belusauria.com"));
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    return api.post("/users", userData);
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    return api.patch(`/users/${id}`, userData);
  },
};

export const productService = {
  getBeluProducts: async () => {
    try {
      const response = await api.get("/products", { params: { limit: 100 } });
      return response.data.filter((product) => product.category && product.category.startsWith("Belu"));
    } catch (error) {
      throw error;
    }
  },
};

export const orderService = {
  getBelusauriaOrders: async () => {
    try {
      const ordersResponse = await api.get("/orders");
      const orders = ordersResponse.data;

      const usersResponse = await api.get("/users");
      const users = usersResponse.data;

      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });

      const belusauriaOrders = orders
        .filter((order) => {
          const user = userMap[order.user_id];
          return user && user.email && user.email.endsWith("@belusauria.com");
        })
        .map((order) => {
          const user = userMap[order.user_id];
          return {
            ...order,
            user_name: user.name,
            user_email: user.email,
          };
        });

      return belusauriaOrders;
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (orderData) => {
    return api.post("/orders", orderData);
  },

  getOrderById: async (orderId) => {
    try {
      const orderResponse = await api.get(`/orders/${orderId}`);
      const order = orderResponse.data;

      try {
        const userResponse = await api.get(`/users/${order.user_id}`);
        return {
          ...order,
          user_name: userResponse.data.name,
          user_email: userResponse.data.email,
        };
      } catch (userError) {
        return order;
      }
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    return api.patch(`/orders/${orderId}/status`, { status });
  },
};
