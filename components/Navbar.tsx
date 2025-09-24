"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type Props = {
	title?: string;
	titleHref?: string; // internal
	githubUrl?: string; // external
	stickyOnScroll?: boolean; // optional: keeps it at top while scrolling
};

export default function InsetTopNavbar({
	title = "Git Log Formatter",
	titleHref = "/",
	githubUrl = "https://github.com/OmLachake/git-log-formatter",
	stickyOnScroll = false,
}: Props) {
	return (
		<header className={`${stickyOnScroll ? "sticky top-0 z-40" : ""} w-full`}>
			<div className="mx-auto w-[min(92vw,1100px)] mt-6">
				<nav
					className="
            rounded-full px-4 py-2
            bg-white/80 dark:bg-zinc-900/70
            backdrop-blur border border-black/10 dark:border-white/10
            shadow-lg ring-1 ring-black/5
          "
					role="navigation"
					aria-label="Main"
				>
					<div className="flex items-center justify-between">
						{/* Title (internal) */}
						<Link
							href={titleHref}
							className="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-zinc-500 rounded-full px-1"
						>
							{title}
						</Link>

						{/* GitHub (external) */}
						<Link
							href={githubUrl}
							target="_blank"
							rel="external noopener noreferrer"
							className="
                inline-flex items-center gap-2 rounded-full
                px-3 py-1.5 text-sm font-medium
                text-white bg-zinc-900 hover:bg-zinc-800
                dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white
                transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                focus-visible:ring-zinc-500
              "
							aria-label="View source on GitHub (opens in a new tab)"
							title="View on GitHub — opens in a new tab"
						>
							{/* GitHub mark */}
							<Github size={20} strokeWidth={1.5} />
							<span>GitHub</span>
							{/* External indicator */}
							<ExternalLink size={20} strokeWidth={1.5} />
							<span className="sr-only">(opens in a new tab)</span>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
