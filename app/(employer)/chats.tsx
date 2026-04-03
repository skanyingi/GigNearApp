import { useState } from "react";
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, ScrollView, Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

const CHATS = [
  {
    id: "1",
    name: "Wanjiku (Manager)",
    message: "Habari! Please send over your National ID photo...",
    time: "09:15 AM",
    online: true,
    unread: true,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Kijiji Construction",
    message: "We would like to invite you for an interview...",
    time: "Yesterday",
    online: false,
    unread: false,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function EmployerChatsScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = CHATS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
  <Ionicons name="menu" size={26} color="#0f172a" />
</TouchableOpacity>
        <Text style={styles.headerTitle}>Employer Dashboard</Text>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#fff" />
        </View>
      </View>

      <View style={styles.offlineBanner}>
        <Ionicons name="cloud-offline-outline" size={12} color="#15803d" />
        <Text style={styles.offlineBannerText}>OFFLINE MODE: SHOWING CACHED DATA</Text>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search employers..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((chat) => (
          <TouchableOpacity
  key={chat.id}
  style={styles.chatRow}
  onPress={() =>
    router.push({
      pathname: "/chat-conversation",
      params: { id: chat.id, name: chat.name, avatar: chat.avatar },
    })
  }
>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
              {chat.online && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatTopRow}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={[styles.chatTime, chat.unread && styles.chatTimeUnread]}>{chat.time}</Text>
              </View>
              <Text style={styles.chatMessage} numberOfLines={1}>{chat.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: "#f3f4f6",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center" },
  offlineBanner: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    backgroundColor: "#f0fdf4", paddingVertical: 7,
    borderBottomWidth: 1, borderBottomColor: "#bbf7d0",
  },
  offlineBannerText: { fontSize: 11, color: "#15803d", fontWeight: "600", letterSpacing: 0.5 },
  searchWrapper: { padding: 16, paddingBottom: 8 },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#f1f5f9", borderRadius: 12,
    paddingHorizontal: 14, height: 46,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#0f172a" },
  chatRow: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: "#f3f4f6", gap: 12,
  },
  avatarWrapper: { position: "relative" },
  chatAvatar: { width: 52, height: 52, borderRadius: 26 },
  onlineDot: {
    position: "absolute", bottom: 2, right: 2,
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: "#22c55e", borderWidth: 2, borderColor: "#fff",
  },
  chatContent: { flex: 1 },
  chatTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  chatName: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  chatTime: { fontSize: 12, color: "#9ca3af" },
  chatTimeUnread: { color: "#22c55e", fontWeight: "600" },
  chatMessage: { fontSize: 13, color: "#6b7280" },
});
