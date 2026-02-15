'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchBar = () => {
    return (
        <div className='max-w-md w-full flex items-center gap-2'>
            {/* <div className='max-w-sm w-full flex items-center gap-2 bg-stone-100 rounded-md px-2 shadow-inner border'> */}
            <Search className='h-4 w-4 text-zinc-400' />
            <Input type="search" placeholder="Search for projects, people or commits..." className='h-8 w-full border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-zinc-100' />
        </div>
    )
}

export default SearchBar
