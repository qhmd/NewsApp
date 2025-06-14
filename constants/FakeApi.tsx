import React from "react";
import { Text } from "react-native";
import AllNews from "./AllNews";

export const FakeApi = (category: string): React.ReactElement => {
  switch (category) {
    case "All":
      return <AllNews />;
    default:
      return <Text>Komponen belum tersedia</Text>;
  }
};