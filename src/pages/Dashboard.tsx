
import Activity from "../components/Dashboard/Activity";
import Project from "../components/Dashboard/Project";
import Margin from "../components/Dashboard/Margin";
import Home from "../components/Dashboard/Home";
import { useState, useEffect } from 'react';
import TitlePage from "../utils/Title";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'activities'>('home');

    const setTab = (tab: 'home' | 'projects' | 'activities') => {
        setActiveTab(tab);
    }
    
    TitlePage({ refPath:window.location.pathname })

    return (
        <div className="container-fluid w-100 vh-100 p-0">
            <div className="row vh-100">
                <div className="col-md-2">
                    <Margin className="container-fluid vh-100 marge"
                        activeTab={activeTab}
                        onTabChange={setTab}
                    />
                </div>
                <div className="col-md-10">
                    {activeTab === 'home' &&
                        <Home />
                    }
                    {activeTab === 'projects' &&
                        <Project />
                    }
                    {activeTab === 'activities' &&
                        <Activity />
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;