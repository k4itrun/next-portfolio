interface Tech {
    name: string;
    src: string;
}

export const tech: Tech[] = [
    "HTML", "CSS", "TailwindCSS", "Bootstrap", "JavaScript", "TypeScript",
    "Node.js", "Next.js", "React", "Express", "Nest.js", "Elixir",
    "Go", "Rust", "Bash", "Python", "PHP", "Git"
].map(name => ({
    name,
    src: `https://skillicons.dev/icons?i=${name.replace(/\.| /g, "").toLowerCase()}`
}));