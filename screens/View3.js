import React from 'react';
import { Button, View, Text } from 'react-native';

function View3({route, navigation}) {
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sóc la View 3</Text>
            <Button
                title="Back to home"
                //onPress={() => navigation.popToTop()}
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
}

  export default View3;
  