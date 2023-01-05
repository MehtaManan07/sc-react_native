import React from 'react';
import axios from 'axios';
import {StyleSheet, View, Text, Dimensions, FlatList} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';

const Cardd = ({ i }) => {
  return (
    <Card elevation={4}>
      <Card.Content>
        <Title>{`title ${i.index}`}</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi, velit
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const Trial = () => {
  const [activeData, setActiveData] = React.useState([]);
  const [scrollIndex, setScrollIndex] = React.useState(1);
  const [post, setPost] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  const fetchPosts = async () => {
    const url = `https://jsonplaceholder.typicode.com/todos?_page=${scrollIndex}`;
    const response = await axios.get(url);
    console.log(response)
    // @ts-ignore
    setActiveData(response.data.slice(0, 10));
    setPost(response.data);
    setLoader(false);
  };
  const fetchNextItems = async () => {
    if (scrollIndex <= 9) {
      setScrollIndex(scrollIndex + 1);
      const url = `https://jsonplaceholder.typicode.com/todos?_page=${
        scrollIndex + 1
      }`;
      const response = await axios.get(url);
      const newArray = [...activeData, ...response.data];
      setActiveData(newArray);
    } else {
      return;
    }
  };
  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        data={activeData}
        style={styles.list}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={item => item}
        initialNumToRender={10}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetchNextItems()}
        ListFooterComponent={
          scrollIndex <= 10 && scrollIndex >= 1 && <Text>Loading</Text>
        }
        showsVerticalScrollIndicator={false}
        renderItem={(i) => <Cardd i={i} />}
      />
    </View>
  );
};

export default Trial;

const styles = StyleSheet.create({
  list: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.86,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
  },
  root: {
    marginBottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  heading: {
    textAlign: 'center',
    marginTop: 24,
  },
  header: {
    padding: 10,
    backgroundColor: '#FDA085',
    width: Dimensions.get('window').width,
  },
});
