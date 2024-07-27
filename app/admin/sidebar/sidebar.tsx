import { useState } from 'react'
import Image from 'next/image'

const navItems = [
    // {
    //     id: 1,
    //     icon: (
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    //         </svg>
    //     ),
    //     link: "dashboard",
    //     text: "Dashboard",
    //     isActive: false,
    // },
    {
        id: 2,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
        ),
        link: "users",
        text: "Users",
        isActive: false,
    },
    {
        id: 3,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
            </svg>
        ),
        link: "questions",
        text: "Questions",
        isActive: false,
    },
    {
        id: 4,
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
        ),
        link: "answers",
        text: "Answers",
        isActive: false,
    },
]

const Sidebar = () => {
    const [sidebarToggled, setSidebarToggled] = useState(false)

    const toggleSidebar = () => {
        setSidebarToggled(sidebarToggled => !sidebarToggled)
    }

    // Replace useSession with your custom session management logic here
    const session = { user: { name: "Admin", email: "admin@gmail.com", image: "/logo.png" } }

    return (
        <>
            <aside className={`
                fixed h-[100dvh] py-3 overflow-hidden lg:static w-11/12 max-w-[18rem] md:w-72 transition-all bg-white dark:bg-gray-950 shadow-lg shadow-gray-200/40 dark:shadow-gray-800/60 flex flex-col justify-between px-4 lg:transition-none ease-linear
                ${sidebarToggled ? "" : " -translate-x-full lg:-translate-x-0"}
            `}>
                <div className="min-h-max py-4">
                    <a href="#" className="flex items-center gap-x-3 font-semibold text-gray-800 dark:text-gray-200">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                        </span>
                        RampX
                    </a>
                </div>
                <div className="h-full pt-10">
                    <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                        {
                            navItems.map(navItem => (
                                <li key={navItem.id}>
                                    <a href={navItem.link} className={`
                                        flex items-center gap-x-4 px-5 py-3 rounded-2xl
                                        ${navItem.isActive ? "text-gray-100 dark:text-gray-900 bg-gray-900 dark:bg-gray-200" : "hover:bg-gray-200 dark:hover:bg-gray-800"}
                                    `}>
                                        {navItem.icon}
                                        {navItem.text}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {session && (
                    <div className="flex flex-col items-center py-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-x-2">
                            {session.user.image && (
                                <Image src={session.user.image} alt={session.user.name} className="w-20 h-30 rounded-full" height={100} width={100} />
                            )}
                            <div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{session.user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
            <button onClick={toggleSidebar} className="fixed bottom-5 left-5 lg:hidden p-2 bg-gray-800 text-white rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
                </svg>
            </button>
        </>
    )
}

export default Sidebar;
