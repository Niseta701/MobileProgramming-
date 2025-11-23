/** @jsxRuntime classic */
// ...existing code...
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

declare const require: any;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLinkPress = (linkName: string) => {
    Alert.alert(`Navigating to ${linkName}`);
    setMenuOpen(false);
  };

  const showAlert = () => Alert.alert("Welcome to Hellbound MC!");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require("./assets/images.jpg")} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
          <View style={[styles.bar, menuOpen && styles.bar1]} />
          <View style={[styles.bar, menuOpen && styles.bar2]} />
          <View style={[styles.bar, menuOpen && styles.bar3]} />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {menuOpen && (
        <View style={styles.menu}>
          <ScrollView>
            {["Home", "Events", "Contact"].map((item) => (
              <TouchableOpacity key={item} onPress={() => handleLinkPress(item)} style={styles.menuItem}>
                <Text style={styles.menuText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>🏴‍☠️ HELLBOUND MC 🏴‍☠️</Text>
        <Text style={styles.subtitle}>BOUND FOR REDEMPTION</Text>
        <TouchableOpacity onPress={showAlert} style={styles.button}>
          <Text style={styles.buttonText}>Welcome</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4405A4",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4405A4",
  },
  logo: {
    width: 100,
    height: 40,
  },
  hamburger: {
    width: 30,
    justifyContent: "space-between",
    height: 20,
  },
  bar: {
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
  bar1: {
    transform: [{ rotate: "45deg" }, { translateY: 8 }],
  },
  bar2: {
    opacity: 0,
  },
  bar3: {
    transform: [{ rotate: "-45deg" }, { translateY: -8 }],
  },
  menu: {
    backgroundColor: "black",
    paddingVertical: 10,
    position: "absolute",
    width: "100%",
    top: 70,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6B00FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});