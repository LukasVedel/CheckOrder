import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // Ændret fra 'top' til 'flex-start'
    alignItems: 'center',
    paddingHorizontal: 5,
    padding: 24,
    paddingTop: 80
  },
  headerContainer: {
    width: '100%',  // Sørg for, at headeren er fuld bredde
    flexDirection: 'row',
    justifyContent: 'space-between',  // Tilføjet for at placere indhold på tværs af headeren
    alignItems: 'center',
    paddingTop: 10,  // Tilføj lidt padding i toppen, hvis det er nødvendigt
  },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
      modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      modalItemText: {
        fontSize: 18,
        color: 'blue',
      },
      deleteText: {
        color: 'red',
      },
      closeButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
      },
      closeButtonText: {
        fontSize: 18,
        color: 'blue',
      },
      emailContainer: {
        alignItems: 'center',
        marginVertical: 20,
      },
      emailText: {
        fontSize: 16,
        color: '#333',
      },
      productContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 8,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        alignItems: 'center',
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      productPrice: {
        fontSize: 14,
        color: '#333',
      },
      productStore: {
        fontSize: 12,
        color: '#777',
      },
      productImage: {
        width: 100,
        height: 100,
        marginTop: 10,
      },
      menuIcon: {
        position: 'absolute',
        top: -0,  // Juster disse værdier efter behov
        right: 1,
      },
      checkoutContainer: {
        width: '100%',
        maxWidth: 400,  // Maksimal bredde
        alignSelf: 'center',  // Centrerer containeren vandret
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'stretch',
      },
      orderSummary: {
        marginBottom: 20,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        paddingBottom: 10,
      },
      orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
      },
      orderTotal: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
      },
      checkoutButton: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 5,
        alignItems: 'center',
      },
      checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      
      
});

export default styles;


