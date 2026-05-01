import { useState, useEffect } from 'react'
import '../../styles/Activity.css'
import axios from 'axios'

interface INotification {
    type: string
    title: string
    message: string
    notification_type: string
}

interface IActivity {
    id: string
    title: string
    message: string
    notification_type: string
}

type TabType = 'all' | 'updates' | 'mentions' | 'comments'

interface ActivityProps {
    onMarkAsRead?: () => void;
}

const notificationTypeToTab: Record<string, Exclude<TabType, 'all'>> = {
    project_submitted: 'updates',
    mention: 'mentions',
    comment: 'comments',
}

const Activity = ({ onMarkAsRead }: ActivityProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('all')
    const [activities, setActivities] = useState<IActivity[]>([])

    useEffect(() => {
        const wsUrl = import.meta.env.VITE_API_WS as string
        const ws = new WebSocket(`${wsUrl}ws/notifications/`)

        ws.onmessage = (event) => {
            const { title, message, notification_type } = JSON.parse(event.data) as INotification
            console.log('Notification type :', notification_type)
            console.log('Message de notification :', message)
            setActivities(prev => [
                { id: Date.now().toString(), title, message, notification_type },
                ...prev
            ])
        }
        const fetchActivity = async () => {
            const url = import.meta.env.VITE_API_NOTIFY as string            
            const response = await axios.get(url)
            console.log('List des notification :', response.data)
            setActivities(response.data.results)
        }
        fetchActivity()
    }, [])

    const filteredActivities = activeTab === 'all'
        ? activities
        : activities.filter(a => notificationTypeToTab[a.notification_type] === activeTab)

    const tabs: { key: TabType; label: string }[] = [
        { key: 'all', label: 'All Feed' },
        { key: 'updates', label: 'Updates' },
        { key: 'mentions', label: 'Mentions' },
        { key: 'comments', label: 'Comments' },
    ]

    return (
        <div className="container w-100 vh-200 dashboard">
            <section className="text-start mt-3 px-3">
                <h1>Recent Activity</h1>
                <p>Stay connected with the latest advances in Togo's tech ecosystem.</p>
            </section>

            <div className="row p-3">
                <div className="col-md-8 p-3">

                    <div className="activity-tabs mb-4 d-flex align-items-center gap-3 border-bottom">
                        {tabs.map(({ key, label }) => (
                            <button
                                key={key}
                                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                                onClick={() => setActiveTab(key)}
                            >
                                {label}
                            </button>
                        ))}
                        <span 
                            className="text-muted ms-auto"
                            onClick={() => onMarkAsRead?.()}
                            style={{ cursor: 'pointer' }}
                        >
                            Mark all as read
                        </span>
                    </div>

                    <div className="activities-list">
                        {filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="activity-item d-flex gap-3 py-3 px-2 border-bottom"
                                style={{ cursor: 'pointer' }}
                            >
                                <div style={{ fontSize: '1.5em', minWidth: '40px' }}>🔔</div>
                                <div className="flex-grow-1 d-flex align-items-start justify-content-between">
                                    <p className="mb-0">
                                        <span style={{ color: '#52B878' }}> {activity.title}</span><br/>
                                        <strong>{activity.message}</strong>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activities.length > 10 ? <div className="text-center mt-4">
                        <a href="#" style={{ color: '#52B878', textDecoration: 'none' }}>
                            Load more activities...
                        </a>
                    </div>
                    : ''}
                </div>
            </div>
        </div>
    )
}

export default Activity