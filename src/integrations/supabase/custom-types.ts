
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      wedding_data: {
        Row: {
          id: string
          user_id: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      guest_wishes: {
        Row: {
          id: string
          name: string
          message: string
          variant: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          message: string
          variant: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          message?: string
          variant?: string
          created_at?: string
        }
      }
    }
  }
}
