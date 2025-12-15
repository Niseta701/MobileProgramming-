import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_USERS = '@users';
const STORAGE_AUTH = '@auth_user';
const STORAGE_CONTACTS = '@trusted_contacts';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [authUser, setAuthUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');

  const [trusted, setTrusted] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);

  const [incomingCall, setIncomingCall] = useState(false);

  useEffect(() => {
    (async () => {
      const auth = await AsyncStorage.getItem(STORAGE_AUTH);
      const contacts = await AsyncStorage.getItem(STORAGE_CONTACTS);
      if (auth) {
        setAuthUser(JSON.parse(auth));
        setScreen('dashboard');
      }
      if (contacts) setTrusted(JSON.parse(contacts));
    })();
  }, []);

  const getUsers = async () => {
    const data = await AsyncStorage.getItem(STORAGE_USERS);
    return data ? JSON.parse(data) : [];
  };

  const register = async () => {
    if (!suName || !suEmail || !suPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const users = await getUsers();
    if (users.find(u => u.email === suEmail)) {
      Alert.alert('User already exists');
      return;
    }
    users.push({ name: suName, email: suEmail, password: suPassword });
    await AsyncStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    Alert.alert('Success', 'Registration complete');
    setScreen('login');
  };

  const login = async () => {
    const users = await getUsers();
    const user = users.find(
      u => u.email === email && u.password === password
    );
    if (!user) {
      Alert.alert('Invalid login');
      return;
    }
    await AsyncStorage.setItem(STORAGE_AUTH, JSON.stringify(user));
    setAuthUser(user);
    setScreen('dashboard');
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_AUTH);
    setAuthUser(null);
    setScreen('login');
  };

  const addContact = async () => {
    if (!newContactName || !newContactPhone) {
      Alert.alert('Enter contact details');
      return;
    }
    const updated = [...trusted, { name: newContactName, phone: newContactPhone }];
    setTrusted(updated);
    await AsyncStorage.setItem(STORAGE_CONTACTS, JSON.stringify(updated));
    setNewContactName('');
    setNewContactPhone('');
  };

  const removeContact = async (index) => {
    const updated = trusted.filter((_, i) => i !== index);
    setTrusted(updated);
    await AsyncStorage.setItem(STORAGE_CONTACTS, JSON.stringify(updated));
  };

  const getLocation = async () => {
    setLocLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      setLocLoading(false);
      return;
    }
    const pos = await Location.getCurrentPositionAsync({});
    setLocation(pos.coords);
    setLocLoading(false);
  };

  const startFakeCall = () => {
    setIncomingCall(true);
    setTimeout(() => setIncomingCall(false), 8000);
  };

  const answerCall = () => {
    setIncomingCall(false);
    Speech.speak('Hello, are you safe? I am on my way.');
  };

  const safetyTips = [
    'Stay aware of your surroundings.',
    'Share your location with trusted contacts.',
    'Avoid isolated areas at night.',
  ];

  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Women Safety App</Text>
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('signup')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === 'signup') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Name" onChangeText={setSuName} />
        <TextInput style={styles.input} placeholder="Email" onChangeText={setSuEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setSuPassword} />
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {authUser?.name}</Text>

      <TouchableOpacity style={styles.sosButton} onPress={() => Alert.alert('SOS Activated')}>
        <Text style={styles.buttonText}>SOS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.feature} onPress={getLocation}>
        <Text>Live Location</Text>
      </TouchableOpacity>

      {location && (
        <Text>Lat: {location.latitude.toFixed(4)} | Lng: {location.longitude.toFixed(4)}</Text>
      )}

      <TouchableOpacity style={styles.feature} onPress={startFakeCall}>
        <Text>Fake Call</Text>
      </TouchableOpacity>

      {incomingCall && (
        <View style={styles.callBox}>
          <Text>Incoming Call...</Text>
          <TouchableOpacity style={styles.button} onPress={answerCall}>
            <Text style={styles.buttonText}>Answer</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.subHeader}>Safety Tips</Text>
      {safetyTips.map((tip, i) => (
        <Text key={i}>• {tip}</Text>
      ))}

      <TouchableOpacity onPress={logout}>
        <Text style={styles.link}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subHeader: { fontWeight: 'bold', marginTop: 15 },
  input: { borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 6 },
  button: { backgroundColor: '#6a2cff', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#666', textAlign: 'center', marginTop: 10 },
  sosButton: { backgroundColor: '#ff4d4d', padding: 16, borderRadius: 12, alignItems: 'center', marginVertical: 10 },
  feature: { padding: 12, borderWidth: 1, borderRadius: 10, marginTop: 8 },
  callBox: { padding: 15, backgroundColor: '#ffecec', borderRadius: 12, marginTop: 10 },
});