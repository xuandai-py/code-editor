'use client'
import React from "react";

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    };

    return (

        <div className="tabs is-toggle is-fullwidth is-flex-direction-column">
            <ul>
                {tabs.map((tab, index) => (
                    <li key={index} className={activeTab === index ? "is-active" : ""}>
                        <a onClick={() => handleClick(index)}>
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>{tab.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;