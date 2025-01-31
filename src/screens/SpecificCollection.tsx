import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Text, View } from "../components/StyledComponents";
import Wall from "../components/Wall";
import {
	SECRET_KEY,
	WALL_URL,
	STANDARD_HEIGHT,
	STANDARD_WIDTH,
} from "../constants";
import { useTheme } from "../themes";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const SpecificCollection = ({ navigation, route }) => {
	const { value } = route.params;
	const [data, setData] = useState([]);
	const theme = useTheme();

	async function getData() {
		fetch(WALL_URL, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				filterData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function filterData(data) {
		var c = [];
		for (var i = 0; i < data.length; i++) {
			if (
				data[i].collections
					.toLowerCase()
					.split(",")
					.includes(value.toLowerCase())
			)
				c.push(data[i]);
		}
		setData(c);
	}

	useEffect(() => {
		getData();
		return function () {};
	}, []);

	return (
		<>
			<View
				style={{
					backgroundColor: theme.mode != "dark" ? "white" : "black",
					height: 35 * scaleHeight,
				}}
			></View>
			<StatusBar
				translucent={true}
				backgroundColor={"transparent"}
				barStyle={theme.mode == "dark" ? "light-content" : "dark-content"}
			/>
			<View style={styles.header}>
				<Text style={styles.headerText}>{value.toUpperCase()}</Text>
			</View>
			<View style={styles.container}>
				<Wall data={data} navigation={navigation} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	Wall: {
		width: (windowWidth / 2) * 0.88,
		height: 250 * scaleHeight,
		borderRadius: 5,
		borderTopRightRadius: 5,
	},
	wallBoundary: {
		flex: 1,
		margin: 8 * scaleHeight,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		padding: 20 * scaleHeight,
		alignItems: "center",
	},
	headerText: {
		fontSize: 20 * scaleHeight,
		fontFamily: "koliko",
	},
});

export default SpecificCollection;
