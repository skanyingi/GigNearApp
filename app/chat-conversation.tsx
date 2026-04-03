import { useState, useRef } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, TextInput, ScrollView,
  KeyboardAvoidingView, Platform, Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_MESSAGES: Record<string, { id: string; text: string; from: "me" | "them"; time: string }[]> = {
  "1": [
    { id: "1", text: "Habari! Nimepata kazi yako ya ujenzi.", from: "them", time: "09:10 AM" },
    { id: "2", text: "Ninahitaji wafanyakazi wawili kesho asubuhi.", from: "them", time: "09:11 AM" },
    { id: "3", text: "Sawa, nitakuwa tayari saa mbili asubuhi.", from: "me", time: "09:13 AM" },
    { id: "4", text: "Habari! Please send over your National ID photo...", from: "them", time: "09:15 AM" },
  ],
  "2": [
    { id: "1", text: "We would like to invite you for an interview...", from: "them", time: "Yesterday" },
    { id: "2", text: "Please come to our offices in Industrial Area.", from: "them", time: "Yesterday" },
  ],
};

export default function ChatConversationScreen() {
  const router = useRouter();
  const { id, name, avatar } = useLocalSearchParams<{ id: string; name: string; avatar: string }>();
const [messages, setMessages] = useState(() => INITIAL_MESSAGES[id ?? "1"] ?? []);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: input.trim(),
      from: "me" as const,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Image
          source={{ uri: avatar ?? "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.headerAvatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{name ?? "Wanjiku (Manager)"}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color="#22c55e" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.bubble, msg.from === "me" ? styles.bubbleMe : styles.bubbleThem]}
            >
              <Text style={[styles.bubbleText, msg.from === "me" && styles.bubbleTextMe]}>
                {msg.text}
              </Text>
              <Text style={[styles.bubbleTime, msg.from === "me" && styles.bubbleTimeMe]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerAvatar: { width: 38, height: 38, borderRadius: 19 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  headerStatus: { fontSize: 12, color: "#22c55e" },

  messages: { padding: 16, paddingBottom: 8, gap: 10 },

  bubble: {
    maxWidth: "75%",
    borderRadius: 16,
    padding: 12,
    paddingBottom: 6,
  },
  bubbleMe: {
    alignSelf: "flex-end",
    backgroundColor: "#22c55e",
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f5f9",
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, color: "#0f172a", lineHeight: 20 },
  bubbleTextMe: { color: "#fff" },
  bubbleTime: { fontSize: 10, color: "#9ca3af", marginTop: 4, textAlign: "right" },
  bubbleTimeMe: { color: "rgba(255,255,255,0.7)" },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0f172a",
    maxHeight: 100,
    backgroundColor: "#f9fafb",
  },
  sendBtn: {
    width: 42, height: 42,
    borderRadius: 21,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: "#d1d5db" },
});
