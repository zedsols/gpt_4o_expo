import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { defaultStyles } from "~/constants/styles";
import { COLORS } from "~/constants/colors";

export default function Login() {
	const { type } = useLocalSearchParams<{ type: string }>();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSignUpPress = async () => {};

	const onLoginPress = async () => {};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={1}
			style={styles.container}
		>
			{loading && (
				<View style={defaultStyles.loadingOverlay}>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}
			<Image
				source={require("~/assets/images/logo-dark.png")}
				style={styles.logo}
			/>
			<Text style={styles.title}>
				{type === "register" ? "Create your account" : "Welcome back"}
			</Text>
			<View style={{ marginBottom: 20 }}>
				<TextInput
					autoCapitalize="none"
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					style={styles.inputField}
				/>
				<TextInput
					autoCapitalize="none"
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.inputField}
				/>
			</View>
			<TouchableOpacity
				onPress={type === "register" ? onSignUpPress : onLoginPress}
				style={[defaultStyles.btn, styles.btnPrimary]}
			>
				<Text style={styles.btnTextPrimary}>
					{type === "register" ? "Sign Up" : "Log In"}
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	logo: {
		width: 64,
		height: 64,
		marginVertical: 78,
		alignSelf: "center",
	},

	title: {
		marginBottom: 20,
		alignSelf: "center",
		fontSize: 32,
		fontWeight: "bold",
	},

	inputField: {
		height: 48,
		borderWidth: 1,
		borderColor: COLORS.primary,
		borderRadius: 14,
		marginVertical: 4,
		padding: 12,
		backgroundColor: "#fff",
	},

	btnPrimary: {
		marginVertical: 4,
		backgroundColor: COLORS.primary,
	},

	btnTextPrimary: {
		fontSize: 16,
		color: "#fff",
	},
});
