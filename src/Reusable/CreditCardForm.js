import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import CurvedButtons from './CurvedButtons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TextField from './TextField';

const CreditCardForm = () => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    function onSubmit() {
        console.log('form submitted');
    }
    return (
        <View style={{ marginTop: 100, marginBottom: 10 }}>
            <View style={styles.horiz}>
            <Fontisto name="person" size={24} color="white" style={{marginTop:33,paddingHorizontal:5}}/>
            <TextField
                style={styles.textField}
                placeholder="Cardholder Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
             </View>
             <View style={styles.horiz}>
             <FontAwesome5 name="credit-card" size={24} color="white" style={{marginTop:33,paddingHorizontal:2}}/>
            <TextField
                style={styles.textField}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
            />
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between", padding:1, paddingLeft:30,paddingRight:10}}>
            <TextField
                style={[
                    styles.textField
                ]}
                placeholder="Expiration Date"
                value={expiration}
                onChangeText={(text) => setExpiration(text)}
            />
            <TextField
                style={styles.textField}
                placeholder="Security Code"
                value={cvv}
                onChangeText={(text) => setCvv(text)}
            />
            </View>
            {/* </View> */}

            <View style={{ marginTop: 20,paddingRight:20 }}>
                <CurvedButtons
                    title="$ PAY"
                    onPress={function () {
                        alert("Payment Done!");
                    }}
                    color='#db5e40'
                    bgcolor='white'
                    widthpass={400}
                    heightpass={55}

                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 36,
    },
    textField: {
        flex: 1,
        marginTop: 14,

    },
    horiz:{
        flexDirection:"row",
        alignContent:"center",
        paddingRight:10,
        paddingBottom:0
    }
});
export default CreditCardForm;