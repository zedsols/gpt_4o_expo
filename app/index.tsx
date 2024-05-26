import { View } from "react-native";
import AnimatedIntro from "~/components/animated_intro";
import BottomLoginSheet from "~/components/bottom_login_sheet";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
			}}
		>
			<AnimatedIntro />
			<BottomLoginSheet />
		</View>
	);
}
