import React,{ useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView, View,Text } from "react-native";


function useInternetConnection() {
  const [hasInternetConnection, setHasInternetConnection] = useState(false);
  const [hasCheckedInternetconnection, setHasCheckedInternetConnection] =
    useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((event) => {
      if (typeof event.isInternetReachable === "boolean") {
        setHasInternetConnection(
          event.isConnected && event.isInternetReachable
        );
        setHasCheckedInternetConnection(true);
      }
    });

    return unsubscribe;
  });

  return [hasInternetConnection, hasCheckedInternetconnection];
}

const NoInternetWarning = () => {
  const hasInternetConnection = useInternetConnection();

  if (!hasInternetConnection) {
    return (<SafeAreaView><Text>No hay conexion a internet</Text></SafeAreaView>);

  }
  return null;
};

export default NoInternetWarning;


