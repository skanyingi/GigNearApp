import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ACTIVE_JOBS = [
  { id: "1", title: "Casual Laborer - Construction", location: "Kibera", applicants: 14 },
  { id: "2", title: "Market Vendor Assistant", location: "Kenyatta Market", applicants: 5 },
  { id: "3", title: "Delivery Rider", location: "Central Business District", applicants: 31 },
  { id: "4", title: "House Cleaner", location: "Kilimani", applicants: 8 },
  { id: "5", title: "Security Guard", location: "Westlands", applicants: 45 },
  { id: "6", title: "Farm Hand", location: "Limuru", applicants: 3 },
  { id: "7", title: "Waitstaff / Server", location: "Karen", applicants: 22 },
  { id: "8", title: "Plumbing Assistant", location: "South B", applicants: 7 },
  { id: "9", title: "Warehouse Packer", location: "Industrial Area", applicants: 19 },
  { id: "10", title: "Car Wash Attendant", location: "Langata", applicants: 11 },
];

export default function EmployerDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={26} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Employer Dashboard</Text>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#fff" />
        </View>
      </View>

      {/* Offline banner */}
      <View style={styles.offlineBanner}>
        <Ionicons name="cloud-offline-outline" size={12} color="#15803d" />
        <Text style={styles.offlineBannerText}>OFFLINE MODE: SHOWING CACHED DATA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Post a New Job CTA */}
        <TouchableOpacity style={styles.postBtn} onPress={() => router.push("/post-job")}>
          <View style={styles.postBtnIcon}>
            <Ionicons name="briefcase-outline" size={22} color="#22c55e" />
          </View>
          <Text style={styles.postBtnText}>Post a New Job</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" style={{ marginLeft: "auto" }} />
        </TouchableOpacity>

        {/* Active Jobs header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Jobs</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>{ACTIVE_JOBS.length} TOTAL</Text>
          </View>
        </View>

        {/* Job cards */}
        {ACTIVE_JOBS.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.cardIcon}>
                <Ionicons name="briefcase-outline" size={20} color="#22c55e" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{job.title}</Text>
                <Text style={styles.cardLocation}>{job.location}</Text>
              </View>
              <Text style={styles.liveBadge}>LIVE</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.applicantsText}>{job.applicants} Applicants</Text>
              <TouchableOpacity>
                <Text style={styles.viewList}>View List</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      </ScrollView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#22c55e",
    alignItems: "center", justifyContent: "center",
  },
  offlineBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#f0fdf4",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
  },
  offlineBannerText: { fontSize: 11, color: "#15803d", fontWeight: "600", letterSpacing: 0.5 },
  scroll: { padding: 16, paddingBottom: 40 },

  postBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#22c55e",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  postBtnIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  postBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#0f172a" },
  totalBadge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  totalBadgeText: { fontSize: 12, fontWeight: "700", color: "#475569" },

  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  cardIcon: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: "#f0fdf4",
    alignItems: "center", justifyContent: "center",
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  cardLocation: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  liveBadge: { fontSize: 11, fontWeight: "700", color: "#22c55e" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 10,
  },
  applicantsText: { fontSize: 13, color: "#6b7280" },
  viewList: { fontSize: 13, fontWeight: "700", color: "#22c55e" },
});
