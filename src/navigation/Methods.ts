import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef();

/**
 * Recursive function that delays the next call if the navigation is not yet mounted.
 */
const navigationMethod = (successCallback: () => unknown) => {
  if (navigationRef.isReady()) {
    return successCallback();
  }

  setTimeout(() => {
    navigationMethod(successCallback);
  }, 10);
};

/**
 * Navigate to a new route.
 */
export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  navigationMethod(() => {
    // @ts-ignore Suspended complexity warning typescript.
    navigationRef.navigate(name, params);
  });
}

/**
 * Navigate and reset root.
 */
export function resetRoot(routeName: string, params?: object) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName, params}],
      }),
    );
  });
}

/**
 * Replace.
 */
export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.replace(name, params));
  });
}

/**
 * Set params for the current route.
 */
export function setParams(params: object, routeKey?: string) {
  navigationMethod(() => {
    navigationRef.dispatch({
      ...CommonActions.setParams(params),
      source: routeKey,
    });
  });
}

/**
 * Check if it's possible to go back.
 */
export function canGoBack() {
  return navigationMethod(navigationRef.canGoBack);
}

/**
 * Go back to the previous route.
 */
export function goBack() {
  navigationMethod(navigationRef.goBack);
}

/**
 * Returns the navigation state for all navigators in the navigator tree.
 */
export function getRootState() {
  return navigationMethod(navigationRef.getRootState);
}

/**
 * Toggle Drawer.
 */
export function toggleDrawer() {
  return navigationRef?.current?.dispatch(DrawerActions.toggleDrawer());
}

/**
 * Returns current route name.
 */
export function getCurrentRouteName() {
  return navigationRef.current.getCurrentRoute().name;
}

export function push(routeName: string, params?: object) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.push(routeName, params));
  });
}

export function pop(numberOfPages: number) {
  navigationMethod(() => {
    navigationRef?.current?.dispatch(StackActions.pop(numberOfPages));
  });
}
