import { useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_ALERTS = [
  {
    id: "1",
    title: "Construction Jobs in Nairobi",
    created: "2024-03-12",
    tags: ["IMMEDIATE", "KSH 500 - 2000"],
    active: true,
  },
  {
    id: "2",
    title: "Cleaning Jobs in Westlands",
    created: "2024-03-10",
    tags: ["PART-TIME", "KSH 400 - 1000"],
    active: false,
  },
];

export default function JobAlertsScreen() {
  const router = useRouter();
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Alerts</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Info banner */}
        <View style={styles.banner}>
          <Ionicons name="information-circle-outline" size={20} color="#16a34a" />
          <Text style={styles.bannerText}>
            We'll notify you instantly when new jobs matching your preferences are posted.
          </Text>
        </View>

        {/* Alert cards */}
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconCircle}>
                <Ionicons name="notifications-outline" size={20} color="#22c55e" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{alert.title}</Text>
                <Text style={styles.cardDate}>CREATED {alert.created}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteAlert(alert.id)}>
                <Ionicons name="trash-outline" size={18} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View style={styles.tagRow}>
              {alert.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.alertStatusLabel}>Alert Status</Text>
              <Switch
                value={alert.active}
                onValueChange={() => toggleAlert(alert.id)}
                trackColor={{ false: "#e5e7eb", true: "#22c55e" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        ))}

        {alerts.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>No job alerts yet</Text>
          </View>
        )}
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  scroll: { padding: 16, paddingBottom: 40 },

  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  bannerText: { flex: 1, fontSize: 13, color: "#15803d", lineHeight: 20 },

  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  cardDate: { fontSize: 11, color: "#9ca3af", marginTop: 2, letterSpacing: 0.5 },

  tagRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  tag: {
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 11, fontWeight: "700", color: "#475569", letterSpacing: 0.3 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 12,
  },
  alertStatusLabel: { fontSize: 14, fontWeight: "600", color: "#374151" },

  empty: { alignItems: "center", marginTop: 60, gap: 12 },
  emptyText: { fontSize: 15, color: "#9ca3af" },
});
