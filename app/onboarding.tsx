import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    icon: "search",
    title: "Find Local Jobs",
    description: "Discover manual labor, service roles, and trade opportunities right in your neighborhood.",
  },
  {
    icon: "briefcase",
    title: "Apply Instantly",
    description: "Send your application in seconds. No CV needed, just your skills and location.",
  },
  {
    icon: "people",
    title: "Get Hired Fast",
    description: "Connect directly with employers near you and start earning today.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const goToHome = () => router.replace("/auth"); // change to your home route

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      goToHome();
    }
  };

  const slide = SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={goToHome}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        {/* Icon circle */}
        <View style={styles.iconCircle}>
          <Ionicons name={slide.icon as any} size={64} color="#22c55e" />
        </View>

        {/* Text */}
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      </View>

      {/* Next button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}  ›
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  skipBtn: {
    position: "absolute",
    top: 52,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d1d5db",
  },
  dotActive: {
    width: 28,
    backgroundColor: "#22c55e",
    borderRadius: 5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  nextBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
