
import type { MarginProps } from "../../types/Margin.ts";
import '../../styles/Dashboard.css'


const Margin = ({ className, activeTab, onTabChange }: MarginProps) => {

    return (
        <div className={className} >

            <h3 className="mt-3">Navigation</h3>
            <div className="marge-btn-group">

                <div onClick={() => onTabChange('home')} className={activeTab === 'home' ? "mt-2 marge-btn-focused" : "mt-2 marge-btn"} >

                    <div>
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="#dff1df" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15" y="15" width="32" height="42" rx="6" stroke="#59b663" stroke-width="8" />

                            <rect x="58" y="15" width="27" height="18" rx="6" stroke="#59b663" stroke-width="8" />

                            <rect x="15" y="67" width="32" height="18" rx="6" stroke="#59b663" stroke-width="8" />

                            <rect x="58" y="43" width="27" height="42" rx="6" stroke="#59b663" stroke-width="8" />
                        </svg>
                    </div>
                    <p className="mx-2 mb-0">Home</p>
                    <br />
                </div>

                <div onClick={() => onTabChange('projects')} className={activeTab === 'projects' ? "mt-2 marge-btn-focused" : "mt-2 marge-btn"}>

                    <div >
                        <svg width="24" height="24" viewBox="0 0 160 128" xmlns="http://www.w3.org/2000/svg">

                            <rect x="20" y="8" width="60" height="24" rx="4" fill="#9fd4a0" />


                            <rect x="8" y="28" width="144" height="92" rx="8" fill="#9fd4a0" />


                            <rect x="8" y="28" width="144" height="92" rx="8" fill="none" stroke="#59b663" stroke-width="2" />
                            <rect x="20" y="8" width="60" height="24" rx="4" fill="none" stroke="#59b663" stroke-width="2" />


                            <path d="M8 36 
                                    L152 36 
                                    L152 120 
                                    Q152 124 144 124 
                                    L16 124 
                                    Q8 124 8 120 
                                    Z"
                                fill="#9fd4a0" fill-opacity="0.18" />
                        </svg>
                    </div>
                    <p className="mx-2 mb-0">My Projects</p>
                    <br />
                </div>

                <div onClick={() => onTabChange('activities')} className={activeTab === 'activities' ? "mt-2 marge-btn-focused" : "mt-2 marge-btn"}>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 50 H30 L40 25 L55 75 L65 45 L75 50 H85"
                                fill="none"
                                stroke="#59b663"
                                stroke-width="6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <p className="mx-2 mb-0">Activity</p>
                    <br />
                </div>

            </div>
            {/*<div className="mt-5">
                <a href='mailto:support@togotechcensus.com' style={{
                    textDecoration: 'none',
                    color: '#c1951c',
                    marginTop: '7em'
                }}>support@togotechcensus.com</a>
            </div>*/}
        </div>
    )
}

export default Margin;