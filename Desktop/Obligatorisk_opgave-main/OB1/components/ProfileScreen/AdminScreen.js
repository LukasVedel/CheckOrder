import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export default function AdminScreen() {
  // Opretter en lokal state til at holde events
  const [events, setEvents] = useState([]);

  // Bruger hook til at tjekke, om skærmen aktuelt er i fokus
  const isFocused = useIsFocused();

  useEffect(() => {
    // Henter events kun når skærmen er i fokus
    if (isFocused) {
      const fetchEvents = async () => {
        const db = getFirestore();

        // Henter alle events fra 'events' samlingen i Firestore
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Opdaterer state med event data
        setEvents(eventsData);
      };

      fetchEvents();
    }
  }, [isFocused]);

  // Renderer oplysninger for hvert event
  const renderEvent = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: "#ddd", // Borders to define sections
          backgroundColor: "#fff", // White for the content area
          shadowColor: "#000", // Shadow for a subtle depth effect
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          borderRadius: 4,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 8 }}>
          Event Title: {item.title}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Date: {item.date}</Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Time: {item.time}</Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Location: {item.location}
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Description: {item.description}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 80 }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#444",
          marginBottom: 12,
          alignSelf: "flex-start",
        }}
      >
        Upcoming Events
      </Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />
    </View>
  );
}
