import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ENDPOINTS } from '@/lib/endpoints'
import { RegisterInputs, RegisterResponse } from '@/types/Form'
import axios from 'axios'


const registerUser = async (userData: Omit<RegisterInputs, 'confirmPassword'>): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, userData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
    throw new Error('An unexpected error occurred')
  }
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation<RegisterResponse, Error, Omit<RegisterInputs, 'confirmPassword'>>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registration successful:', data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Registration error:', error.message)
    },
  })
}
