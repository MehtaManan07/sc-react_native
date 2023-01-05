import React from 'react';
import {Mixpanel} from 'mixpanel-react-native';
import {API_MIXPANEL} from '@env';

export const MixpanelContext = React.createContext();

export const MixpanelProvider = ({children}) => {
  const [mixpanel, setMixpanel] = React.useState(null);

  React.useEffect(() => {
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(API_MIXPANEL);
      setMixpanel(initializedMixpanel);
    };

    initMixpanel();
  }, []);

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  );
};
