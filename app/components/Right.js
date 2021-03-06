// @flow
import React, { Component } from 'react';
import styles from './photon.scss';
import coreStyles from './Core.scss';
import panelStyles from './Panels.scss';
import State from '../containers/StateConfig';
import Props from '../containers/PropsConfig';
import Styles from '../containers/StylesConfig';
import Events from '../containers/EventsConfig';

class Right extends Component {
  props: {
    tabs: {},
    activeTab: string,
    toggleTabs: () => void
  };

    // returns the correct JSX class depending on which tab is active
  renderActiveTab = (activeTab) => {
    switch (activeTab) {
      case 'State':
        return <State />;
      case 'Props':
        return <Props />;
      case 'Events':
        return <Events />;
      case 'Styles':
        return <Styles />;
      default: return null;
    }
  };

  render() {
    const { tabs, activeTab, toggleTabs } = this.props;
    const renderActiveTab = this.renderActiveTab.bind(this);
    // maps over an array of tab names, dropping in presentational for Tab rendering.
    const tabsRender = Object.keys(tabs).map(tab => (
      <Tab
        key={tab}
        name={tab}
        isActive={tabs[tab]}
        handleTabClick={toggleTabs}
      />
      ));

    return (
      <div className={`${styles['pane-med']} ${coreStyles.sidebar}`}>
        <div className={panelStyles.stateContainer}>
          <header className={panelStyles.header}>
            <div className={`${styles['tab-group']}`}>
              {tabsRender}
            </div>
          </header>
          <div className={panelStyles.tabContainer}>
            {renderActiveTab(activeTab)}
          </div>
        </div>
      </div>
    );
  }
}

    // presentational with rendering logic for tab windows.
function Tab({ name, handleTabClick, isActive }) {
  return (
    <div className={`${styles['tab-item']} ${isActive ? styles.active : ''} ${coreStyles.tab}`} onClick={() => handleTabClick(name)}>
      {name}
    </div>
  );
}

export default Right;
