import { StyleSheet, useWindowDimensions } from "react-native";
import {
	default as Animated,
	interpolate,
	interpolateColor,
	useAnimatedReaction,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { COLORS } from "~/constants/colors";

const content = [
	{ title: "Let's create.", bg: COLORS.lime, fontColor: COLORS.pink },
	{ title: "Let's brainstorm.", bg: COLORS.brown, fontColor: COLORS.sky },
	{ title: "Let's discover.", bg: COLORS.orange, fontColor: COLORS.blue },
	{ title: "Let's go.", bg: COLORS.teal, fontColor: COLORS.yellow },
	{ title: "ChatGPT", bg: COLORS.green, fontColor: COLORS.pink },
];

export default function AnimatedIntro() {
	const { width } = useWindowDimensions();
	const ballWidth = 34;
	const half = width / 2 - ballWidth / 2;

	const currentIndex = useSharedValue(0);
	const currentX = useSharedValue(half);
	const labelWidth = useSharedValue(0);
	const isAtStart = useSharedValue(true);
	const canGoToNext = useSharedValue(false);
	const didPlay = useSharedValue(false);

	const text = useDerivedValue(() => {
		const item = content[currentIndex.value];

		return item.title;
	}, [currentIndex]);

	const newColorIndex = useDerivedValue(() => {
		if (!isAtStart.value) {
			return (currentIndex.value + 1) % content.length;
		}

		return currentIndex.value;
	}, [currentIndex]);

	const textStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				currentX.value,
				[half, half + labelWidth.value / 2],
				[
					content[newColorIndex.value].fontColor,
					content[currentIndex.value].fontColor,
				],
				"RGB",
			),
			transform: [
				{
					translateX: interpolate(
						currentX.value,
						[half, half + labelWidth.value / 2],
						[half + 4, half - labelWidth.value / 2],
					),
				},
			],
		};
	}, [currentIndex, currentX]);

	const ballStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				currentX.value,
				[half, half + labelWidth.value / 2],
				[
					content[newColorIndex.value].fontColor,
					content[currentIndex.value].fontColor,
				],
				"RGB",
			),
			transform: [{ translateX: currentX.value }],
		};
	});

	const maskStyle = useAnimatedStyle(
		() => ({
			backgroundColor: interpolateColor(
				currentX.value,
				[half, half + labelWidth.value / 2],
				[content[newColorIndex.value].bg, content[currentIndex.value].bg],
				"RGB",
			),
			transform: [{ translateX: currentX.value }],
			width: width / 1.5,
			borderTopLeftRadius: 20,
			borderBottomLeftRadius: 20,
		}),
		[currentIndex, currentX, labelWidth],
	);

	const wrapperStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			currentX.value,
			[half, half + labelWidth.value / 2],
			[content[newColorIndex.value].bg, content[currentIndex.value].bg],
			"RGB",
		),
		opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
		transform: [
			{
				translateX: interpolate(
					1,
					[1, 0],
					[0, -width * 2, -width, -width, -width, -width, -width],
				),
			},
		],
	}));

	useAnimatedReaction(
		() => labelWidth.value,
		(newWidth) => {
			currentX.value = withDelay(
				1000,
				withTiming(half + newWidth / 2, { duration: 800 }, (finished) => {
					if (finished) {
						canGoToNext.value = true;
						isAtStart.value = false;
					}
				}),
			);
		},
		[labelWidth, half, currentX],
	);

	useAnimatedReaction(
		() => canGoToNext.value,
		(next) => {
			if (next) {
				canGoToNext.value = false;
				currentX.value = withDelay(
					1000,
					withTiming(half, { duration: 800 }, (finished) => {
						if (finished) {
							currentIndex.value = (currentIndex.value + 1) % content.length;
							isAtStart.value = true;
							didPlay.value = false;
						}
					}),
				);
			}
		},
		[labelWidth, currentX],
	);

	return (
		<Animated.View style={[styles.wrapper, wrapperStyle]}>
			<Animated.View style={[styles.content]}>
				<Animated.View style={[styles.ball, ballStyle]} />
				<Animated.View style={[styles.mask, maskStyle]} />
				<ReText
					onLayout={(event) => {
						labelWidth.value = event.nativeEvent.layout.width + 4;
					}}
					style={[styles.title, textStyle]}
					text={text}
				/>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	mask: {
		zIndex: 1,
		position: "absolute",
		left: "0%",
		height: 48,
	},
	ball: {
		width: 40,
		zIndex: 10,
		height: 40,
		backgroundColor: "#000",
		borderRadius: 20,
		position: "absolute",
		left: "0%",
	},
	title: {
		fontSize: 36,
		fontWeight: "600",
		left: "0%",
		position: "absolute",
	},
	content: {
		marginTop: 300,
	},
});
