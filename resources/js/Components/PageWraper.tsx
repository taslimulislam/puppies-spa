import { type ReactNode } from 'react';

export function PageWraper({ children }: { children: ReactNode }) {
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
            {children}
        </div>
    )
}