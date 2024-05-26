import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "~/constants/colors";
import { defaultStyles } from "~/constants/styles";

export default function BottomLoginSheet() {
	const { bottom } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: bottom }]}>
			<Link
				asChild
				href={{
					pathname: "/login",
					params: {
						type: "register",
					},
				}}
				style={[defaultStyles.btn, styles.btnLight]}
			>
				<TouchableOpacity>
					<Ionicons name="mail" size={18} style={styles.btnIcon} />
					<Text style={styles.btnTextLight}>Sign Up with Email</Text>
				</TouchableOpacity>
			</Link>
			<Link
				asChild
				href={{
					pathname: "/login",
					params: {
						type: "login",
					},
				}}
				style={[defaultStyles.btn, styles.btnLight]}
			>
				<TouchableOpacity>
					<Ionicons name="mail" size={18} style={styles.btnIcon} />
					<Text style={styles.btnTextLight}>Log In with Email</Text>
				</TouchableOpacity>
			</Link>
			<TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
				<Ionicons name="logo-apple" size={18} style={styles.btnIcon} />
				<Text style={styles.btnTextLight}>Continue with Apple</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
				<Ionicons name="logo-google" size={16} style={styles.btnIcon} />
				<Text style={styles.btnTextLight}>Continue with Google</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		padding: 28,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		gap: 16,
		backgroundColor: "#000",
	},

	btnIcon: {
		paddingRight: 10,
	},

	btnLight: {
		backgroundColor: "#fff",
	},

	btnTextLight: {
		fontSize: 20,
	},

	btnDark: {
		backgroundColor: COLORS.grey,
	},

	btnTextDark: {
		color: "#fff",
		fontSize: 20,
	},
});
