"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import React from "react"

export const Modal = ({
  children,
  open,
  onOpenChange,
  title,
  description,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  description?: string
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className={cn(!title && "hidden")}>{title}</DialogTitle>
          <DialogDescription className={cn(!description && "hidden")}>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
