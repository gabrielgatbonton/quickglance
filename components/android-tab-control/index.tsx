import { TabView, TabBar } from "react-native-tab-view";
import { Animated } from "react-native";
import styles from "./styles";

type StoreTab = {
  key: string;
  title: string;
};

type AndroidTabControlProps = {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  storeTabs: StoreTab[];
};

export default function AndroidTabControl({
  tabIndex,
  setTabIndex,
  storeTabs,
}: AndroidTabControlProps) {
  return (
    <TabView
      style={styles.tabContainer}
      navigationState={{ index: tabIndex, routes: storeTabs }}
      onIndexChange={setTabIndex}
      renderScene={() => null}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          renderIndicator={(indicatorProps) => {
            const { position, navigationState, getTabWidth } = indicatorProps;

            return navigationState.routes.map((_, i) => {
              const inputRange = navigationState.routes.map(
                (_, index) => index
              );
              const translateX = position.interpolate({
                inputRange,
                outputRange: inputRange.map((index) => {
                  const tabWidth = getTabWidth(index);
                  return tabWidth * index + (tabWidth - 80) / 2;
                }),
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.indicatorStyling,
                    { transform: [{ translateX }] },
                  ]}
                />
              );
            });
          }}
          inactiveColor="#49454F"
          activeColor="#65558F"
        />
      )}
    />
  );
}
