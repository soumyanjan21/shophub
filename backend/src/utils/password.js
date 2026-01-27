// import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  // return await bcrypt.hash(password, 10);
  return `hashed_${password}`; // Mock
};

export const comparePassword = async (password, hash) => {
  // return await bcrypt.compare(password, hash);
  return `hashed_${password}` === hash; // Mock
};
