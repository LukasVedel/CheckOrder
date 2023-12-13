import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function ProductSearchScreen() {
  // Opretter lokal state for søgeterm og produkter
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  // Funktion til at søge efter produkter baseret på søgeterm
  const searchProducts = async () => {

    // Initialiserer Firestore
    const db = getFirestore();
    // Opretter en forespørgsel, der søger efter produkter, hvor navnet matcher søgetermen
    const q = query(collection(db, 'products'), where('name', '==', searchTerm));

    // Udfører forespørgslen og gemmer resultaterne i lokal state
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.size) {
        console.log("No products found for the search term:", searchTerm);
        return;
      }
      const productList = [];
      querySnapshot.forEach((doc) => {
        productList.push(doc.data());
      });
      setProducts(productList);
      console.log("Products found:", productList);
    } catch (error) {
      console.error("Error searching products:", error);
    }
    
  };

  // Rendrer komponenterne
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a product"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        style={styles.searchInput}
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchProducts}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name} - {item.price} DKK</Text>
            <Image 
              source={{ uri: item.imageURL }}
              style={styles.productImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    flex: 1,
  },
  productStore: {
    fontSize: 14,
    color: '#777',
    flex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});

export default ProductSearchScreen;
