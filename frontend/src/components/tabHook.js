import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Assisted by watsonx Code Assistant
// Code generated by WCA@IBM in this programming language is not approved for use in IBM product development.

export const useTabHook = ({
  validTabIndicies = [],
  defaultTab = 'summary',
  skipHash = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // set active tab based on URL hash
  useEffect(() => {
    if (!skipHash) {
      const currentHash = location.hash.slice(1);
      setActiveTab(
        validTabIndicies.includes(currentHash) ? currentHash : defaultTab,
      );
    }
  }, [defaultTab, location.hash, skipHash, validTabIndicies]);

  // navigate to default if the url hash isn't valid
  useEffect(() => {
    // catch a bad tab index and use the default
    if (!skipHash && !validTabIndicies.includes(location.hash.slice(1))) {
      navigate(`${location.pathname}${location.search}#${defaultTab}`);
    }
  }, [defaultTab, location, navigate, skipHash, validTabIndicies]);

  // navigate to the tab hash and set active tab
  const onTabSelect = (_, tabIndex) => {
    setActiveTab(tabIndex);

    if (!skipHash) {
      navigate(`${location.pathname}${location.search}#${tabIndex}`);
    }
  };

  return { activeTab, onTabSelect };
};
