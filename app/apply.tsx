import { useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, TextInput,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ApplyScreen() {
  const router = useRouter();
  const { title, employer } = useLocalSearchParams<{ title: string; employer: string }>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pitch, setPitch] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) return;
    // TODO: send to API
    console.log({ name, phone, pitch });
    router.push("/(tabs)"); // back to jobs after submit
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply for Job</Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Job summary card */}
          <View style={styles.jobCard}>
            <View style={styles.jobAvatar}>
              <Text style={styles.jobAvatarText}>M</Text>
            </View>
            <View>
              <Text style={styles.jobTitle}>{title ?? "Casual Laborer - Construction"}</Text>
              <Text style={styles.jobEmployer}>{employer ?? "Maji Safi Builders"}</Text>
            </View>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />

          {/* Phone */}
          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="+254 7XX XXX XXX"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Pitch */}
          <Text style={styles.label}>WHY ARE YOU A GOOD FIT?</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Briefly describe your experience..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={5}
            value={pitch}
            onChangeText={setPitch}
            textAlignVertical="top"
          />

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, (!name || !phone) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>Submit Application  ›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  scroll: { padding: 16 },

  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  jobAvatar: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: "#dcfce7", alignItems: "center", justifyContent: "center",
  },
  jobAvatarText: { fontSize: 18, fontWeight: "800", color: "#22c55e" },
  jobTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  jobEmployer: { fontSize: 13, color: "#22c55e", marginTop: 2 },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 20,
    backgroundColor: "#f9fafb",
  },
  phoneInput: {
    color: "#22c55e",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#0f172a",
    minHeight: 120,
    backgroundColor: "#f9fafb",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  submitBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
