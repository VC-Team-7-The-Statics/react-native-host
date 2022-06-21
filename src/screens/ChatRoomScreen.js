import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client/dist/socket.io";

import getEnvVars from "../../secrets";
import dayjs from "../services/time";
import Screen from "../components/Screen";
import IntegrationService from "../services/integration";
import ApiService from "../services/Api";

const { SERVER_URL } = getEnvVars();

const ApiInstance = new ApiService(axios);
const Storage = new IntegrationService(AsyncStorage);

const socket = io(SERVER_URL, { jsonp: false });

function ChatRoomScreen({ route }) {
  const { userId, roomId, friendId, friendImage, friendName } = route.params;

  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [friendInfoAsync, setFriendInfoAsync] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    const requestFriendInfo = async (id) => {
      const token = await Storage.getTokenFromStorage();

      const { data } = await ApiInstance.getFriendInfo(id, token)().catch((e) =>
        setError(JSON.stringify(e))
      );

      if (!data.success) {
        return setError(data.message);
      }

      const friend = {
        name: data.user.name,
        image: data.user.image,
      };

      setFriendInfoAsync(friend);
    };

    if (!friendImage || !friendName) {
      requestFriendInfo(friendId);
    }
  }, [friendId, friendImage, friendName]);

  useEffect(() => {
    socket.connect();

    socket.emit("joinRoom", roomId);

    socket.on("joinedRoom", (chatHistory) => {
      setChats(chatHistory);
    });

    socket.on("chat-broadcast", (chat) => {
      setChats((prev) => [...prev, chat]);
    });

    socket.on("error", (error) => {
      setError(error);
    });

    return () => socket.close();
  }, [roomId]);

  const send = () => {
    const chat = {
      id: userId,
      text: input,
      createdAt: Date.now(),
    };

    setChats((prev) => [...prev, chat]);

    socket.emit("chat", chat);
    setInput("");
  };

  return (
    <Screen>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: friendImage || friendInfoAsync.image || "" }}
          style={styles.thumbnail}
        />
        <Text style={styles.thumbnailText} numberOfLines={1}>
          {friendName || friendInfoAsync.name || ""}
        </Text>
        <Text>{error}</Text>
      </View>
      <View style={styles.messages}>
        <FlatList
          data={chats.slice().reverse()}
          keyExtractor={(chat, i) => `${chat.createdAt} ${i}`}
          inverted
          renderItem={({ item: chat }) => (
            <View
              style={
                chat.id === friendId
                  ? styles.friendMessageBox
                  : styles.myMessageBox
              }
            >
              <Text>{chat.text}</Text>
              <Text
                style={chat.id === friendId ? styles.friendText : styles.myText}
              >
                {dayjs(chat.createdAt).format("L LT")}
              </Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력해 주세요"
            onChangeText={setInput}
            value={input}
          />
          <TouchableOpacity onPress={send} style={styles.touchable}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  thumbnailText: {
    fontSize: 18,
    fontWeight: "600",
  },
  messages: {
    flex: 1,
  },
  friendMessageBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#eaeaea",
    marginVertical: 5,
    marginRight: 100,
    marginLeft: 15,
  },
  myMessageBox: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#d1ecc8",
    marginVertical: 5,
    marginLeft: 100,
    marginRight: 15,
  },
  friendText: {
    alignSelf: "flex-start",
    color: "grey",
  },
  myText: {
    alignSelf: "flex-end",
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#ffffff",
  },
  input: {
    backgroundColor: "#eaeaea",
    height: 50,
    borderRadius: 5,
    width: "80%",
    paddingHorizontal: 25,
    marginRight: 10,
  },
  touchable: {
    backgroundColor: "#d1ecc8",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
  },
  buttonText: {
    color: "#55734a",
  },
});

export default ChatRoomScreen;
