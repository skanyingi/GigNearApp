import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, FlatList, Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../components/FilterModal";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS = ["All Jobs", "Immediate", "Part-time"];


const JOBS = [
  {
    id: "1",
    title: "Casual Laborer - Construction",
    pay: "KSh 800 per day",
    location: "Kibera",
    distance: "0.8 km away",
    description: "We are looking for hardworking casual laborers for an ongoing residential site. Tasks include mixing mortar, carrying materials, and general site cleaning.",
    tags: ["Entry-level", "Short-term contract", "On-site"],
    badge: "IMMEDIATE",
    category: "Manual Labor",
  },
  {
    id: "2",
    title: "Market Vendor Assistant",
    pay: "KSh 500 per day",
    location: "Gikomba",
    distance: "1.2 km away",
    description: "Needed to help manage a busy market stall. Duties include arranging goods, handling customers and cash.",
    tags: ["Entry-level", "Flexible hours", "On-site"],
    badge: null,
    category: "Manual Labor",
  },
  {
    id: "3",
    title: "House Cleaner",
    pay: "KSh 1,200 per day",
    location: "Lavington",
    distance: "3.5 km away",
    description: "Looking for a reliable house cleaner for a 4-bedroom home. Once a week, every Saturday morning.",
    tags: ["Part-time", "Recurring", "On-site"],
    badge: "IMMEDIATE",
    category: "Cleaning",
  },
  {
    id: "4",
    title: "Office Cleaner",
    pay: "KSh 700 per day",
    location: "Westlands",
    distance: "2.1 km away",
    description: "Required to clean offices every morning before 8AM. Must be thorough and trustworthy.",
    tags: ["Full-Time", "Long-term contract", "On-site"],
    badge: null,
    category: "Cleaning",
  },
  {
    id: "5",
    title: "Motorbike Delivery Rider",
    pay: "KSh 1,500 per day",
    location: "CBD",
    distance: "1.0 km away",
    description: "Delivering packages across Nairobi. Must have a valid license and own motorbike. Fuel allowance included.",
    tags: ["Full-Time", "Short-term contract", "On-site"],
    badge: "IMMEDIATE",
    category: "Delivery",
  },
  {
    id: "6",
    title: "Supermarket Delivery Guy",
    pay: "KSh 900 per day",
    location: "Kasarani",
    distance: "5.2 km away",
    description: "Delivering grocery orders to customers within Kasarani. Bicycle provided.",
    tags: ["Part-time", "Flexible hours", "On-site"],
    badge: null,
    category: "Delivery",
  },
  {
    id: "7",
    title: "Night Security Guard",
    pay: "KSh 1,000 per day",
    location: "Karen",
    distance: "8.4 km away",
    description: "Guarding a residential compound at night from 7PM to 6AM. Must have certificate of good conduct.",
    tags: ["Full-Time", "Long-term contract", "On-site"],
    badge: "IMMEDIATE",
    category: "Security",
  },
  {
    id: "8",
    title: "Event Security",
    pay: "KSh 1,500 per day",
    location: "Parklands",
    distance: "3.0 km away",
    description: "Required for a 2-day corporate event. Crowd management and access control duties.",
    tags: ["Short-term contract", "On-site"],
    badge: null,
    category: "Security",
  },
  {
    id: "9",
    title: "Garden Maintenance Worker",
    pay: "KSh 800 per day",
    location: "Runda",
    distance: "6.1 km away",
    description: "Mowing, trimming and general garden upkeep for a large home. Tools provided.",
    tags: ["Part-time", "Recurring", "On-site"],
    badge: null,
    category: "Gardening",
  },
  {
    id: "10",
    title: "Home Cook",
    pay: "KSh 1,800 per day",
    location: "Kileleshwa",
    distance: "4.3 km away",
    description: "Cooking daily meals for a family of 5. Must know Swahili dishes and basic continental.",
    tags: ["Full-Time", "Long-term contract", "On-site"],
    badge: "IMMEDIATE",
    category: "Cooking",
  },
];

