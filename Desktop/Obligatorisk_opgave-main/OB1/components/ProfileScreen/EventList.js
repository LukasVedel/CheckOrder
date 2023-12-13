import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsQuery = query(collection(db, "events"), orderBy("date", "asc"));
      const querySnapshot = await getDocs(eventsQuery);
      const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
      const todayDateOnly = new Date();
      todayDateOnly.setHours(0, 0, 0, 0);  // Sæt tidspunktet til 00:00:00
    
      const upcomingEvents = eventsList.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);  // Sæt tidspunktet til 00:00:00 for eventdatoen
        return eventDate >= todayDateOnly;
      });
    
      setEvents(upcomingEvents);
    };

    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.eventContainer}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
          {/* Tilføj flere detaljer efter behov */}
        </View>
      )}
    />
  );
}
