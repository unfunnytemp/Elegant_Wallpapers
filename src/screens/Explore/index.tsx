import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	Linking,
	Animated,
} from "react-native";
import styled from "styled-components/native";
import Wall from "../../components/Wall";
import {
	SECRET_KEY,
	STANDARD_HEIGHT,
	STANDARD_WIDTH,
	VERSION_NUMBER,
	VERSION_URL,
	WALL_URL,
	FREE_APP,
} from "../../constants";
import { useTheme } from "../../themes";
import SplashScreen from "react-native-splash-screen";
import { useIsFocused } from "@react-navigation/native";
import { Text, View } from "../../components/StyledComponents";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const windowWidth = Dimensions.get("window").width;

const Explore = ({ navigation }) => {
	const theme = useTheme();
	const [data, setData] = useState([]);
	const [updateState, setUpdateState] = useState(0);
	const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
	const [offset, setOffset] = useState(0);
	const focused = useIsFocused();

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				SplashScreen.hide();
				setData(responseJson);
			})
			.catch((error) => {
				console.log(error);
			});

		fetch(VERSION_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.Lastforceupdate > VERSION_NUMBER) setUpdateState(2);
				else if (responseJson.Appversion <= VERSION_NUMBER) setUpdateState(0);
				else setUpdateState(responseJson.Priority);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getData();
		//scrollToOffset(offset)
		return function () {};
	}, []);

	useEffect(() => {
		if (focused) fadeIn();
		return function () {};
	}, [focused]);

	function fadeIn() {
		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 800,
			useNativeDriver: true,
		}).start();
	}

	function handleScroll(event) {
		let offsety = event.nativeEvent.contentOffset.y;
		setOffset(offsety);
	}

	if (updateState != 0) {
		if (updateState == 2)
			return (
				<View
					style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
				>
					<Text
						style={{
							color: theme.mode == "dark" ? "#A9A9A9" : "grey",
							fontSize: 20 * scaleHeight,
							fontFamily: "Linotte-Bold",
						}}
					>
						Update the app to view the walls.
					</Text>
				</View>
			);
		else if (updateState == 1) {
			return (
				<>
					<StatusBar
						translucent={true}
						backgroundColor={"transparent"}
						barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
					/>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => Linking.openURL(FREE_APP)}
					>
						<View
							style={{
								height: 100 * scaleHeight,
								width: "100%",
								backgroundColor: theme.mode == "dark" ? "#AAFF00" : "#7CCC00",
								justifyContent: "center",
								padding: 25 * scaleHeight,
								alignItems: "center",
							}}
						>
							<Text
								style={{
									color: "black",
									fontSize: 20 * scaleHeight,
									fontFamily: "Linotte-Bold",
								}}
							>
								Update the app for best possible experience
							</Text>
						</View>
					</TouchableOpacity>
					{mainElement()}
				</>
			);
		}
	}

	function mainElement() {
		return (
			<>
				<View style={styles.container}>
					<Animated.View
						style={[
							styles.container,
							{
								opacity: fadeAnimation,
							},
						]}
					>
						<StatusBar
							translucent={true}
							backgroundColor={"transparent"}
							barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
						/>
						<View style={{ ...styles.container }}>
							<Wall data={data} navigation={navigation} />
						</View>
					</Animated.View>
				</View>
			</>
		);
	}

	return <>{mainElement()}</>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		paddingHorizontal: 10 * scaleWidth,
	},
	searchBox: {
		justifyContent: "center",
		height: 50 * scaleHeight,
		width: 50 * scaleWidth,
		borderRadius: 70,
		elevation: 10,
		shadowColor: "#fff",
		position: "absolute",
		opacity: 1,
		bottom: 45 * scaleHeight,
		right: 40 * scaleWidth,
	},
	headerContainer: {},
	bottomTab: {
		justifyContent: "center",
		alignItems: "flex-start",
		shadowOpacity: 1,
		height: 70 * scaleHeight,
		position: "absolute",
		bottom: 0,
		width: "100%",
		borderTopEndRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 3.84,
		elevation: 5,
	},
	Wall: {
		width: (windowWidth / 2) * 0.88,
		height: 250 * scaleHeight,
		borderRadius: 5,
		borderTopRightRadius: 5,
	},
	wallBoundary: {
		flex: 1,
		margin: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10 * scaleHeight,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15 * scaleHeight,
		textAlign: "center",
	},
	modalItem: {
		paddingLeft: 25 * scaleWidth,
		flexDirection: "row",
		marginVertical: 5 * scaleHeight,
		width: windowWidth,
		justifyContent: "flex-start",
	},
	pill: {
		backgroundColor: "#898989",
		height: 5 * scaleHeight,
		width: 40 * scaleWidth,
		borderRadius: 10,
		marginBottom: 15,
		alignSelf: "center",
	},
});

export default Explore;
