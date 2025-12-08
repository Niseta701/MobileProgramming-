import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [msg, setMsg] = useState("");

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Women Safety</Text>

      {/* SOS Button */}
      <TouchableOpacity
        style={styles.sos}
        onPress={() => setMsg("🚨 SOS Alert Sent!")}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      {/* Grid Buttons */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setMsg("📍 Live Location Shared!")}
        >
          <Text style={styles.boxText}>📍 Location</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>📞 Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>⚠️ Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Text style={styles.boxText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.message}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#d6336c",
    marginBottom: 20,
  },
  sos: {
    backgroundColor: "#ff3b30",
    padding: 25,
    paddingHorizontal: 60,
    borderRadius: 60,
    shadowColor: "#ff3b30",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    marginBottom: 25,
  },
  sosText: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
  },
  grid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  box: {
    backgroundColor: "white",
    width: "40%",
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  boxText: {
    fontSize: 17,
  },
  message: {
    marginTop: 25,
    color: "#d63384",
    fontSize: 18,
  },
});