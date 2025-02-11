import { useState } from 'react';
import ManageMovie from "../pages/backoffice/ManageMovie.tsx";
import {ManageSessionCard} from "../features/movies-list/components/ManageSessionCard.tsx";
import ManageSession from "../pages/backoffice/ManageSession.tsx";
import ManageUser from "../pages/backoffice/ManageUser.tsx";

const SubNavigation = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const tabs = [
        { id: 'tab1', name: 'Gestion films' },
        { id: 'tab2', name: 'Gestion séances' },
        { id: 'tab3', name: 'Gestion utilisateurs' },
    ];

    return (
        <div className="w-full border-b border-gray-200">
            <nav className="flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              py-4 px-1 relative font-medium text-sm
              ${
                            activeTab === tab.id
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }
            `}
                    >
                        {tab.name}
                        {activeTab === tab.id && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                        )}
                    </button>
                ))}
            </nav>

            <div className="mt-4">
                {activeTab === 'tab1' && <ManageMovie></ManageMovie>}
                {activeTab === 'tab2' && <ManageSession></ManageSession>}
                {activeTab === 'tab3' && <ManageUser></ManageUser> }
            </div>
        </div>
    );
};

export default SubNavigation;