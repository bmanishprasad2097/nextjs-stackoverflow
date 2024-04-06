"use client"
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';
import React, { useState } from 'react'

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { assert } from 'console';
import { themes } from '@/constants';
  
const Theme = () => {
    const {mode, setMode } = useTheme();
    return (
        <Menubar className='relative border-nopne bg-transparent shadow-none'>
            <MenubarMenu>
                <MenubarTrigger className='focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200'>
                {mode==='light' ? (<Image src="/assets/icons/sun.svg" alt='sun' width={20} height={20}/>) : 
                                  (<Image src="/assets/icons/moon.svg" alt='moon' width={20} height={20}/>)}
                </MenubarTrigger>
                <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg0-dark-300 '>
                    {themes.map((item)=>(
                        <MenubarItem className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400' key={item.value} onClick={()=>{
                           setMode(item.value) 
                           if(item.value !== 'system'){
                            localStorage.theme = item.value
                           }else{
                            localStorage.removeItem('theme');
                           }
                        }}>
                            <Image src={item.icon} alt={item.value} width={16} height={16} className={`${mode === item.value && 'active-theme'}`}/>
                            <p className={`body-semibold text-light-500 ${ mode === item.value? 'text-primary-500' : 'text-dark100_light900'}`}>{item.label}</p>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default Theme