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
          role: 'student' | 'tutor'
          // add other columns you have in the profiles table
        }
        Insert: {
          id?: string
          role: 'student' | 'tutor'
          // same fields as Row, but optional when inserting
        }
        Update: {
          id?: string
          role?: 'student' | 'tutor'
          // all fields optional when updating
        }
      }
      listings: {
        Row: {
          id: number
          tutor_id: string
          title: string
          price: number
          // add other columns of your listings table
        }
        Insert: {
          tutor_id: string
          title: string
          price: number
          // omit id if it's auto-generated
        }
        Update: {
          tutor_id?: string
          title?: string
          price?: number
          // all optional
        }
      }
      // add additional table definitions here
    }
    Views: {}
    Functions: {}
    Enums: {}
    // add other schema elements (RPC, etc.) if needed
  }
}