export default function JobsScreen() {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
	
  const router = useRouter();	
  const { category } = useLocalSearchParams<{ category: string }>();
  const filtered = JOBS.filter((j) => {
  const matchSearch = j.title.toLowerCase().includes(search.toLowerCase());
  const matchFilter =
    activeFilter === "All Jobs" ||
    j.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
    j.badge === activeFilter.toUpperCase();
  const matchCategory = !category || j.category === category;
  return matchSearch && matchFilter && matchCategory;
});

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
			<Ionicons name="menu" size={26} color="#0f172a" />
		</TouchableOpacity>
        <Text style={styles.headerTitle}>GigNear</Text>
        <View style={styles.headerRight}>
         <TouchableOpacity style={styles.bellBtn} onPress={() => router.push("/job-alerts")}>
  <Ionicons name="notifications-outline" size={22} color="#0f172a" />
  <View style={styles.notifDot} />
</TouchableOpacity>
          <View style={styles.avatar}>
            <Ionicons name="person" size={18} color="#fff" />
          </View>
        </View>
      </View>

      {/* Offline banner */}
      <View style={styles.offlineBanner}>
        <Ionicons name="cloud-offline-outline" size={12} color="#15803d" />
        <Text style={styles.offlineBannerText}>OFFLINE MODE: SHOWING CACHED DATA</Text>
      </View>
	  
	  
	  {/* Employer promo banner */}
<TouchableOpacity style={styles.employerBanner} onPress={() => router.replace("/(employer)")}>
  <View style={styles.employerBannerLeft}>
    <View style={styles.employerBannerIcon}>
      <Ionicons name="flash" size={16} color="#22c55e" />
    </View>
    <View>
      <Text style={styles.employerBannerTitle}>EMPLOYER FEATURES</Text>
      <Text style={styles.employerBannerSub}>Post jobs & boost with M-Pesa</Text>
    </View>
  </View>
  <TouchableOpacity style={styles.switchNowBtn} onPress={() => router.replace("/(employer)")}>
    <Text style={styles.switchNowText}>Switch Now</Text>
  </TouchableOpacity>
</TouchableOpacity>



      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
			<TouchableOpacity style={styles.settingsBtn} onPress={() => setShowFilter(true)}>
            <Ionicons name="settings-outline" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Job cards */}
        {filtered.map((job) => (
          <View key={job.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{job.title}</Text>
              {job.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{job.badge}</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardPay}>{job.pay}</Text>
            <View style={styles.cardLocation}>
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text style={styles.cardLocationText}>{job.location} • {job.distance}</Text>
            </View>
            <TouchableOpacity onPress={() => setExpandedId(expandedId === job.id ? null : job.id)}>
  <Text style={styles.cardDesc} numberOfLines={expandedId === job.id ? undefined : 2}>
    {job.description}
  </Text>
  <Text style={styles.readMore}>
    {expandedId === job.id ? "Show less" : "Read more"}
  </Text>
</TouchableOpacity>
            <View style={styles.tagRow}>
              {job.tags.map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
            <View style={styles.cardFooter}>
             <TouchableOpacity
  style={styles.applyBtn}
  onPress={() =>
    router.push({
      pathname: "/job-detail",
      params: {
        id: job.id,
        title: job.title,
        pay: job.pay,
        location: job.location,
        distance: job.distance,
        description: job.description,
        badge: job.badge ?? "",
      },
    })
  }
>
  <Text style={styles.applyBtnText}>Apply Now</Text>
</TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn}>
                <Ionicons name="briefcase-outline" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

      </ScrollView>
	  <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters) => {
          console.log("Applied filters:", filters);
        }}
      />
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
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  bellBtn: { padding: 4 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
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

  scroll: { padding: 16, paddingBottom: 32 },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#0f172a" },

  filterRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  filterChipActive: { backgroundColor: "#22c55e", borderColor: "#22c55e" },
  filterChipText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  filterChipTextActive: { color: "#fff" },
  settingsBtn: {
    marginLeft: "auto",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#0f172a", flex: 1, marginRight: 8 },
  badge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: { fontSize: 10, fontWeight: "700", color: "#475569", letterSpacing: 0.5 },
  cardPay: { fontSize: 14, fontWeight: "700", color: "#22c55e", marginBottom: 6 },
  cardLocation: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8 },
  cardLocationText: { fontSize: 13, color: "#6b7280" },
  cardDesc: { fontSize: 13, color: "#6b7280", lineHeight: 20, marginBottom: 10 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  tag: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { fontSize: 11, color: "#475569", fontWeight: "500" },
  cardFooter: { flexDirection: "row", gap: 10, alignItems: "center" },
  applyBtn: {
    flex: 1,
    backgroundColor: "#22c55e",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  applyBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  saveBtn: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 11,
  },
  notifDot: {
  position: "absolute",
  top: 2,
  right: 2,
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#ef4444",
  borderWidth: 1.5,
  borderColor: "#fff",
},
 readMore: {
  fontSize: 12,
  color: "#22c55e",
  fontWeight: "600",
  marginTop: 2,
  marginBottom: 6,
},
employerBanner: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#0f172a",
  marginHorizontal: 16,
  marginTop: 12,
  borderRadius: 14,
  padding: 14,
},
employerBannerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
employerBannerIcon: {
  width: 36, height: 36, borderRadius: 8,
  backgroundColor: "#1e293b",
  alignItems: "center", justifyContent: "center",
  borderWidth: 1, borderColor: "#22c55e",
},
employerBannerTitle: { fontSize: 11, fontWeight: "800", color: "#22c55e", letterSpacing: 0.5 },
employerBannerSub: { fontSize: 12, color: "#94a3b8", marginTop: 1 },
switchNowBtn: {
  backgroundColor: "#fff",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 7,
},
switchNowText: { fontSize: 12, fontWeight: "700", color: "#0f172a" },
});
