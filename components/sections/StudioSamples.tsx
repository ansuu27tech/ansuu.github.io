'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import SectionWrapper from '../ui/SectionWrapper';

const CircularGallery = dynamic(() => import('../ui/CircularGallery'), { ssr: false });

const studioItems = [
    { image: '/amjath talks.jpeg', text: 'Amjath Talks' },
    { image: '/big bites.jpeg', text: 'Big Bites' },
    { image: '/nuoro fashion.jpeg', text: 'Nuoro Fashion' },
    { image: '/perfume.jpeg', text: 'Perfume Ad' },
    { image: '/dr wagon.jpeg', text: 'Dr Wagon' },
    { image: '/shawerma .jpeg', text: 'Shawerma' },
];

export default function StudioSamples() {
    return (
        <SectionWrapper id="studio-samples" className="bg-transparent !py-0 overflow-hidden">
            {/* Header */}
            <div className="pt-24 pb-12 px-6 md:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <motion.p
                        className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Creative
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl font-heading font-bold leading-none text-white"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Studio
                        <br />
                        <span className="text-gray-300">Samples</span>
                    </motion.h2>
                </div>
                <motion.p
                    className="text-gray-600 text-sm max-w-xs leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    A selection of design work crafted at Pixelmint Studio — spanning social media, brand visuals, and advertising.
                </motion.p>
            </div>

            {/* Gallery */}
            <motion.div
                className="w-full"
                style={{ height: '520px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <CircularGallery
                    items={studioItems}
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollSpeed={2}
                    scrollEase={0.05}
                />
            </motion.div>

            {/* Bottom padding */}
            <div className="pb-24" />
        </SectionWrapper>
    );
}
