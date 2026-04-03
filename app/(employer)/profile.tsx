import {
  View, Text, StyleSheet,
  TouchableOpacity, ScrollView, Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const SKILLS = ["Masonry", "Painting", "Plumbing", "Landscaping"];

export default function EmployerProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
  <Ionicons name="menu" size={26} color="#0f172a" />
</TouchableOpacity>
        <Text style={styles.headerTitle}>Employer Dashboard</Text>
        <View style={styles.avatarThumb}>
          <Ionicons name="person" size={18} color="#fff" />
        </View>
      </View>

      <View style={styles.offlineBanner}>
        <Ionicons name="cloud-offline-outline" size={12} color="#15803d" />
        <Text style={styles.offlineBannerText}>OFFLINE MODE: SHOWING CACHED DATA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
              style={styles.profileAvatar}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#22c55e" />
            </View>
          </View>
          <Text style={styles.profileName}>Juma Omari</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text style={styles.locationText}>Nairobi, CBD</Text>
          </View>
          <View style={styles.vettedBadge}>
            <Text style={styles.vettedText}>VETTED PROFESSIONAL</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>PROFESSIONAL BIO</Text>
        <View style={styles.bioCard}>
          <Text style={styles.bioText}>
            Reliable and hardworking professional with 5 years of experience in masonry and construction. Committed to high-quality work and punctual delivery.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>VERIFIED SKILLS</Text>
        <View style={styles.skillsGrid}>
          {SKILLS.map((skill) => (
            <View key={skill} style={styles.skillChip}>
              <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Switch to Seeker Mode */}
        <TouchableOpacity style={styles.switchBtn} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.switchBtnText}>Switch to Seeker Mode</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
  avatarThumb: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#22c55e", alignItems: "center", justifyContent: "center" },
  offlineBanner: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    backgroundColor: "#f0fdf4", paddingVertical: 7,
    borderBottomWidth: 1, borderBottomColor: "#bbf7d0",
  },
  offlineBannerText: { fontSize: 11, color: "#15803d", fontWeight: "600", letterSpacing: 0.5 },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 },
  avatarSection: { alignItems: "center", marginBottom: 28 },
  avatarWrapper: { position: "relative", marginBottom: 12 },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#fff" },
  verifiedBadge: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#fff", borderRadius: 12 },
  profileName: { fontSize: 22, fontWeight: "800", color: "#0f172a", marginBottom: 4 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 10 },
  locationText: { fontSize: 13, color: "#6b7280" },
  vettedBadge: { borderWidth: 1.5, borderColor: "#22c55e", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 5 },
  vettedText: { fontSize: 11, fontWeight: "700", color: "#22c55e", letterSpacing: 1 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: "#6b7280", letterSpacing: 1, marginBottom: 10 },
  bioCard: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 14, padding: 14, marginBottom: 24 },
  bioText: { fontSize: 14, color: "#374151", lineHeight: 22 },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 28 },
  skillChip: {
    flexDirection: "row", alignItems: "center", gap: 6,
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  skillText: { fontSize: 14, fontWeight: "600", color: "#0f172a" },
  switchBtn: { backgroundColor: "#f1f5f9", borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  switchBtnText: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
});
