import React from "react";
import Toggle from "./Toggle";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs is-boxed is-fullwidth">
      <ul>
        {tabs.map((tab, index) => (
          <Toggle
            key={index}
            label={tab.title}
            active={activeTab === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </ul>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
