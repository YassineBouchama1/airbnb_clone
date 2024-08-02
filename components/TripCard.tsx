
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { COLORS, SIZES } from "@/constants/theme";
import { Image as ExpoImage } from "expo-image";
import { truncateText } from "@/hooks/truncateText";
import { RemoveReservation } from "@/app/lib/reservationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";


const TripCard = ({ trip }: any) => {

  const queryClient = useQueryClient();

  // Mutation to add a new reservation
  const mutation = useMutation({
    mutationFn: async (id:string) => await RemoveReservation(id),
    onSuccess: () => {
      // after the reservation booked refresh list of trips in page trips
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
  
    },
    onError: (error) => {
      console.error(error);
    },
  });



const onDeleteRservation =  useCallback(async()=>{

    console.log("Delete btn");
    // TODO: delete reservation
 await   mutation.mutate(trip.item._id)

 ToastAndroid.show('Deleted successfully!', ToastAndroid.SHORT);
  
},[trip.item._id]) 



  return (
    <TouchableNativeFeedback >
      <SafeAreaView style={styles.container}>
        <ExpoImage 
 style={styles.image}
 source={{ uri: trip.item.HotelId.images[0]  }}
 placeholder={{ blurhash }}
 contentFit="cover"
 transition={1000}
 key={trip.item._id}
        />
        <View style={{ marginVertical: SIZES.medium }}>
          <Text style={styles.title }>{truncateText(trip.item.HotelId.name, 30)}</Text>
          <Text style={styles.title}>2024-07-21 - 2024-07-29</Text>
          <TouchableOpacity onPress={()=>onDeleteRservation()} >
          <Text style={styles.deleteBtn}>{mutation.isPending?'Deleting':'Delete'}</Text>
        </TouchableOpacity >
        </View>
   
      </SafeAreaView>
    </TouchableNativeFeedback>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.medium,
    marginBottom: SIZES.xLarge,
    marginVertical: SIZES.small - 5,
    marginHorizontal: 14,
    flexDirection: "row",
    gap: SIZES.medium,
    alignContent:'flex-start',
    justifyContent: "flex-start",
    padding: 12,
    backgroundColor: COLORS.bg,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
image:{
  borderRadius:10,
  width:'25%',
  height:100,
},
deleteBtn:{
  color: COLORS.primary,
  alignSelf:"flex-end",
 
}
});
