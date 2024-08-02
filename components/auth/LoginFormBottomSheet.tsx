import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { COLORS } from "@/constants/theme";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { ThemeContext } from "@/app/context/ThemeContext";


const LoginFormBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "70%"], []); // size of bottom sheet
  

const {formAuth ,setFormAuth} = useContext(ThemeContext) // bring context 



  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior="fillParent"
      handleIndicatorStyle={{ backgroundColor: COLORS.grey, width: 50 }}
      style={styles.sheetContainer}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {formAuth ?<LoginForm />:<RegisterForm/>}
        
        <TouchableOpacity
        style={{alignItems: "center"}}
        onPress={() => setFormAuth(!formAuth)}>
          <Text style={styles.switcherText}>{formAuth ? "Don't have an account? Sign up":"Already have an account? Sign in"}</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
backgroundColor:'trans',
    padding: 20,
  },
  inputError: {
    borderColor: "red",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff0066",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  switcherText: {
    marginTop: 20,
    color: "black",
    textDecorationLine: "underline",
  },
});

export default LoginFormBottomSheet;
