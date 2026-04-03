import { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, KeyboardAvoidingView,
  Platform, ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Role = "worker" | "employer";

export default function AuthScreen() {
  const [role, setRole] = useState<Role>("worker");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const handleGetStarted = () => {
  if (!input) return;
  if (role === "employer") {
    router.replace("/(employer)");
  } else {
    router.replace("/(tabs)");
  }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Top bar */}
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <Ionicons name="flash" size={20} color="#22c55e" />
              <Text style={styles.brandText}>GigNear</Text>
            </View>
            <View style={styles.offlineBadge}>
              <Ionicons name="cloud-offline-outline" size={12} color="#22c55e" />
              <Text style={styles.offlineText}>OFFLINE MODE</Text>
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Login or Sign Up</Text>
          <Text style={styles.subtitle}>Find work or hire local talent instantly.</Text>

          {/* Role toggle */}
          <Text style={styles.sectionLabel}>I am looking to...</Text>
          <View style={styles.roleToggle}>
            <TouchableOpacity
              style={[styles.roleBtn, role === "worker" && styles.roleBtnActive]}
              onPress={() => setRole("worker")}
            >
              <Text style={[styles.roleBtnText, role === "worker" && styles.roleBtnTextActive]}>
                Find Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, role === "employer" && styles.roleBtnActive]}
              onPress={() => setRole("employer")}
            >
              <Text style={[styles.roleBtnText, role === "employer" && styles.roleBtnTextActive]}>
                Hire Talent
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone / Email input */}
          <Text style={styles.inputLabel}>Phone Number or Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={18} color="#9ca3af" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="+254 7XX XXX XXX"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={input}
              onChangeText={setInput}
            />
          </View>
		  {/* Password */}
<Text style={styles.inputLabel}>Password</Text>
<View style={styles.inputWrapper}>
  <Ionicons name="lock-closed-outline" size={18} color="#9ca3af" style={styles.inputIcon} />
  <TextInput
    style={styles.input}
    placeholder="Enter your password"
    placeholderTextColor="#9ca3af"
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={18}
      color="#9ca3af"
    />
  </TouchableOpacity>
</View>
			
          {/* Get Started */}
          <TouchableOpacity style={styles.ctaBtn} onPress={handleGetStarted}>
            <Text style={styles.ctaBtnText}>Get Started</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-google" size={18} color="#374151" />
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-facebook" size={18} color="#374151" />
              <Text style={styles.socialBtnText}>Facebook</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 6 },
  brandText: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  offlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0fdf4",
  },
  offlineText: { fontSize: 10, color: "#22c55e", fontWeight: "700", letterSpacing: 0.5 },
  title: { fontSize: 26, fontWeight: "800", color: "#0f172a", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 28 },
  sectionLabel: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 10 },
  roleToggle: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#f9fafb",
  },
  roleBtn: { flex: 1, paddingVertical: 13, alignItems: "center" },
  roleBtnActive: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  roleBtnText: { fontSize: 14, fontWeight: "600", color: "#6b7280" },
  roleBtnTextActive: { color: "#22c55e" },
  inputLabel: { fontSize: 13, fontWeight: "700", color: "#0f172a", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: "#0f172a" },
  ctaBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  ctaBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e5e7eb" },
  dividerText: { fontSize: 11, color: "#9ca3af", fontWeight: "600", letterSpacing: 1 },
  socialRow: { flexDirection: "row", gap: 12 },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 13,
  },
  socialBtnText: { fontSize: 14, fontWeight: "600", color: "#374151" },
});
