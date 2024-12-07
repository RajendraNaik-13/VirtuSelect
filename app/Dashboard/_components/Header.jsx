"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
    const path = usePathname();
    
    const menuItems = [
        { label: 'Dashboard', href: '/Dashboard' },
        { label: 'Questions', href: '/Dashboard/questions' },
        { label: 'Upgrade', href: '/Dashboard/upgrade' },
        { label: 'How It Works?', href: '/Dashboard/how' }
    ];

    return (
        <div className='flex p-4 items-center justify-between bg-black shadow-sm'>
            <Image src={'/logo.svg'} width={40} height={30} alt='logo'/> 
            <ul className='hidden md:flex gap-6'>
                {menuItems.map((item) => (
                    <Link 
                        key={item.href}
                        href={item.href}
                        className={`
                            hover:text-primary 
                            hover:font-bold 
                            transition-all 
                            cursor-pointer 
                            ${path === item.href ? 'text-primary font-bold' : ''}
                        `}
                    >
                        {item.label}
                    </Link>
                ))}
            </ul>
            <UserButton/>
        </div>
    )
}

export default Header