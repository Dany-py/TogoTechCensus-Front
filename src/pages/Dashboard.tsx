
import Activity from "../components/Dashboard/Activity";
import Workspace from "../components/Dashboard/Workspace";
import Margin from "../components/Dashboard/Margin";
import Home from "../components/Dashboard/Dashboard";
import Navbar from "../components/Dashboard/DashNav"
import TitlePage from "../utils/Title";
import { useState } from 'react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'activities'>('home');
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    const setTab = (tab: 'home' | 'projects' | 'activities') => {
        setActiveTab(tab);
        // Marquer les notifications comme lues quand l'utilisateur accède à l'onglet Activités
        if (tab === 'activities') {
            setHasUnreadNotifications(false);
        }
    };

    const markNotificationsAsRead = () => {
        setHasUnreadNotifications(false);
    };
    
    TitlePage({ refPath:window.location.pathname })

    return (
        <div className="container-fluid w-100 h-500 p-0">
            <Navbar hasUnreadNotifications={hasUnreadNotifications} onNotification={setHasUnreadNotifications}/>
            <div className="row w-100 vh-100">
                <div className="col-md-2 px-0 ">
                    <Margin className="container-fluid vh-100 marge"
                        activeTab={activeTab}
                        onTabChange={setTab}
                    />
                </div>
                <div className="col-md-10 px-0 content">
                    {activeTab === 'home' &&
                        <Home />
                    }
                    {activeTab === 'projects' &&
                        <Workspace />
                    }
                    {activeTab === 'activities' &&
                        <Activity onMarkAsRead={markNotificationsAsRead}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;