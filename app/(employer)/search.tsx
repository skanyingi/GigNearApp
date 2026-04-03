import { useState } from "react";
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RECENT_SEARCHES = ["Construction", "Nairobi CBD", "Daily Pay", "Plumbing"];

const CATEGORIES = [
  { label: "Manual Labor", icon: "briefcase-outline" },
  { label: "Cleaning", icon: "checkmark-circle-outline" },
  { label: "Delivery", icon: "car-outline" },
  { label: "Security", icon: "shield-outline" },
  { label: "Gardening", icon: "leaf-outline" },
  { label: "Cooking", icon: "restaurant-outline" },
];

export default function EmployerSearchScreen() {
  const [search, setSearch] = useState("");
  const [recents, setRecents] = useState(RECENT_SEARCHES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const removeRecent = (term: string) => setRecents(recents.filter((r) => r !== term));

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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, skills, or locations..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {recents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RECENT SEARCHES</Text>
            <View style={styles.chipRow}>
              {recents.map((r) => (
                <TouchableOpacity key={r} style={styles.recentChip} onPress={() => setSearch(r)}>
                  <Text style={styles.recentChipText}>{r}</Text>
                  <TouchableOpacity onPress={() => removeRecent(r)}>
                    <Ionicons name="close" size={12} color="#9ca3af" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>POPULAR CATEGORIES</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.label}
                style={[styles.categoryCard, selectedCategory === cat.label && styles.categoryCardActive]}
                onPress={() => setSelectedCategory(cat.label === selectedCategory ? null : cat.label)}
              >
                <Ionicons name={cat.icon as any} size={28} color="#22c55e" />
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  scroll: { padding: 16, paddingBottom: 40 },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12,
    paddingHorizontal: 14, height: 48, marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#0f172a" },
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: "#6b7280", letterSpacing: 1, marginBottom: 12 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  recentChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  recentChipText: { fontSize: 13, fontWeight: "500", color: "#374151" },
  categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  categoryCard: {
    width: "47%", borderWidth: 1, borderColor: "#e5e7eb",
    borderRadius: 14, padding: 20, alignItems: "center", gap: 10,
  },
  categoryCardActive: { borderColor: "#22c55e", borderWidth: 2 },
  categoryLabel: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
});
