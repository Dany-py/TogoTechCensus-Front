

export interface MarginProps {
    className?: string;
    activeTab: 'home' | 'projects' | 'activities';
    onTabChange: (tab: 'home' | 'projects' | 'activities') => void;
    onClose?: () => void;
}