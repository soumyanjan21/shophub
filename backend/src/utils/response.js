export const success = (data, message = "Success") => {
  return {
    status: "success",
    message,
    data,
  };
};

export const error = (message, code = 500) => {
  return {
    status: "error",
    code,
    message,
  };
};
