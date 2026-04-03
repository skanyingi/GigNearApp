import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, Platform
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
//import { Platform } from "react-native";


const MAP_HTML = `
  <!DOCTYPE html><html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>body,html,#map{margin:0;padding:0;height:100%;width:100%;}</style>
  </head>
  <body><div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl:false, attributionControl:false }).setView([-1.3133, 36.7897], 15);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var icon = L.divIcon({html:'<div style="background:#22c55e;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',iconSize:[16,16],className:''});
    L.marker([-1.3133,36.7897],{icon}).addTo(map);
  </script>
  </body></html>
`;

function MapComponent() {
  if (Platform.OS === "web") {
    return (
      <iframe
        srcDoc={MAP_HTML}
        style={{ width: "100%", height: 150, border: "none", borderRadius: 12 }}
        scrolling="no"
      />
    );
  }
  return (
    <WebView
      style={{ flex: 1, borderRadius: 12 }}
      source={{ html: MAP_HTML }}
      scrollEnabled={false}
    />
  );
}

export default function JobDetailScreen() {
  const router = useRouter();
  const { id, title, pay, location, distance, description, badge } =
    useLocalSearchParams<{
      id: string;
      title: string;
      pay: string;
      location: string;
      distance: string;
      description: string;
      badge: string;
    }>();

  const infoCards = [
    { label: "DAILY PAY", value: pay?.replace("KSh ", "").replace(" per day", " per") },
    { label: "STARTS", value: badge === "IMMEDIATE" ? "Immediate" : "Flexible" },
    { label: "EXPERIENCE", value: "Entry-level" },
    { label: "DURATION", value: "Short-term contract" },
    { label: "REMOTE", value: "On-site" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero banner */}
        <View style={styles.hero}>
          <Ionicons name="briefcase-outline" size={56} color="#22c55e" />
        </View>

        {/* Title */}
        <Text style={styles.jobTitle}>{title}</Text>

        {/* Employer */}
        <View style={styles.employerRow}>
          <View style={styles.employerAvatar}>
            <Text style={styles.employerAvatarText}>M</Text>
          </View>
          <View>
            <View style={styles.employerNameRow}>
              <Text style={styles.employerName}>Maji Safi Builders</Text>
              <View style={styles.activeDot} />
            </View>
            <Text style={styles.verified}>Verified Employer</Text>
          </View>
        </View>

        {/* Info grid — first 2 */}
        <View style={styles.infoGrid}>
          {infoCards.slice(0, 2).map((c) => (
            <View key={c.label} style={styles.infoCard}>
              <Text style={styles.infoLabel}>{c.label}</Text>
              <Text style={styles.infoValue}>{c.value}</Text>
            </View>
          ))}
        </View>

        {/* Info grid — last 3 */}
        <View style={styles.infoGrid}>
          {infoCards.slice(2).map((c) => (
            <View key={c.label} style={[styles.infoCard, { flex: 1 }]}>
              <Text style={styles.infoLabel}>{c.label}</Text>
              <Text style={styles.infoValue}>{c.value}</Text>
            </View>
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Ionicons name="location-outline" size={18} color="#22c55e" />
            <Text style={styles.locationTitle}>Location</Text>
          </View>
          <Text style={styles.locationText}>{location}, Near DC Office, Nairobi</Text>
          {/* Map placeholder */}

			<View style={styles.map}>
				<MapComponent />
			</View>

        </View>

        {/* Job Description */}
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.descText}>
          {description ?? "We are looking for hardworking casual laborers for an ongoing residential site. Tasks include mixing mortar, carrying materials, and general site cleaning. No prior experience required, but physical fitness is essential."}
        </Text>

        {/* Requirements */}
        <View style={styles.requirementsCard}>
          <View style={styles.requirementsHeader}>
            <Ionicons name="information-circle-outline" size={18} color="#22c55e" />
            <Text style={styles.requirementsTitle}>Requirements</Text>
          </View>
          {[
            "Must arrive by 7:30 AM daily",
            "Carry your own drinking water",
            "Protective boots recommended",
          ].map((r) => (
            <View key={r} style={styles.requirementRow}>
              <View style={styles.bullet} />
              <Text style={styles.requirementText}>{r}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={20} color="#22c55e" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() =>
            router.push({
              pathname: "/apply",
              params: { title, employer: "Maji Safi Builders" },
            })
          }
        >
          <Text style={styles.applyBtnText}>Apply Now  ›</Text>
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

  hero: {
    width: "100%",
    height: 160,
    backgroundColor: "#dcfce7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  jobTitle: { fontSize: 24, fontWeight: "900", color: "#0f172a", marginBottom: 14 },

  employerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  employerAvatar: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: "#dcfce7", alignItems: "center", justifyContent: "center",
  },
  employerAvatarText: { fontSize: 16, fontWeight: "800", color: "#22c55e" },
  employerNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  employerName: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" },
  verified: { fontSize: 12, color: "#6b7280", marginTop: 2 },

  infoGrid: { flexDirection: "row", gap: 10, marginBottom: 10 },
  infoCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoLabel: { fontSize: 10, fontWeight: "700", color: "#9ca3af", letterSpacing: 0.8, marginBottom: 4 },
  infoValue: { fontSize: 15, fontWeight: "700", color: "#0f172a" },

  locationCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  locationHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  locationTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  locationText: { fontSize: 13, color: "#6b7280", marginBottom: 10 },
  map: {
  height: 150,
  borderRadius: 12,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#e5e7eb",
},

  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  descText: { fontSize: 14, color: "#6b7280", lineHeight: 22, marginBottom: 20 },

  requirementsCard: {
    backgroundColor: "#f0fdf4",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  requirementsHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  requirementsTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  requirementRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#22c55e" },
  requirementText: { fontSize: 13, color: "#374151" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  shareBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#22c55e",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  applyBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
