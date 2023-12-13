// Importer nødvendige hooks og biblioteker
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { DocumentTextIcon, HomeIcon, PlusSmallIcon } from "react-native-heroicons/solid";

// Konfiguration for Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDv5myi0-ZZPEGioDDlZNYSuSiiXwacMuI",
  authDomain: "opgave-12af1.firebaseapp.com",
  projectId: "opgave-12af1",
  storageBucket: "opgave-12af1.appspot.com",
  messagingSenderId: "552464189082",
  appId: "1:552464189082:web:5ab15faf362c2065720123",
  measurementId: "G-C980EBPG6T"
};

// Initialiser Firebase med den givne konfiguration
initializeApp(firebaseConfig);

// Importer komponenter fra forskellige filer
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ProfileScreen from './components/ProfileScreen';
import ProductSearchScreen from './components/ProductSearchScreen';
import AddProductScreen from './components/AddEventScreen';
import CheckoutScreen from './components/ProfileScreen/InvoiceScreen';
import AdminScreen from './components/ProfileScreen/AdminScreen';


// Opret en Tab Navigator
const Tab = createBottomTabNavigator();


// Hovedkomponenten i appen
function App() {
  // State for at holde styr på den aktuelle bruger
  const [user, setUser] = useState(null); 
  const [role, setRole] = useState(null); 

  // Få adgang til Firebase Auth service
  const auth = getAuth();


    // Effekt for at lytte til ændringer i brugerens autentificeringstilstand
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
          // Hent brugerens rolle fra Firestore
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          }
        } else {
          setRole(null);
        }
      });

    // Afbryd lytteren, når komponenten afmonteres
    return () => unsubscribe();
  }, []);


   // Returner JSX for appen
   return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Hvis brugeren er logget ind, vis disse skærme */}
        {user && (
          <>
            <Tab.Screen name="Homepage" component={ProfileScreen} options={{ headerShown: false, tabBarIcon: HomeIcon }} />
            <Tab.Screen name="MineTilbud" component={ProductSearchScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Invoice" component={CheckoutScreen} options={{ headerShown: false, tabBarIcon: DocumentTextIcon }} />
          </>
        )}
        {/* Hvis brugeren er logget ind som admin, vis "Tilføj produkt" skærmen */}
        {user && role === 'admin' && (
          <>
          <Tab.Screen name="Add Event" component={AddProductScreen} options={{ headerShown: false, tabBarIcon: PlusSmallIcon}} />
          <Tab.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
          </>
          
          
        )}
        {/* Hvis brugeren ikke er logget ind, vis disse skærme */}
        {!user && (
          <>
            <Tab.Screen name="SignUp" component={SignUpForm} options={{ headerShown: false }} />
            <Tab.Screen name="Login" component={LoginForm} options={{ headerShown: false }} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Eksporter App komponenten som standard
export default App;

