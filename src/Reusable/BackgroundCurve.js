import React from 'react';
import { View, StyleSheet } from 'react-native';

import Svg, {
    Path
  } from 'react-native-svg';
const BackgroundCurve=()=>{
    return(
        <View>
        <View style={styles.viewAbove}/>
        <Svg height="220%" width="100%" style={styles.svg}  viewBox="0 0 1440 320">
            
          <Path 
          fill="#db5e40"
          d="M0,96L30,101.3C60,107,120,117,180,117.3C240,117,300,107,360,128C420,149,480,203,540,229.3C600,256,660,256,720,229.3C780,203,840,149,900,133.3C960,117,1020,139,1080,165.3C1140,192,1200,224,1260,218.7C1320,213,1380,171,1410,149.3L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </Svg>
      </View>

    )
};
const styles=StyleSheet.create({
    viewAbove:{
        backgroundColor:"#db5e40",
        height:210
    },
    svg:{
        position:"absolute",
        top:10
    }
})
export default BackgroundCurve;