import { Box } from "../components/atoms/box";
import { Header } from "./header";
import { container } from "./style.css";
import { Widget } from "./widget";
import { HelpModals } from "./widget";

export default function Home() {
	return (
		<Box className={container}>
			<Header />
			<Widget />
			<Box marginTop={{ tablet: "0", mobile: "8" }}>
				<HelpModals />
			</Box>
		</Box>
	);
}
