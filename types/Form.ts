export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  data: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
};

export type RegisterError = {
  message: string;
  field?: string;
};
