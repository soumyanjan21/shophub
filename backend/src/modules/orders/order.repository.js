export const createOrder = async (orderData) => {
  return { id: 101, ...orderData, status: "pending" };
};

export const findOrdersByUser = async (userId) => {
  return [{ id: 101, userId, total: 500 }];
};
