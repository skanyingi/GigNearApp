import { useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ScrollView, TextInput,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function PostJobScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [payDisplay, setPayDisplay] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [jobType, setJobType] = useState("Immediate");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [experience, setExperience] = useState("Entry-level");
  const [duration, setDuration] = useState("Short-term contract");
  const [remote, setRemote] = useState("On-site");
  const [category, setCategory] = useState("Manual Labor");

  const handlePost = () => {
    if (!title || !company || !location) return;
    console.log({ title, company, location, payDisplay, payAmount, jobType, description, requirements, experience, duration, remote, category });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post a New Job</Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          <Text style={styles.label}>Job Title</Text>
          <TextInput style={styles.input} placeholder="e.g. Masonry Specialist" placeholderTextColor="#9ca3af" value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Company Name</Text>
          <TextInput style={styles.input} placeholder="e.g. Maji Safi Builders" placeholderTextColor="#9ca3af" value={company} onChangeText={setCompany} />

          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} placeholder="e.g. Kibera, Nairobi" placeholderTextColor="#9ca3af" value={location} onChangeText={setLocation} />

          {/* Pay row */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Pay (Display)</Text>
              <TextInput style={styles.input} placeholder="e.g. KSh 1,000/day" placeholderTextColor="#9ca3af" value={payDisplay} onChangeText={setPayDisplay} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Pay Amount (Number)</Text>
              <TextInput style={styles.input} placeholder="1000" placeholderTextColor="#9ca3af" keyboardType="numeric" value={payAmount} onChangeText={setPayAmount} />
            </View>
          </View>

          <Text style={styles.label}>Job Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={jobType} onValueChange={setJobType} style={styles.picker}>
              <Picker.Item label="Immediate" value="Immediate" />
              <Picker.Item label="Part-Time" value="Part-Time" />
              <Picker.Item label="Full-Time" value="Full-Time" />
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.textarea} placeholder="Describe the job responsibilities..." placeholderTextColor="#9ca3af" multiline numberOfLines={4} value={description} onChangeText={setDescription} textAlignVertical="top" />

          <Text style={styles.label}>Requirements (comma separated)</Text>
          <TextInput style={styles.textarea} placeholder="e.g. Punctual, Own tools, Experience" placeholderTextColor="#9ca3af" multiline numberOfLines={3} value={requirements} onChangeText={setRequirements} textAlignVertical="top" />

          <Text style={styles.label}>Experience Level</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={experience} onValueChange={setExperience} style={styles.picker}>
              <Picker.Item label="Entry-level" value="Entry-level" />
              <Picker.Item label="Mid-level" value="Mid-level" />
              <Picker.Item label="Senior" value="Senior" />
            </Picker>
          </View>

          <Text style={styles.label}>Job Duration</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={duration} onValueChange={setDuration} style={styles.picker}>
              <Picker.Item label="Short-term contract" value="Short-term contract" />
              <Picker.Item label="Long-term contract" value="Long-term contract" />
              <Picker.Item label="Recurring" value="Recurring" />
            </Picker>
          </View>

          <Text style={styles.label}>Remote Option</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={remote} onValueChange={setRemote} style={styles.picker}>
              <Picker.Item label="On-site" value="On-site" />
              <Picker.Item label="Hybrid" value="Hybrid" />
              <Picker.Item label="Fully remote" value="Fully remote" />
            </Picker>
          </View>

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
              <Picker.Item label="Manual Labor" value="Manual Labor" />
              <Picker.Item label="Cleaning" value="Cleaning" />
              <Picker.Item label="Delivery" value="Delivery" />
              <Picker.Item label="Security" value="Security" />
              <Picker.Item label="Gardening" value="Gardening" />
              <Picker.Item label="Cooking" value="Cooking" />
            </Picker>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Post Job button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.postBtn, (!title || !company || !location) && styles.postBtnDisabled]}
          onPress={handlePost}
        >
          <Text style={styles.postBtnText}>Post Job</Text>
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
  scroll: { padding: 16, paddingBottom: 40 },
  row: { flexDirection: "row", gap: 12 },
  label: { fontSize: 13, fontWeight: "700", color: "#0f172a", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: "#0f172a",
    minHeight: 100,
    backgroundColor: "#f9fafb",
    marginBottom: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  picker: { height: 48, color: "#0f172a" },
  bottomBar: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  postBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  postBtnDisabled: { opacity: 0.5 },
  postBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
