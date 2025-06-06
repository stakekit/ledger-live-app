export const zIndicesContract = {
	hide: "",
	auto: "",
	base: "",
	docked: "",
	dropdown: "",
	sticky: "",
	banner: "",
	overlay: "",
	modal: "",
	skipLink: "",
};

export const zIndices: typeof zIndicesContract = {
	hide: "-1",
	auto: "auto",
	base: "0",
	docked: "10",
	dropdown: "1000",
	sticky: "1100",
	banner: "1200",
	overlay: "1300",
	modal: "1400",
	skipLink: "1600",
} as const;
