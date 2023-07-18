{/*import { StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import { Badge, HStack, Text } from "native-base";


const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "black" }}
    >
      <HStack>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive
              ]}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </HStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#9DB2BF",
  },
  inactive: {
    backgroundColor: "#9BA4B5",
  },
});
import * as Font from 'expo-font';

const CategoryFilter = (props) => {
  // Load fonts
  Font.loadAsync({
    Akkurat: require('../../fonts/Akkurat.ttf'),
  });

  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: 'black' }}
    >
      <HStack>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: 'white', fontFamily: 'Akkurat' }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive
              ]}
            >
              <Text style={{ color: 'white', fontFamily: 'Akkurat' }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </HStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  active: {
    backgroundColor: '#9DB2BF',
  },
  inactive: {
    backgroundColor: '#9BA4B5',
  },
});
export default CategoryFilter;  */}
