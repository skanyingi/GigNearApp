import { useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, Switch, Linking,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isEmployer?: boolean;
};

export default function SettingsScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const isEmployer = pathname.startsWith("/(employer)") || pathname.includes("employer");

  const [dataSaving, setDataSaving] = useState(true);
  const [offlineAccess, setOfflineAccess] = useState(false);

  const handleSwitch = () => {
    if (isEmployer) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(employer)");
    }
  };

  const handleSignOut = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings & Data</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ACCOUNT ROLE */}
        <Text style={styles.sectionLabel}>ACCOUNT ROLE</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={18} color="#22c55e" />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Current Role</Text>
              <Text style={styles.rowSub}>
                {isEmployer ? "Employer (Hiring Talent)" : "Job Seeker (Finding Work)"}
              </Text>
            </View>
            <TouchableOpacity style={styles.switchRoleBtn} onPress={handleSwitch}>
              <Text style={styles.switchRoleBtnText}>
                {isEmployer ? "Switch to Seeker" : "Switch to Employer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.hintText}>
          {isEmployer
            ? "Switch to Seeker to browse and apply for jobs."
            : "Switch to Employer to post jobs and use M-Pesa boosting features."}
        </Text>

        {/* CONNECTIVITY & DATA */}
        <Text style={styles.sectionLabel}>CONNECTIVITY & DATA</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="flash-outline" size={18} color="#22c55e" />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Data-Saving Mode</Text>
              <Text style={styles.rowSub}>Lower quality images to save bundles</Text>
            </View>
            <Switch
              value={dataSaving}
              onValueChange={setDataSaving}
              trackColor={{ false: "#e5e7eb", true: "#22c55e" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="eye-off-outline" size={18} color="#22c55e" />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Offline Access</Text>
              <Text style={styles.rowSub}>Save recent jobs for no-internet use</Text>
            </View>
            <Switch
              value={offlineAccess}
              onValueChange={setOfflineAccess}
              trackColor={{ false: "#e5e7eb", true: "#22c55e" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* APP LANGUAGE */}
        <Text style={styles.sectionLabel}>APP LANGUAGE</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="language-outline" size={18} color="#22c55e" />
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>Language</Text>
              <Text style={styles.rowSub}>Currently: English (Kenya)</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* HELP & SUPPORT */}
        <Text style={styles.sectionLabel}>HELP & SUPPORT</Text>
        <View style={styles.supportRow}>
          <TouchableOpacity style={styles.supportCard}>
            <Ionicons name="help-circle-outline" size={28} color="#22c55e" />
            <Text style={styles.supportLabel}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportCard}
            onPress={() => Linking.openURL("https://wa.me/254700000000")}
          >
            <Ionicons name="chatbubble-outline" size={28} color="#22c55e" />
            <Text style={styles.supportLabel}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>GigNear Kenya v1.0.0</Text>
          <Text style={styles.footerSub}>Designed for speed, built for local impact.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: "#f3f4f6",
  },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  scroll: { padding: 16, paddingBottom: 40 },

  sectionLabel: {
    fontSize: 11, fontWeight: "700", color: "#6b7280",
    letterSpacing: 1, marginBottom: 10, marginTop: 20,
  },
  card: {
    borderWidth: 1, borderColor: "#e5e7eb",
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 4,
  },
  row: {
    flexDirection: "row", alignItems: "center",
    gap: 12, paddingVertical: 12,
  },
  iconCircle: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: "#f0fdf4",
    alignItems: "center", justifyContent: "center",
  },
  rowInfo: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  rowSub: { fontSize: 12, color: "#6b7280", marginTop: 1 },
  divider: { height: 1, backgroundColor: "#f3f4f6" },

  switchRoleBtn: {
    borderWidth: 1.5, borderColor: "#22c55e",
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6,
  },
  switchRoleBtnText: { fontSize: 12, fontWeight: "700", color: "#22c55e" },
  hintText: { fontSize: 11, color: "#9ca3af", marginTop: 6, marginBottom: 4 },

  changeText: { fontSize: 13, fontWeight: "700", color: "#22c55e" },

  supportRow: { flexDirection: "row", gap: 12 },
  supportCard: {
    flex: 1, borderWidth: 1, borderColor: "#e5e7eb",
    borderRadius: 14, padding: 20,
    alignItems: "center", gap: 8,
  },
  supportLabel: { fontSize: 14, fontWeight: "700", color: "#0f172a" },

  signOutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, backgroundColor: "#fef2f2",
    borderRadius: 14, paddingVertical: 16, marginTop: 24,
  },
  signOutText: { fontSize: 15, fontWeight: "700", color: "#ef4444" },

  footer: { alignItems: "center", marginTop: 24, gap: 4 },
  footerTitle: { fontSize: 13, color: "#9ca3af", fontWeight: "600" },
  footerSub: { fontSize: 11, color: "#cbd5e1" },
});
