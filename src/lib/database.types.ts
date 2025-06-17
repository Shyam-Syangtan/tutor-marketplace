// src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'tutor'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string
          avatar_url?: string
          role?: 'student' | 'tutor'
          // created_at is set by the database
        }
        Update: {
          full_name?: string
          avatar_url?: string
          role?: 'student' | 'tutor'
        }
      }
      lessons: {
        Row: {
          id: number
          student_id: string
          tutor_name: string
          scheduled_at: string
          created_at: string
        }
        Insert: {
          student_id: string
          tutor_name: string
          scheduled_at: string
          // created_at is set by the database
        }
        Update: {
          student_id?: string
          tutor_name?: string
          scheduled_at?: string
        }
      }
      // add additional table definitions here
    }
    Views: Record<string, unknown>
    Functions: Record<string, unknown>
    Enums: Record<string, unknown>
    // add other schema elements (RPC, etc.) if needed
  }
}
