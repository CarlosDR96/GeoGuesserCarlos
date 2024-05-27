import React from 'react';
import { Button, View, Text } from 'react-native';

function OurPanel({title, removeCell}) {
    
    return (
        <View style={{backgroundColor: "#FF00F1", width: '80%', marginTop:15}}>
            <Text>{title}</Text>
            <Button
                title="Remove"
                onPress={()=>removeCell(title)}
            />
            
        </View>
    );
}

  export default OurPanel;
  