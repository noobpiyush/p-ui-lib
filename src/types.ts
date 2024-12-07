import { ReactNode } from 'react'

export interface BaseComponentProps {
  children?: ReactNode
  className?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export interface ShinyButtonProps extends ButtonProps {
  shine?: boolean
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseComponentProps {
  label?: string
  error?: string
}