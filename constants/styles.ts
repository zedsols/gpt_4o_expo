import { StyleSheet } from "react-native";
import { default as COLORS } from "~/constants/colors";

export const defaultStyles = StyleSheet.create({
	btn: {
		height: 48,
		borderRadius: 12,
		paddingHorizontal: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 999,
	},
	pageContainer: {
		flex: 1,
		backgroundColor: COLORS.light,
	},
});
