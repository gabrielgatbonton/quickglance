import { Colors } from "@/assets/colors";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { Platform } from "react-native";

type useSearchProps = {
  placeholder?: string;
  searchOptions?: object;
};

export default function useSearch({
  placeholder = "Search",
  searchOptions = {},
}: useSearchProps = {}) {
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (Platform.OS === "ios") {
      navigation.setOptions({
        headerSearchBarOptions: {
          placeholder,
          tintColor: Colors.PRIMARY,
          onChangeText: (
            event: NativeSyntheticEvent<TextInputFocusEventData>,
          ) => setSearch(event.nativeEvent.text),
          ...searchOptions,
        },
      });
    }
  }, [navigation, placeholder, searchOptions]);

  return {
    search,
    setSearchFn: setSearch,
    isAndroid: Platform.OS === "android",
  };
}
