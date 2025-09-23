// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    safelist: [
        "text-red-500",
        "text-green-500",
        "text-amber-500",
        "text-blue-500",
        "text-pink-500",
        "text-cyan-500",
        "text-gray-800",
        "text-gray-100",

        // border colors
        "border-gray-800",
        "border-red-500",
        "border-green-500",
        "border-amber-500",
        "border-blue-500",
        "border-pink-500",
        "border-cyan-500",
        "border-gray-100",

        // svg variant colors
        "[&_svg]:!text-gray-800",
        "[&_svg]:!text-red-500",
        "[&_svg]:!text-green-500",
        "[&_svg]:!text-amber-500",
        "[&_svg]:!text-blue-500",
        "[&_svg]:!text-pink-500",
        "[&_svg]:!text-cyan-500",
        "[&_svg]:!text-gray-100",
    ]
}
