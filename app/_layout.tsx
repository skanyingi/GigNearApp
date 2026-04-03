import { Stack } from "expo-router";

export default function RootLayout() {
  return (
	<Stack>
  
		<Stack.Screen name="index" options={{ title: "Home"}} />
		<Stack.Screen name="onboarding" options={{headerShown:false }} />
		<Stack.Screen name="auth" options={{ headerShown: false }} />
		<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		<Stack.Screen name="job-alerts" options={{ headerShown: false }} />
		<Stack.Screen name="job-detail" options={{ headerShown: false }} />
		<Stack.Screen name="apply" options={{ headerShown: false }} />
		<Stack.Screen name="employer-dashboard" options={{ headerShown: false }} />
		<Stack.Screen name="post-job" options={{ headerShown: false }} />
		<Stack.Screen name="(employer)" options={{ headerShown: false }} />
		<Stack.Screen name="settings" options={{ headerShown: false }} />
		<Stack.Screen name="chat-conversation" options={{ headerShown: false }} />
	</Stack>
	);
}
