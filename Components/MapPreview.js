import React from "react";

import { Text, View, StyleSheet, Image,TouchableOpacity } from "react-native";

import ENV from "../env";


const MapPreview = (props) => {
  let imagePreviewUrlG;
  let imagePreviewUrlM;


  if (props.location) {
    
    imagePreviewUrlG = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
    
    
    imagePreviewUrlM =`http://apis.mapmyindia.com/advancedmaps/v1/aty4npne2mosbn1b9w4thndyib8i843t/still_image?center=${props.location.lat},${props.location.lng}&zoom=15&size=800x400&ssf=1&markers=${props.location.lat},${props.location.lng}`;
  }

  return (
    <TouchableOpacity onPress={props.onPress}  style={{...styles.locationPreview , ...props.style }}>
      {props.location ? (
        <Image style={styles.image} source={{ uri: imagePreviewUrlM }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width:'100%',
    height:'90%'
    
  },
  locationPreview:{
      justifyContent:"center",
      alignItems:"center",
    
  }
});

export default MapPreview;
