// app/index.tsx — delete everything above and replace with this:

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "./components/FilterModal";

type Language = "en" | "sw";

export default function Index() {
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding"); // change to your actual next route
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoCircle}>
          <Ionicons name="flash" size={48} color="#22c55e" />
        </View>
        <Text style={styles.appName}>GigNear</Text>
        <Text style={styles.tagline}>KAZI MKONONI</Text>
        <Text style={styles.chooseLabel}>Choose your language</Text>
        <Text style={styles.chooseSubLabel}>Chagua lugha unayopendelea</Text>
        <View style={styles.langToggle}>
          <TouchableOpacity
            style={[styles.langBtn, selectedLang === "en" && styles.langBtnActive]}
            onPress={() => setSelectedLang("en")}
          >
            <Text style={[styles.langBtnText, selectedLang === "en" && styles.langBtnTextActive]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, selectedLang === "sw" && styles.langBtnActive]}
            onPress={() => setSelectedLang("sw")}
          >
            <Text style={[styles.langBtnText, selectedLang === "sw" && styles.langBtnTextActive]}>
              Kiswahili
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            {selectedLang === "en" ? "Continue" : "Endelea"}  ›
          </Text>
        </TouchableOpacity>
        <View style={styles.offlineBadge}>
          <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
          <Text style={styles.offlineBadgeText}>Offline Mode Optimized</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 8 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#dcfce7", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  appName: { fontSize: 28, fontWeight: "800", color: "#0f172a", marginTop: 4 },
  tagline: { fontSize: 13, fontWeight: "600", color: "#22c55e", letterSpacing: 2, marginBottom: 20 },
  chooseLabel: { fontSize: 16, fontWeight: "500", color: "#0f172a" },
  chooseSubLabel: { fontSize: 13, color: "#6b7280", marginBottom: 16 },
  langToggle: { flexDirection: "row", width: "100%", borderRadius: 12, borderWidth: 1, borderColor: "#e5e7eb", overflow: "hidden", marginBottom: 16 },
  langBtn: { flex: 1, paddingVertical: 14, alignItems: "center", backgroundColor: "#fff" },
  langBtnActive: { backgroundColor: "#22c55e" },
  langBtnText: { fontSize: 15, fontWeight: "600", color: "#374151" },
  langBtnTextActive: { color: "#fff" },
  continueBtn: { width: "100%", backgroundColor: "#22c55e", paddingVertical: 16, borderRadius: 14, alignItems: "center", marginBottom: 20 },
  continueBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },
  offlineBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#f0fdf4", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#bbf7d0" },
  offlineBadgeText: { fontSize: 12, color: "#15803d", fontWeight: "500" },
});