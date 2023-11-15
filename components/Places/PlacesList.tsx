import { StyleSheet, Text, View } from "react-native";

interface PlacesListProps {
  places: Place[];
}

const PlacesList = ({ places }: PlacesListProps) => {
  if (!places || places.length === 0) {
    return (
      <View>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  fallbackContainer:{
    flex:1,
    justifyContent:'center',
    alignItems'center'
  },
  fallbackText: {
    fontSize: 16,
  },
});

export default PlacesList;
