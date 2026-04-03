import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, ScrollView, Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const CATEGORIES = ["Manual Labor", "Cleaning", "Delivery", "Security"];
const JOB_TYPES = ["Immediate", "Part-Time", "Full-Time"];
const EXPERIENCE = ["Entry-level", "Mid-level", "Senior"];
const DURATION = ["Short-term contract", "Long-term contract"];
const REMOTE = ["Fully remote", "Hybrid", "On-site"];

type Filters = {
  categories: string[];
  jobTypes: string[];
  experience: string[];
  duration: string[];
  remote: string[];
  minPay: number;
  maxPay: number;
};

const DEFAULT_FILTERS: Filters = {
  categories: [],
  jobTypes: [],
  experience: [],
  duration: [],
  remote: [],
  minPay: 0,
  maxPay: 50000,
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
};

export default function FilterModal({ visible, onClose, onApply }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const toggle = (key: keyof Filters, value: string) => {
    const current = filters[key] as string[];
    setFilters({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const clearAll = () => setFilters(DEFAULT_FILTERS);

  const ChipGroup = ({
    label,
    options,
    filterKey,
  }: {
    label: string;
    options: string[];
    filterKey: keyof Filters;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const active = (filters[filterKey] as string[]).includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => toggle(filterKey, opt)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter Jobs</Text>
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearAll}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          <ChipGroup label="CATEGORIES" options={CATEGORIES} filterKey="categories" />
          <ChipGroup label="JOB TYPE" options={JOB_TYPES} filterKey="jobTypes" />
          <ChipGroup label="EXPERIENCE LEVEL" options={EXPERIENCE} filterKey="experience" />
          <ChipGroup label="JOB DURATION" options={DURATION} filterKey="duration" />
          <ChipGroup label="REMOTE OPTIONS" options={REMOTE} filterKey="remote" />

          {/* Pay Range */}
          <View style={styles.section}>
            <View style={styles.payHeader}>
              <Text style={styles.sectionLabel}>PAY RANGE (KSH)</Text>
              <Text style={styles.payRange}>
                {filters.minPay.toLocaleString()} - {filters.maxPay.toLocaleString()}
              </Text>
            </View>

            <Text style={styles.sliderLabel}>MIN PAY</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${(filters.minPay / 50000) * 100}%` }]} />
              {[0, 10000, 20000, 30000, 40000, 50000].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[styles.sliderThumb, filters.minPay === v && styles.sliderThumbActive]}
                  onPress={() => setFilters({ ...filters, minPay: v })}
                />
              ))}
            </View>
            <View style={styles.sliderTicks}>
              <Text style={styles.sliderTick}>0</Text>
              <Text style={styles.sliderTick}>{filters.minPay.toLocaleString()}</Text>
            </View>

            <Text style={[styles.sliderLabel, { marginTop: 12 }]}>MAX PAY</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${(filters.maxPay / 50000) * 100}%` }]} />
              {[0, 10000, 20000, 30000, 40000, 50000].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[styles.sliderThumb, filters.maxPay === v && styles.sliderThumbActive]}
                  onPress={() => setFilters({ ...filters, maxPay: v })}
                />
              ))}
            </View>
            <View style={styles.sliderTicks}>
              <Text style={styles.sliderTick}>0</Text>
              <Text style={styles.sliderTick}>{filters.maxPay.toLocaleString()}</Text>
            </View>
          </View>

          {/* Save as Job Alert */}
          <TouchableOpacity style={styles.alertBtn}>
            <Ionicons name="notifications-outline" size={18} color="#374151" />
            <Text style={styles.alertBtnText}>Save as Job Alert</Text>
          </TouchableOpacity>

          {/* Clear All Filters */}
          <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
            <Text style={styles.clearBtnText}>Clear All Filters</Text>
          </TouchableOpacity>

          {/* Show Jobs */}
          <TouchableOpacity
            style={styles.showBtn}
            onPress={() => { onApply(filters); onClose(); }}
          >
            <Text style={styles.showBtnText}>Show Jobs</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#e5e7eb",
    alignSelf: "center",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  clearAll: { fontSize: 14, fontWeight: "700", color: "#22c55e" },

  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 1,
    marginBottom: 12,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  chipActive: { borderColor: "#22c55e", backgroundColor: "#fff" },
  chipText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  chipTextActive: { color: "#22c55e" },

  payHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  payRange: { fontSize: 13, fontWeight: "700", color: "#22c55e" },
  sliderLabel: { fontSize: 11, fontWeight: "600", color: "#9ca3af", marginBottom: 10 },
  sliderTrack: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  sliderFill: { position: "absolute", left: 0, height: 4, backgroundColor: "#22c55e", borderRadius: 2 },
  sliderThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#e5e7eb",
    zIndex: 1,
  },
  sliderThumbActive: { backgroundColor: "#22c55e" },
  sliderTicks: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  sliderTick: { fontSize: 11, color: "#9ca3af" },

  alertBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 12,
  },
  alertBtnText: { fontSize: 15, fontWeight: "600", color: "#374151" },

  clearBtn: {
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
  },
  clearBtnText: { fontSize: 15, fontWeight: "600", color: "#374151" },

  showBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  showBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
