import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, TextInput, Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  jobTitle: string;
};

export default function BoostModal({ visible, onClose, jobTitle }: Props) {
  const [phone, setPhone] = useState("254712345678");

  const handlePay = () => {
    // TODO: trigger Daraja STK Push API call here
    console.log("Initiating M-Pesa STK Push for", jobTitle, "to", phone);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Boost Job Listing</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-up" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Premium Boost card */}
        <View style={styles.boostCard}>
          <View style={styles.boostIcon}>
            <Ionicons name="flash" size={22} color="#fff" />
          </View>
          <View style={styles.boostInfo}>
            <Text style={styles.boostTitle}>Premium Boost</Text>
            <Text style={styles.boostDesc}>Get 5x more applicants for your job.</Text>
          </View>
          <Text style={styles.boostPrice}>KSh 100</Text>
        </View>

        {/* M-Pesa phone input */}
        <Text style={styles.label}>M-PESA PHONE NUMBER</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={18} color="#9ca3af" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="2547XXXXXXXX"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <Text style={styles.hint}>Enter your M-Pesa number in the format 2547XXXXXXXX</Text>

        {/* Pay button */}
        <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
          <Text style={styles.payBtnText}>Pay KSh 100 with M-Pesa  ›</Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: "800", color: "#0f172a" },

  boostCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#f0fdf4",
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  boostIcon: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: "#22c55e",
    alignItems: "center", justifyContent: "center",
  },
  boostInfo: { flex: 1 },
  boostTitle: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  boostDesc: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  boostPrice: { fontSize: 16, fontWeight: "800", color: "#0f172a" },

  label: { fontSize: 11, fontWeight: "700", color: "#6b7280", letterSpacing: 1, marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 6,
  },
  input: { flex: 1, fontSize: 16, color: "#0f172a" },
  hint: { fontSize: 11, color: "#9ca3af", marginBottom: 24 },

  payBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  payBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
