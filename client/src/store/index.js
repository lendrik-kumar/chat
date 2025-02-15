import { create } from'zustand'
import { authSlice } from './slices/authSlice'

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    
}))