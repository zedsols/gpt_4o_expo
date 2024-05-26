import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
	const router = useRouter();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="login"
				options={{
					presentation: "modal",
					title: "",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="close-outline" size={28} />
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
}
