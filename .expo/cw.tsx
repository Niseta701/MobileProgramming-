import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>

      {/* Main Button */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>

            <Text style={styles.countText}>Count: {count}</Text>

            {/* Increase Button */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.btnText}>Increase Count</Text>
            </TouchableOpacity>

            {/* Decrease Button */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setCount(count - 1)}
            >
              <Text style={styles.btnText}>Decrease Count</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#ff4d4d" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainButton: {
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
  },
  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
  btn: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
