// _layout.tsx
import { Stack } from "expo-router";
export default function RootLayout() {
 return (
 <Stack>
 {/* Main Screen */}
 <Stack.Screen
 name="index"
 options={{
 title: "Richie's Weather App",
 headerStyle: {
 backgroundColor: '#4c95afff',
 },
 headerTintColor: '#FFFFFF',
 headerTitleStyle: {
 fontWeight: 'bold',
 fontSize: 24,
 },
 }}
 />

 {/* Detail Screen */}
 <Stack.Screen
 name="CityDetail"
 options={{
 title: "City Details",
 headerStyle: {
 backgroundColor: '#4c95afff',
 },
 headerTintColor: '#FFFFFF',
 headerTitleStyle: {
 fontWeight: 'bold',
 fontSize: 24,
 },
 }}
 />
 </Stack>
 );
}