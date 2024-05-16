import ProtectedRoute from "../../components/protected-route";
import SideNav from "../../components/side-nav";

export default function Layout({children}: {children: React.ReactNode}){
    return (
        <ProtectedRoute>
            <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <SideNav />
                <div 
                    className='overflow-y-auto flex-1'
                    style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
                >
                    {children}
                </div>
            </main>
        </ProtectedRoute>
    );
}