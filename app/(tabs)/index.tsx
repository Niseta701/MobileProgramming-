import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const events = [
    {
      id: 1,
      title: "Hellbound Ride Night",
      date: "January 22, 2025",
      time: "7:00 PM",
      venue: "Central Garage, KTM",
    },
    {
      id: 2,
      title: "Brotherhood Meet",
      date: "January 25, 2025",
      time: "5:00 PM",
      venue: "MC Club House, Bhaktapur",
    },
    {
      id: 3,
      title: "Long Ride – Hetauda",
      date: "February 02, 2025",
      time: "6:00 AM",
      venue: "Meeting Point: Kalanki",
    },
  ];

  const memberPass = () => {
    Alert.alert("Members Pass", "Your pass is active!");
  };

  // ❌ Removed TypeScript type annotation
  const openEvent = (title) => {
    Alert.alert("Event Selected", `Opening details for ${title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.header}>🏴‍☠️ HELLOBOUND MC 🏴‍☠️</Text>
      <Text style={styles.subHeader}>EVENTS & RIDES</Text>

      {/* Members Pass Button */}
      <TouchableOpacity style={styles.passButton} onPress={memberPass}>
        <Text style={styles.passText}>🎟 MEMBERS PASS</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scroll}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.card}
            onPress={() => openEvent(event.title)}
          >
            <Text style={styles.cardTitle}>{event.title}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.info}>📅 {event.date}</Text>
              <Text style={styles.info}>⏰ {event.time}</Text>
            </View>

            <Text style={styles.venue}>📍 {event.venue}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.footer}>Hellbound MC © 2025</Text>
    </SafeAreaView>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4405A4",
    paddingTop: 20,
  },

  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subHeader: {
    color: "#D5C4FF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
  },

  passButton: {
    backgroundColor: "#6B00FF",
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  passText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  scroll: {
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#5B13CC",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
  },

  cardTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    color: "#E5D4FF",
    fontSize: 15,
  },

  venue: {
    color: "#F2E9FF",
    fontSize: 15,
    marginTop: 8,
  },

  footer: {
    color: "#C9B8FF",
    textAlign: "center",
    padding: 10,
    fontSize: 14,
  },
});
