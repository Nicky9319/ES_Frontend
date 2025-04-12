import React from 'react';
import LeftSlider from '../components/leftSlider';
import RightSlider from '../components/rightSlider';

function EsEvents() {
    return (
        <div className="flex h-screen bg-gray-100">
            <LeftSlider />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            ES Events
                        </h1>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                        </div>
                    </div>
                </main>
            </div>
            <RightSlider />
        </div>
    );
}

export default EsEvents;