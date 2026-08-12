import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
    return (
        <section id={id} className={`relative w-full px-6 md:px-12 lg:px-24 py-24 md:py-32 ${className}`}>
            {children}
        </section>
    );
}
