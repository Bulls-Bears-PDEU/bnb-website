"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="w-16 h-9 rounded-full bg-muted/20" />;
	}

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<motion.button
			onClick={toggleTheme}
			whileTap={{ scale: 0.95 }}
			className={`relative w-16 h-9 rounded-full flex items-center px-1 transition-colors duration-300 focus:outline-none ${
				theme === "dark" ? "bg-gray-800" : "bg-gray-300"
			}`}
		>
			<motion.div
				className="absolute w-7 h-7 rounded-full bg-background shadow-md flex items-center justify-center"
				animate={{
					x: theme === "dark" ? 28 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 30,
				}}
			>
				{theme === "dark" ? (
					<Moon className="h-4 w-4 text-amber-400" />
				) : (
					<Sun className="h-4 w-4 text-amber-500" />
				)}
			</motion.div>
		</motion.button>
	);
}
