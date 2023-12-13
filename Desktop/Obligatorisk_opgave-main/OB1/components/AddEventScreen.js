import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, setDoc,Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function AddEventScreen() {
  const [event, setEvent] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    userId: '',
  });

  useEffect(() => {
    // Få brugerens ID fra Firebase Authentication og sæt det i state
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEvent(prevState => ({
        ...prevState,
        userId: user.uid
      }));
    }
  }, []);

  // Asynkron funktion til at tilføje eller opdatere et event i databasen
  async function addOrUpdateEvent(event) {
    const db = getFirestore();
    const eventRef = doc(db, "events", event.id);
    const timestamp = Timestamp.now();

    // Tilføj timestamp til event-objektet
    const eventWithTimestamp = {
      ...event,
      timestamp: timestamp,
    };

    await setDoc(eventRef, eventWithTimestamp, { merge: true });
  
  }

  // Funktion til at opdatere eventinformation
  const handleInputChange = (field, value) => {
    setEvent({
      ...event,
      [field]: value
    });
  };

  // Funktion til at tilføje/opdatere event
  const handleAddOrUpdateEvent = async () => {
    if (event.id && event.userId) {
      try {
        await addOrUpdateEvent(event);
        Alert.alert('Success', 'Event added/updated successfully.');
      } catch (error) {
        console.error('Failed to add/update event:', error);
        Alert.alert('Error', 'Failed to add/update event.');
      }
    } else {
      Alert.alert('Error', 'Please provide an event ID and make sure you are logged in.');
    }
  };

  // UI til at indtaste eventinformation
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add or Update Event</Text>
      <TextInput
        placeholder="Event ID"
        value={event.id}
        onChangeText={(text) => handleInputChange('id', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Event Title"
        value={event.title}
        onChangeText={(text) => handleInputChange('title', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (e.g., 2023-01-01)"
        value={event.date}
        onChangeText={(text) => handleInputChange('date', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Time (e.g., 14:00)"
        value={event.time}
        onChangeText={(text) => handleInputChange('time', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={event.location}
        onChangeText={(text) => handleInputChange('location', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={event.description}
        onChangeText={(text) => handleInputChange('description', text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdateEvent}>
        <Text style={styles.buttonText}>Add/Update Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 28,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
