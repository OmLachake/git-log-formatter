import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavbar from "@/components/Navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Git Log Formatter",
	description:
		"Generate the style of git log as you want it. Format it with colors, and style that you want.",
	keywords: [
		"git",
		"pretty log",
		"foramtter",
		"git-log-formatter",
		"pretty format",
		"helper tool",
	],
	openGraph: {
		url: "https://gitlogformatter.netlify.app",
		type: "website",
		title: "Git Log Formatter",
		description:
			"Generate the style of git log as you want it. Format it with colors, and style that you want.",
		images: [
			{
				url: "/favicon.ico",
				width: 300,
				height: 300,
				alt: "git helper tool",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Git Log Formatter",
		description:
			"Generate the style of git log as you want it. Format it with colors, and style that you want.",
		images: [
			{
				url: "/favicon.ico",
				width: 300,
				height: 300,
				alt: "git helper tool",
			},
		],
	},
	alternates: {
		canonical: "gitlogformatter.netlify.app",
	},
	verification: {
		google: "IcaUmsJRN405O6p3m3-leIvYIwvwDYs0xzcHxEp2fxM",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<FloatingNavbar />
				{children}
			</body>
		</html>
	);
}
