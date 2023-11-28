import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigateScreen = (name, param) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, {param});
  }
};
