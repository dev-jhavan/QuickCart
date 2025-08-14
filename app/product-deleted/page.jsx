'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ProductDeleted = () => {
  const { router } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/seller/products')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='' />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">Product deleted! </div>
    </div>
  )
}

export default ProductDeleted