import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import LoadingImage from "../LoadingImage";
import { STANDARD_HEIGHT, STANDARD_WIDTH } from "../../constants";
import { useTheme } from "../../themes";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "../StyledComponents";

const scaleWidth = Dimensions.get("window").width / STANDARD_WIDTH;
const scaleHeight = Dimensions.get("window").height / STANDARD_HEIGHT;

const windowWidth = Dimensions.get("window").width;
//TODO: Combine scollableCollection and wall
const Wall = ({ ...props }) => {
	const theme = useTheme();
	const length = props.data.length;

	function renderWalls() {
		if (!props.data || props.data.length == 0)
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
						Loading your favorite walls.....
					</Text>
				</View>
			);
		return (
			<View style={{ paddingHorizontal: 10 * scaleWidth }}>
				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={props.data}
					renderItem={renderItem}
					keyExtractor={(item) => item.url}
					numColumns={2}
					scrollsToTop={false}
				/>
			</View>
		);
	}

	const Item = ({ item, onPress }) => (
		<View>
			<TouchableOpacity
				style={styles.wallBoundary}
				onPress={onPress}
				activeOpacity={0.9}
			>
				<LoadingImage source={item} style={styles.Wall} />
			</TouchableOpacity>
		</View>
	);

	const renderItem = ({ item }) => {
		return (
			<Item
				item={item}
				onPress={() =>
					props.navigation.navigate("Wall", {
						item: item,
					})
				}
			/>
		);
	};
	return <>{renderWalls()}</>;
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
		margin: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		fontSize: 25 * scaleHeight,
		color: "white",
		alignItems: "center",
		alignSelf: "center",
		textAlign: "center",
		fontFamily: "koliko",
		justifyContent: "center",
		position: "absolute",
		top: 95 * scaleHeight,
	},
	header: { position: "absolute", left: windowWidth / 2 },
});

export default Wall;
