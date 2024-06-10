import { Icons } from '@repo/ui/icons'
import SideNav from '../../components/side-nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen relative">
      <Icons.menu className="md:hidden cursor-pointer h-[1.8rem] w-[1.8rem] absolute right-4 top-4" />
      {/* <Icons.x className="md:hidden cursor-pointer h-[1.8rem] w-[1.8rem] absolute right-4 top-4" /> */}

      <SideNav />
      <div className="flex-1" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {children}
      </div>
    </main>
  )
}
