import { Colors } from "@/assets/colors";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import useSearch from "@/hooks/useSearch";
import AndroidItemSelection from "../android-item-selection";
import LineSeparator from "../line-separator";
import AndroidModal from "../android-modal";
import AndroidSearchBar from "../android-searchbar";

type AndroidSelectInputProps<T> = {
  title: string;
  label: string;
  data: T[];
  handleSelectItem: (item: T) => void;
  value: string;
};

export default function AndroidSelectInput<T extends string>({
  title,
  label,
  data,
  handleSelectItem,
  value,
}: AndroidSelectInputProps<T>) {
  const [opened, setOpened] = useState(false);

  const { search, setSearchFn } = useSearch();

  const handleModal = (status: boolean) => setOpened(status);

  return (
    <>
      <AndroidModal
        title={title}
        isOpened={opened}
        handleCloseModal={() => handleModal(false)}
      >
        <AndroidSearchBar onSearch={setSearchFn} />
        <FlatList
          data={data.filter((icon) =>
            icon.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => (
            <AndroidItemSelection
              item={item}
              icon={item}
              onPress={(selectedItem) => {
                handleSelectItem(selectedItem);
                handleModal(false);
              }}
            />
          )}
          keyExtractor={(item, index) => String(index)}
          initialNumToRender={3}
          ItemSeparatorComponent={() => <LineSeparator width="100%" />}
        />
      </AndroidModal>

      <Pressable
        onPress={() => {
          handleModal(true);
        }}
      >
        <TextInput
          mode="outlined"
          label={label}
          activeOutlineColor={Colors.PRIMARY}
          outlineColor="lightgray"
          onFocus={() => {
            handleModal(true);
          }}
          editable={false}
          value={value}
        />
      </Pressable>
    </>
  );
}
