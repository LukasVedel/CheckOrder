import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFirestore, query, collection, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function InvoiceScreen() {
  const [eventDetails, setEventDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestEventAndUserDetails = async () => {
    setLoading(true);

    try {
      const db = getFirestore();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserDetails(userSnap.data());
        } else {
          console.error('No user details found.');
          setUserDetails(null);
        }
      }

      const eventsQuery = query(
        collection(db, 'events'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(eventsQuery);
      if (!querySnapshot.empty) {
        setEventDetails(querySnapshot.docs[0].data());
      } else {
        console.error('No events found.');
        setEventDetails(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setEventDetails(null);
      setUserDetails(null);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLatestEventAndUserDetails();
      return () => {
        setEventDetails(null);
        setUserDetails(null);
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!eventDetails || !userDetails) {
    return (
      <View style={styles.container}>
        <Text>No details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Invoice</Text>
      <View style={styles.invoiceContainer}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceTitle}>Event Details</Text>
        </View>
  
        <View style={styles.invoiceSection}>
          <Text style={styles.invoiceText}>Title: {eventDetails.title}</Text>
          <Text style={styles.invoiceText}>Date: {eventDetails.date}</Text>
          <Text style={styles.invoiceText}>Time: {eventDetails.time}</Text>
          <Text style={styles.invoiceText}>Location: {eventDetails.location}</Text>
          <Text style={styles.invoiceText}>Description: {eventDetails.description}</Text>
        </View>
  
        <View style={styles.buyerInfo}>
          <Text style={styles.buyerTitle}>Buyer's Information</Text>
          <Text style={styles.invoiceText}>Email: {userDetails.email}</Text>
        </View>
  
        {/* You can add more sections like pricing, terms, etc., using the same pattern */}
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#f9f9f9', // Soft background color
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  invoiceContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd', // Borders to define sections
    backgroundColor: '#fff', // White for the content area
    shadowColor: '#000', // Shadow for a subtle depth effect
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 4,
  },
  invoiceHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Light line for an underlined effect
    marginBottom: 12,
    paddingBottom: 4,
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  invoiceSection: {
    marginBottom: 16,
  },
  invoiceText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  buyerInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 12,
  },
  buyerTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  // Additional styles can be added here
});

